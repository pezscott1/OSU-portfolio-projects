// Author: Scott Dispensa
// Date: 7/31/25
// Class: CS374 assignment 3
// Description: Implementation of a shell to handle user input. There are 3 built-in functions with others being
// handled by calls to an exec() function. There are two signals being caught and support for input and output redirection.

// This program was implemented using the given parser code and adaptation of many of the exploration code 
// examples.

#include <signal.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>

#define INPUT_LENGTH 2048
#define MAX_ARGS 512

struct sigaction SIGINT_action;

struct command_line
{
    char *argv[MAX_ARGS + 1];
    int argc;
    char *input_file;
    char *output_file;
    bool is_bg;
};

void do_exit();
void do_cd(char *path);
void do_status();
void handle_SIGTSTP_on(int signo);
void handle_SIGTSTP_off(int signo);
void free_curr_command(struct command_line *curr_command);

// global variables for status and foreground-mode sigtstp handling
int current_status = 0;
int global_flag = 0;

struct command_line *parse_input()
{
    char input[INPUT_LENGTH];
    struct command_line *curr_command = (struct command_line *) calloc(1, sizeof(struct command_line));

// Get input
    printf(": ");
    fflush(stdout);
    fgets(input, INPUT_LENGTH, stdin);

// Tokenize the input
    char *token = strtok(input, " \n");
    while(token){
    if(!strcmp(token,"<")){
        curr_command->input_file = strdup(strtok(NULL," \n"));
        
    } else if(!strcmp(token,">")){
        curr_command->output_file = strdup(strtok(NULL," \n"));
        
    } else if(!strcmp(token,"&")){
    curr_command->is_bg = true;
    } else{
    curr_command->argv[curr_command->argc++] = strdup(token);
}
    token=strtok(NULL," \n");
}
    return curr_command;
}

// function to free allocated memory
void free_curr_command(struct command_line *curr_command) {
    for (int i = 0; i < curr_command->argc; i++) {
        free(curr_command->argv[i]);
    }
    if (curr_command->input_file) {
        free(curr_command->input_file);
    }
    if (curr_command->output_file) {
        free(curr_command->output_file);
    }
    free(curr_command);
}

// function to handle turning foreground-only on
void handle_SIGTSTP_on(int signo)
{
char* message = "\nEntering foreground-only mode (& is now ignored)\n";
  // We are using write rather than printf
  write(STDOUT_FILENO, message, 51);
  global_flag = 1;
}

// function to handle turning foreground-only off
void handle_SIGTSTP_off(int signo)
{
char* message = "\nExiting foreground-only mode\n";
  // We are using write rather than printf
  write(STDOUT_FILENO, message, 31);
  global_flag = 0;
}

// exit handling
void do_exit()
{   
    exit(EXIT_SUCCESS);
}

// cd handling
void do_cd(char* path_in)
{   
    if (path_in == NULL)
    {
        chdir(getenv("HOME"));
    }
    else
    {
        if (chdir(path_in) != 0)
        {
            perror("cd");
        }
    }
}

// status handling
void do_status()
    {
    printf("exit value %d\n", current_status);
    }


    int main() {
        
    struct command_line *curr_command;
    
    // command loop
    for (;;) {
        pid_t bg_pid;

        // check for background processes
        int bg_status;
        while ((bg_pid = waitpid(-1, &bg_status, WNOHANG)) > 0) 
        {
            if (WIFEXITED(bg_status)) 
            {
                printf("Background pid %d is done: exit value %d\n", bg_pid, WEXITSTATUS(bg_status));
             
            } 
            else if (WIFSIGNALED(bg_status)) 
            {
                printf("Background pid %d is done: terminated by signal %d\n", bg_pid, WTERMSIG(bg_status));
              
            }
            fflush(stdout);
        }

        // catch SIGINT and SIGTSTP in parent
        struct sigaction SIGINT_action = {0};
        struct sigaction SIGTSTP_action = {0};
        SIGINT_action.sa_handler = SIG_IGN;
        if (!global_flag){
            SIGTSTP_action.sa_handler = handle_SIGTSTP_on;
        }
        else {
            SIGTSTP_action.sa_handler = handle_SIGTSTP_off;
        }
        sigfillset(&SIGINT_action.sa_mask);
        sigfillset(&SIGTSTP_action.sa_mask);
        SIGINT_action.sa_flags = 0;
        SIGTSTP_action.sa_flags = SA_RESTART;
        sigaction(SIGINT, &SIGINT_action, NULL);
        sigaction(SIGTSTP, &SIGTSTP_action, NULL);

        fflush(stdout);

        // run parser
        curr_command = parse_input();

        // test for foreground-only flag
        if (global_flag){
            curr_command->is_bg = false;
        }
        // handle input from user
        if (curr_command->argc == 0) continue;
        if (curr_command->argv[0][0] == '#') continue;
        if (strcmp(curr_command->argv[0], "exit") == 0) {
            do_exit();
        } else if (strcmp(curr_command->argv[0], "cd") == 0) {
            do_cd(curr_command->argv[1]);
        } else if (strcmp(curr_command->argv[0], "status") == 0) {
            do_status();

        // anything other than blank, comments, or built-ins go here
        } else {
            int childStatus;
            pid_t child = fork();

            switch (child) {
                case -1:
                    perror("fork() failed!");
                    exit(EXIT_FAILURE);
                    break;

                case 0: {
                    // Child handling: input/output redirection
                    if (curr_command->input_file != NULL) {
                        int in_fd = open(curr_command->input_file, O_RDONLY);
                        if (in_fd == -1) {
                            perror("input error!");
                            current_status = 1;
                            exit(1);
                        }
                        dup2(in_fd, 0);
                        close(in_fd);
                    }
                    if (curr_command->output_file != NULL) {
                        int out_fd = open(curr_command->output_file, O_WRONLY | O_CREAT | O_TRUNC, 0640);
                        if (out_fd == -1) {
                            perror("open output");
                            current_status = 1;
                            exit(1);
                        }
                        dup2(out_fd, 1);
                        close(out_fd);
                    }
                    if (curr_command->is_bg) {

                    // Redirect input to /dev/null if none specified
                    if (curr_command->input_file == NULL) {
                        int null_in = open("/dev/null", O_RDONLY);
                        if (null_in == -1) {
                        perror("opening /dev/null for input");
                        exit(1);
                        }
                        dup2(null_in, 0);
                        close(null_in);
                        }

                        // Redirect output to /dev/null if none specified
                    if (curr_command->output_file == NULL) {
                        int null_out = open("/dev/null", O_WRONLY);
                        if (null_out == -1) {
                        perror("opening /dev/null for output");
                        exit(1);
                        }
                        dup2(null_out, 1);
                        close(null_out);
                        }
                    }

                    // child signal handling
                    struct sigaction child_SIGINT = {0};
                    struct sigaction child_SIGTSTP = {0};
                    child_SIGINT.sa_handler = curr_command->is_bg ? SIG_IGN : SIG_DFL;
                    child_SIGTSTP.sa_handler = SIG_IGN;
                    sigaction(SIGINT, &child_SIGINT, NULL);
                    sigaction(SIGTSTP, &child_SIGTSTP, NULL);
                    execvp(curr_command->argv[0], curr_command->argv);
                    perror(curr_command->argv[0]);
                    current_status = 1;
                    exit(1);
                }
                // parent directions
                default:
                    if (curr_command->is_bg) {
                        printf("Background pid is %d\n", child);
                        fflush(stdout);
                    } else {
                        waitpid(child, &childStatus, 0);
                        if (WIFEXITED(childStatus)) {
                            current_status = WEXITSTATUS(childStatus);
                            
                        } else if (WIFSIGNALED(childStatus)) {
                            current_status = WTERMSIG(childStatus);
                            printf("terminated by signal %d\n", current_status);
                        }
                    }
                    break;
            }
        }
        
        free_curr_command(curr_command);
    }

    return 0;
}
