TITLE String primitives and macros     (Proj6_dispenss.asm)

; Author: Scott Dispensa
; Last Modified: 03/14/2025
; OSU email address: dispenss@oregonstate.edu
; Course number/section:   CS271 Section 400
; Project Number:  6               Due Date: 03/16/2025
; Description: This program takes a file name from a user, opens it and reads it into a string array, converts the strings to 
; numbers, and then prints that array of signed numbers in reverse order. As extra credit, it reads more than one line of the file if extant, and 
; uses WriteVal to convert signed DWORDS back to strings for printing.

INCLUDE Irvine32.inc

; ---------------------------------------------------------------------------------
; Name: mGetString
;
; Uses mDisplayString and gets a file name from a user.
;
; Preconditions: do not use edx, ecx, as arguments
;
; Receives:
; userPrompt = string asking the user for the file name
; myVariable = place to store string file name
; buffer	 = max length of user string
;
; returns: myVariable = result from ReadString stored in EDX.
; ---------------------------------------------------------------------------------


mGetString	MACRO	userPrompt, myVariable, buffer

	mDisplayString  OFFSET userPrompt
	PUSH	EDX
	PUSH	ECX
	MOV		EDX, myVariable
	MOV		ECX, buffer
	CALL	ReadString
	POP		ECX
	POP		EDX

ENDM


;---------------------------------------------------------------------------------
; Name: mDisplayString
;
; Prints a string.
;
; Preconditions: Do not use EDX as argument.
;
; Receives: outString = string to be printed.				
;
; returns: None
; ---------------------------------------------------------------------------------


mDisplayString	MACRO  outString
	PUSH	EDX
	MOV		EDX, outString
	CALL	WriteString
	POP		EDX

ENDM

;---------------------------------------------------------------------------------
; Name: mDisplayChar
;
; Prints a single character.
;
; Preconditions: Do not use EAX as argument.
;
; Receives:
; outChar = character to be printed: register, constant, or immediate.
;
; Returns: none
; ---------------------------------------------------------------------------------



mDisplayChar	MACRO	outChar
	PUSH	EAX
	MOV		AL, outChar
	CALL	WriteChar
	POP		EAX

ENDM

; constants for number of readings to use from file, delimiter, and size of array to be printed

TEMPS_PER_DAY	=	24
DELIMITER		EQU	','
TEMPSIZE		=	TEMPS_PER_DAY * 40

.data

; variables for arrays to be used in processing

fileBuffer			BYTE	TEMPSIZE DUP (0)
fileSize			DWORD	SIZEOF fileBuffer - 1
tempArray			SDWORD	TEMPSIZE DUP (?)

; strings for introduction and printing
greeting			BYTE	"Welcome to the intern-correction program, by Scott Dispensa.", 10,13, "If you enter the name of a file containing temperatures delimited by commas, ",13,10,0
greeting2			BYTE	"I'll give you back the temperatures in the file in the correct order!!",13,10,0
extra2				BYTE	"**EC: This program implements a WriteVal procedure to convert integers to strings and display them, rather than using WriteDec/WriteInt.",13,10,0
extra1				BYTE	"**EC: This program can handle multiple-line input files. ",13,10,0
entry				BYTE	"What is the name of the file: ",0
goodbye				BYTE	"Hope you found this useful!!!",0
; counts number of integers in the tempArray for processing
entryCount			DWORD	0
order				BYTE	"Here's the correct order of the temperatures:",13,10,0
; user generated string of file name
inString			BYTE	21 DUP(0)
; variables for string conversion
count				DWORD	0		; holds the total for division in ParseTemps
minusFlag			DWORD	0
numChar				DWORD	0		; holds the number of the character in ParseTemps
tempString			BYTE	5 DUP (0)	; hold string for printing in writeVal
bytesCount			DWORD	0		; count number of bytes read from fileBuffer
zeroFlag			DWORD	0		; parse end of file

.code
main PROC
	
	mDisplayString	OFFSET  greeting
	mDisplayString	OFFSET  greeting2
	CALL			Crlf
	mDisplayString	OFFSET  extra1
	CALL			Crlf
	mDisplayString	OFFSET	extra2
	CALL			Crlf
	mGetString		OFFSET  entry, OFFSET inString, SIZEOF inString - 1
	CALL			Crlf

	PUSH			OFFSET  fileBuffer
	PUSH			fileSize
	PUSH			OFFSET  inString
	CALL			fileRead

	mDisplayString	OFFSET order
	CALL			Crlf

	MOV				ECX, 10				; max lines

_printLoop:
	PUSH			OFFSET zeroFLag
	PUSH			OFFSET bytesCount
	PUSH			entryCount
	PUSH			count
	PUSH			numChar
	PUSH			minusFlag
	PUSH			LENGTHOF fileBuffer
	PUSH			OFFSET fileBuffer
	PUSH			OFFSET tempArray
	CALL			ParseTempsFromString

	MOV				EAX, zeroFlag				; check zero flag for end of file before printing
	CMP				EAX, 1
	JE				_programEnd

	PUSH			OFFSET tempString
	PUSH			OFFSET tempArray
	CALL			WriteTempsReverse
	LOOP			_printLoop

_programEnd:
	CALL			Crlf
	mDisplayString  OFFSET goodbye
	CALL			Crlf


	Invoke ExitProcess,0	; exit to operating system
main ENDP

; ---------------------------------------------------------------------------------
; Name: fileRead
;
; Takes the name of a file, opens it, reads it into an array, and closes it.
;
; Preconditions: None.
;
; Postconditions: none.
;
; Receives:
; [ebp+8]  = address of user-entered file name as string.
; [ebp+12] = buffer size of file to be read.
; [ebp+16] = address of array to be filled with info from file.
;
; returns: fileBuffer = array filled with contents of read file.
;				
; ---------------------------------------------------------------------------------

fileRead	PROC
	PUSH		EBP
	MOV			EBP, ESP
	PUSH		EDX
	PUSH		EAX
	PUSH		ECX
	MOV			EDX, [EBP+8]
	CALL		OpenInputFile
	CMP			EAX, INVALID_HANDLE_VALUE
	JE			_error
_afterError:
	MOV			ECX, [EBP+12]
	MOV			EDX, [EBP+16]
	CALL		ReadFromFile
	CALL		Crlf
	CALL		CloseFile
	POP			ECX
	POP			EAX
	POP			EDX
	POP			EBP

	RET			12

_error:
	CALL		WriteWindowsMsg
	JMP			_afterError
	


fileRead	ENDP

; ---------------------------------------------------------------------------------
; Name: ParseTempsFromString
;
; Takes an array of temperatures in comma-delimited ascii format and converts them into signed dword array.
;
; Preconditions: fileBuffer array is filled.
;
; Postconditions: none.
;
; Receives:
; [ebp+40] = zeroFlag for determining end of program
; [ebp+36] = counter for number of bytes read in this cycle
; [ebp+32] = counter for number of integers that make it into the tempArray
; [ebp+28] = count for keeping track of number total
; [ebp+24] = for holding the ascii number of the current number
; [ebp+20] = flag for marking whether a number is negative
; [ebp+16] = length of fileBuffer array
; [ebp+12] = address of fileBuffer array
; [ebp+8]  = address of array to be filled
; TEMPSIZE and TEMPS_PER_DAY are constants.
;
; returns: tempArray = SDWORD array of temperatures
;		   entryCount = count of tempArray for printing
;		   zeroFlag = 0 unless end of program
;		   bytesCount = number of bytes read this cycle for incrementing next time
; ---------------------------------------------------------------------------------

ParseTempsFromString PROC

	PUSH		EBP					; saving registers and retrieving parameters
	MOV			EBP, ESP
	PUSH		EDX
	PUSH		EAX
	PUSH		ECX
	PUSH		EBX
	MOV			EBX, [EBP+36]		; bytesRead for incrementing esi
	MOV			ESI, [EBP+12]		; address of fileBuffer
	ADD			ESI, [EBX]			; move to current place in fileBuffer
	MOV			EDI, [EBP+8]		; address of array to be filled
	MOV			ECX, TEMPSIZE	

	; load in first ascii code from esi in accumulator. 
_processLoop:
	LODSB
	PUSH		EBX
	MOV			EBX, [EBP+36]		; store number of bytes read for incrementing for esi next loop
	INC			BYTE PTR [EBX]
	MOV			[EBP+36], EBX
	POP			EBX
	CMP			AL, 0				; jump to set the zero flag if 0 is next loaded number
	JE			_setZero
	CMP			AL, 45				; if 45, it's a minus so keep track that following number needs negation
	JE			_minus
_afterMinus:
	CMP			AL, 44				; comma indicates a break between numbers
	JE			_comma
	CMP			AL, 48
	JAE			_conversion				; indicates value is a number if it falls through to here, and jumps to conversion
	LOOP		_processLoop		; don't store Crlf values but continue loop


; this block follows the professor's pseudocode in the exploration for converting ascii to numerals
_conversion:	
	MOV			[EBP+24], EAX	; current eax into numChar
	MOV			EAX, [EBP+28]	; current count into eax
	MOV			EBX, 10
	MUL			EBX				; multiply by 10 to keep track of number place 
	MOV			[EBP+28], EAX
	MOV			EBX, [EBP+24]
	SUB			EBX, 48			; subtract 48 from the ascii to yield correct number
	ADD			EAX, EBX		; add current count and store back in count
	MOV			[EBP+28], EAX
	JMP			_processLoop

; if the 'minus flag' is set, it falls here to deduct twice the number from itself
_minusSet:
	MOV			EAX, [EBP+28]	; current count into eax
	NEG			EAX
	JMP			_afterMinusSet

; when a comma is found, the number gets stored and we skip to the next number if the 'minus flag' is not set
_comma:
	PUSH		EBX
	MOV			EBX, [EBP+20]	; load minusFlag and compare to 1. If equal, jump to processing as a negative number
	MOV			EAX, [EBP+28]
	CMP			EBX, 1
	POP			EBX
	JE			_minusSet

_afterMinusSet:
	STOSD						; else, store the number
	PUSH		ECX
	MOV			ECX, [EBP+32]	; increment the number of digits stored into array and end if it equals temps_per_day
	INC			ECX
	MOV			[EBP+32], ECX
	CMP			ECX, TEMPS_PER_DAY
	POP			ECX
	JE			_end
	MOV			EAX, [EBP+28]	; prep count for next number
	XOR			EAX, EAX
	MOV			[EBP+28], EAX
	MOV			EBX, [EBP+20]	; reset minusFlag
	XOR			EBX, EBX
	MOV			[EBP+20], EBX
	LOOP		_processLoop	; loop after number is stored 
	
_minus:
	PUSH		EBX
	MOV			EBX, [EBP+20]	; load minusFlag and increment
	INC			EBX
	MOV			[EBP+20], EBX
	POP			EBX
	JMP			_afterMinus

_setZero:
	MOV			EAX, [EBP+40]
	INC			DWORD PTR [EAX]
	MOV			[EBP+40], EAX
_end:
	POP			EBX				; get registers back
	POP			ECX
	POP			EAX
	POP			EDX
	POP			EBP
	RET			36

ParseTempsFromString ENDP


; ---------------------------------------------------------------------------------
; Name: WriteTempsReverse
;
; Prints the temperature array with a designated (constant) delimiter in reverse order.
;
; Preconditions: tempArray is an SDWORD array, DELIMITER is a single character.
;
; Postconditions: none.
;
; Receives:
; [ebp+8]  = address of tempArray
; [ebp+12] = array to hold temporary string for printing.
; DELIMITER, TEMPS_PER_DAY are constants.
;
; returns: None.
; ---------------------------------------------------------------------------------


WriteTempsReverse	PROC
	PUSH		  EBP
	MOV			  EBP, ESP
	PUSH		  EAX
	PUSH		  ECX

; Set up loop counter and indices

	MOV			  ESI, [EBP+8]		; tempArray address
	MOV			  ECX, TEMPS_PER_DAY	; counter for number of elements in the array to be printed
	PUSH		  EBX
	PUSH		  EAX
	MOV			  EBX, 4
	MOV			  EAX, TEMPS_PER_DAY
	MUL			  EBX					; multiply number of elements by 4 (size of dword) and add that to esi for processing in reverse
	ADD			  ESI, EAX 
	POP			  EAX
	POP			  EBX
	SUB			  ESI, 4				; set to n-1 element

; print each number starting from the end of the array and working backwards with a delimiter between each number. 
_printLoop:
	STD						     ; set direction flag so we start at the back 
	LODSD
	CMP			  EAX, -100      ; defined limits for entries
	JL			  _end
	CMP			  EAX, 200
	JG			  _end

	PUSH		  [EBP+12]	    ; tempString is pushed to called procedure
	PUSH		  EAX			; eax pushed by value for processing
	CALL		  WriteVal
	mDisplayChar  DELIMITER
	LOOP		  _printLoop

_end:
	CALL		  Crlf
	POP			  ECX
	POP			  EAX
	POP			  EBP

	RET			  8	


WriteTempsReverse	ENDP



; ---------------------------------------------------------------------------------
; Name: WriteVal
;
; Prints a number in ascii format to the console.
;
; Preconditions: positive or negative number input by value, tempString array pushed by calling procedure.
;
; Postconditions: none.
;
; Receives: [EBP+8] = current value of tempArray stored in EAX.
;			[EBP+12] = tempString, a temporary array to hold number for printing.
;
; returns: None.
; ---------------------------------------------------------------------------------

;__________________________________________________________________
; I decided to brute-force add the digits in the forward direction because I couldn't get STD to work even accounting for starting at the
; back of the array minus 1, so I just account for the fact that there can only be at most 3 divisions necessary to reduce a number to its 
; constituent parts. 
;__________________________________________________________________



WriteVal	PROC

	PUSH			EBP					; save registers from calling program
	MOV				EBP, ESP
	PUSH			ECX
	PUSH			EDX
	PUSH			EDI
	PUSH			EBX
	PUSH			ESI		
	MOV				EAX, [EBP+8]		; value pushed from eax
	MOV				EDI, [EBP+12]		; tempString to be used to print whole number	
	CLD
	CMP				EAX, 0				; if passed number is negative we jump
	JL				_negative
	JMP				_afterNeg

_negative:
	NEG				EAX
	PUSH			EAX
	MOV				EAX, 45					; store the minus for printing
	STOSB
	POP				EAX

_afterNeg:
	XOR				EDX, EDX			; if not negative or after fixing negation it falls here
	MOV				EBX, 10
	DIV				EBX					; divide by 10 and compare remainder to 0. If it's not 0, jump to divide again.
	CMP				EAX, 0
	JNE				_divideAgain
	JMP				_divideOnce

_divideAgain:
	PUSH			ECX
	MOV				ECX, EDX			; store the first digit (which will end up being last) in ecx and divide again
	XOR				EDX, EDX
	DIV				EBX
	ADD				EDX, 48
	MOV				ESI, EDX
	CMP				EAX, 0				; if eax still not 0, we have a 3-digit number
	JNE				_divideThree
	PUSH			EAX
	MOV				EAX, EDX			; otherwise, store the most recent digit as tens digit
	STOSB
	MOV				EAX, ECX
	ADD				EAX, 48				; store the previous one as ones digit
	STOSB
	POP				EAX
	POP				ECX
	JMP				_print

_divideThree:
	XOR				EDX, EDX			; clear edx and divide again
	DIV				EBX
	ADD				EDX, 48
	PUSH			EAX
	MOV				EAX, EDX			; no check needed since numbers can't exceed 3 digits. most recent gets stored first.
	STOSB
	MOV				EAX, ESI			; second (tens) digit gets stored
	STOSB
	MOV				EAX, ECX			; finally, ones digit is stored
	ADD				EAX, 48
	STOSB
	POP				EAX
	POP				ECX
	JMP				_print				; jump to print

_divideOnce:
	ADD				EDX, 48				; if it's fallen here, we can turn the digit into ascii and print it
	MOV				EAX, EDX
	STOSB

_print:
	MOV				EDI, [EBP+12]		; start printing from beginning of saved array
	mDisplayString  EDI

	XOR				EAX, EAX
	MOV				ECX, 4				; put 0's back into array for next number
	MOV				EDI, [EBP+12]

_arrayErase:
	CLD
	STOSB
	LOOP			_arrayErase

	POP				ESI					; restore everything
	POP				EBX
	POP				EDI
	POP				EDX
	POP				ECX
	POP				EBP

	RET				8	



WriteVal	ENDP



END main
