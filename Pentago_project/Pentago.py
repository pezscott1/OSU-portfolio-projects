# Author: Scott Dispensa
# GitHub Username: pezscott1
# Date: 8/7/24
# Description: Creates a turn-based, two-player, abstract game called Pentago.
class Pentago:
    """Creates the Pentago class."""
    def __init__(self):
        """Initializes the Pentago class, including data members game_state, which tells us if
        a game is ongoing or completed, next_turn, which is either black or white depending on turn,
        the board itself, the symbols used for white and black 'tokens', the number of moves possible in a game,
        and the indices for arranging the arrays for a rotation."""
        self._game_state = "UNFINISHED"
        self._next_turn = 'black'
        self._board = self._board = [['◯'] * 3 * 3 for i in range(4)]
        self._white_move = "★"
        self._black_move = "☆"
        self._moves = 36
        self._index_clockwise = [6, 3, 0, 7, 4, 1, 8, 5, 2]
        self._index_anti_clockwise = [2, 5, 8, 1, 4, 7, 0, 3, 6]


    def get_game_state(self):
        """Gets the game state."""
        return self._game_state

    def is_board_full(self):
        """Checks if the board is full, returns 'draw' if so."""
        if self._moves == 0:
            self._game_state = "DRAW"
            return True
        else:
            return False

    def print_board(self):
        """Prints the board of the Pentago as the player would see it."""
        count = 0
        rows = self.get_rows()
        for row in rows:
            for i in range(len(row)):
                if count % 6 == 0:
                    print()
                count += 1
                print(row[i], end=' ')
        print()

    def rotate_board(self, sub_board, rotation):
        """Rotates the board according to the given rotation direction."""
        if rotation == 'C':
            index = sub_board - 1
            sub_board1 = [[self._board[index][i] for i in self._index_clockwise]]
            if sub_board == 1:
                self._board = sub_board1 + self._board[1:]
            if sub_board == 2:
                self._board = self._board[:1] + sub_board1 + self._board[2:]
            if sub_board == 3:
                self._board = self._board[:2] + sub_board1 + self._board[3:]
            if sub_board == 4:
                self._board = self._board[:3] + sub_board1
        else:
            sub_board1 = self._board[sub_board-1]
            sub_board1 = [[sub_board1[i] for i in self._index_anti_clockwise]]
            if sub_board == 1:
                self._board = sub_board1 + self._board[1:]
            if sub_board == 2:
                self._board = self._board[:1] + sub_board1 + self._board[2:]
            if sub_board == 3:
                self._board = self._board[:2] + sub_board1 + self._board[3:]
            if sub_board == 4:
                self._board = self._board[:3] + sub_board1

    def get_move(self, move):
        """Returns the index in the list of the move the player has entered."""
        new_row = 0
        row, column = move[0], move[1]
        column = int(column)
        if column < 3:
            if row == 'a' or row == 'b' or row == 'c':
                new_row = 0
            else:
                new_row = 2
        else:
            if row == 'a' or row == 'b' or row == 'c':
                new_row = 1
            else:
                new_row = 3

        if row == 'a' or row == 'd':
            if column > 2:
                column = column - 3
            else:
                column = column
        if row == 'b' or row == 'e':
            if column > 2:
                column = column
            else:
                column = column + 3
        if row == 'c' or row == 'f':
            if column > 2:
                column = column + 3
            else:
                column = column + 6

        return int(new_row), int(column)

    def get_rows(self):
        """Arranges the rows as they appear on the board for checking for a winner and printing."""
        row1 = [self._board[0][0], self._board[0][1], self._board[0][2], self._board[1][0], self._board[1][1], self._board[1][2]]
        row2 = [self._board[0][3], self._board[0][4], self._board[0][5], self._board[1][3], self._board[1][4], self._board[1][5]]
        row3 = [self._board[0][6], self._board[0][7], self._board[0][8], self._board[1][6], self._board[1][7], self._board[1][8]]
        row4 = [self._board[2][0], self._board[2][1], self._board[2][2], self._board[3][0], self._board[3][1], self._board[3][2]]
        row5 = [self._board[2][3], self._board[2][4], self._board[2][5], self._board[3][3], self._board[3][4], self._board[3][5]]
        row6 = [self._board[2][6], self._board[2][7], self._board[2][8], self._board[3][6], self._board[3][7], self._board[3][8]]

        rows = [row1] + [row2] + [row3] + [row4] + [row5] + [row6]

        return rows

    def get_columns(self):
        """Arranges the columns as they appear on the board for checking for a winner."""
        column1 = [self._board[0][0], self._board[0][3], self._board[0][6], self._board[2][0], self._board[2][3], self._board[2][6]]
        column2 = [self._board[0][1], self._board[0][4], self._board[0][7], self._board[2][1], self._board[2][4], self._board[2][7]]
        column3 = [self._board[0][2], self._board[0][5], self._board[0][8], self._board[2][2], self._board[2][5], self._board[2][8]]
        column4 = [self._board[1][0], self._board[1][3], self._board[1][6], self._board[3][0], self._board[3][3], self._board[3][6]]
        column5 = [self._board[1][1], self._board[1][4], self._board[1][7], self._board[3][1], self._board[3][4], self._board[3][7]]
        column6 = [self._board[1][2], self._board[1][5], self._board[1][8], self._board[3][2], self._board[3][5], self._board[3][8]]

        columns = [column1] + [column2] + [column3] + [column4] + [column5] + [column6]

        return columns

    def get_diagonals(self):
        """Arranges the diagonals as they appear on the board for checking for a winner."""
        diagonal1 = [self._board[0][0], self._board[0][4], self._board[0][8], self._board[3][0], self._board[3][4], self._board[3][8]]
        diagonal2 = [self._board[2][6], self._board[2][4], self._board[2][2], self._board[1][6], self._board[1][4], self._board[1][2]]
        diagonal3 = [self._board[0][1], self._board[0][5], self._board[1][6], self._board[3][1], self._board[3][6]]
        diagonal4 = [self._board[0][4], self._board[0][7], self._board[2][2], self._board[3][3], self._board[3][7]]
        diagonal5 = [self._board[2][3], self._board[2][1], self._board[0][8], self._board[1][3], self._board[1][1]]
        diagonal6 = [self._board[2][7], self._board[2][5], self._board[3][0], self._board[1][7], self._board[1][5]]
        diagonals = [diagonal1] + [diagonal2] + [diagonal3] + [diagonal4] + [diagonal5] + [diagonal6]

        return diagonals

    def win_check(self):
        """Checks if the player has won the game."""
        white_count = 1
        black_count = 1
        rows = self.get_rows()
        for row in rows:
            for i in range(len(row)):
                if row[i] != '◯':
                    if i + 1 < len(row) and row[i] == row[i+1]:
                        if row[i] == "★":
                            white_count += 1
                        else:
                            black_count += 1
                    if white_count == 5 and black_count == 5:
                        self._game_state = "DRAW"
                        return
                    if white_count == 5 or black_count == 5:
                        return True
                    if i + 1 < len(row) and row [i] != row[i+1]:
                        white_count = 1
                        black_count = 1
        columns = self.get_columns()
        for column in columns:
            for i in range(len(column)):
                    if column[i] != '◯':
                        if i + 1 < len(column) and column[i] == column[i+1]:
                            if column[i] == "★":
                                white_count += 1
                            else:
                                black_count += 1
                        if white_count == 5 and black_count == 5:
                            self._game_state = "DRAW"
                            return
                        if white_count == 5 or black_count == 5:
                            return True
                        if i + 1 < len(column) and column[i] != column[i+1]:
                            white_count = 1
                            black_count = 1
        diagonals = self.get_diagonals()
        for diagonal in diagonals:
            for i in range(len(diagonal)):
                if diagonal[i] != '◯':
                    if i + 1 < len(diagonal) and diagonal[i] == diagonal[i + 1]:
                        if diagonal[i] == "★":
                            white_count += 1
                        else:
                            black_count += 1
                    if white_count == 5 and black_count == 5:
                        self._game_state = "DRAW"
                        return
                    if white_count == 5 or black_count == 5:
                        return True
                    if i + 1 < len(diagonal) and diagonal[i] != diagonal[i+1]:
                        white_count = 1
                        black_count = 1

    def make_move(self, color, position, sub_board, rotation):
        """Makes a move on the board based on the player entry. Utilizes
        get_move, win_check, and rotate_board to make the function more readable."""

        if self._game_state != "UNFINISHED":
            return "game is finished"
        if color != self._next_turn:
            return "not this player's turn"
        row, column = self.get_move(position)
        if self._board[row][column] != "◯":
            return "position is not empty"
        if color == 'black':
            self._board[row][column] = self._black_move
            self._moves -= 1
            self._next_turn = 'white'
        elif color == 'white':
            self._board[row][column] = self._white_move
            self._moves -= 1
            self._next_turn = 'black'
        if self.win_check() is True:
            color = color.upper()
            self._game_state = f"{color}_WON"
            return True
        self.rotate_board(sub_board, rotation)
        if self.win_check() is True:
            color = color.upper()
            self._game_state = f"{color}_WON"
            return True

        return True

