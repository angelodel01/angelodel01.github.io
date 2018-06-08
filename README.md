

mush by ANGELO DE LAURENTIS AND LOGAN LAWSON

This program is an implementation of a minimally useful shell.

it assumes that arguments will be seperated by a space " ".


This is the struct we used to store and organize all the information that we get from the user.

typedef struct print pipeInf;

struct print{
	int stage_num; 
	char input[512];
	char output[512];
	int argc;
	char *argv[11];
	char stage_name[512];
};





extern char *readFile(FILE *file, int *exit);
	This function reads the line that the user inputs and returns it as a string

extern void parser(char *line, pipeInf list[]);
	This function parses the string returned by readFile and turns it into a list of sctructs

extern void printFunc(pipeInf list[]);
	This function was originally developed for HW5 to print all of the information in our structs but ended up being a useful debugging tool for HW6 as well

void piper(pipeInf list[]);
	This function is our main loop. It runs through the list of structs built by parser and uses the information to create the actual children and pipes that will do the work of the shell.

void pipeInputHandler(int flag, FILE *file);
	This function is used call readFile parser and piper

void changeDirectory(char *directory);
	This function is called when a "cd" is given by the user and changes directories

void middleChild(int fd_in, int fd_out, int fd_carry, pipeInf curr);
	This function is for performing tasks that a child who has a pipe as an input and an ouput needs to perform.

void firstChild(int fd_in, int fd_out, int fd_carry, int *fd_rin, pipeInf curr);
	This function is for performing tasks that a child who gets their input from stdin or file redirection and then pipes it's output to middleChild().

void lastChild(int fd_in, int fd_out, int fd_carry, int *fd_rout, pipeInf curr);
	This function is for performing tasks that a child who gets their input from a pipe from middleChild(), and has an output that is either stdout or a redirection

void redirectInput(pipeInf curr, int *fd_rin);
	This function is for redirecting input if a '<' is given by a user.

void redirectOutput(pipeInf curr, int *fd_rout);
	This function is for redirecting output if a '>' is given by a user.

void oneStage(pipeInf curr, pid_t temp_child, int *fd_rin, int *fd_rout);
	This function is for handline the case when the user doesn't include any pipes in their input.

void handler(int signum);
	This is the handler that sigaction calls if is recieves a SIGINT signal from the user.





