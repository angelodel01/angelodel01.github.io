#include <signal.h>
#include "parseline.h"
#include "mush.h"
#include <sys/wait.h>
#include <setjmp.h>


int exit_flag = 1;
int interupt = 0;
// sigset_t newmask, oldmask;

int main(int argc, char *argv[]){
	FILE *file = NULL;

	signal(SIGINT, handler);
	setbuf(stdout, NULL);

	if (argc == 1){
		while(exit_flag){
			pipeInputHandler(1, file);
		}
	} else{
		if (NULL == (file = fopen(argv[1], "r"))){
			perror(argv[1]);
			exit(-1);
		}
		while(exit_flag){
			pipeInputHandler(0, file);
		}
		fclose(file);
	}
}


void handler(int signum){
	printf("\n8-P ");
	interupt = 1;
	// fprintf(stdin, "\n");
	signal(SIGINT, handler);
	// int val = 0;

	// siglongjmp(env, val);s
}



void pipeInputHandler(int flag, FILE *file){
	pipeInf list[11];
	char *readline = NULL;
	if (flag == 0){
		readline = readFile(file, &exit_flag);
	} else{
		// sigsetjmp(env, 1);
		if (!interupt){
			printf("8-P ");
		} else {
			interupt = 0;
		}
		readline = readFile(stdin, &exit_flag);
		interupt = 0;
	}
	if (!exit_flag){
		return;
	}
	parser(readline, list);
	//printFunc(list); //uncomment if you want to print information about commands
	piper(list);
	free(readline);
}

void piper(pipeInf list[]){
	if (list[0].argc == -1){
		return;

	} else if (strcmp(list[0].argv[0], "exit") == 0){
		exit_flag = 0;
		return;
	}
	if (strcmp(list[0].argv[0], "cd") == 0){
		changeDirectory(list[0].argv[1]);
		return;
	}
	int fd_in = 0, fd_out = 0, fd_carry = 0, fd_rin = -1, fd_rout = -1;
	pid_t temp_child = -1;

	if (list[1].argc == -1){
		oneStage(list[0], temp_child, &fd_rin, &fd_rout);
		return;
	}

	int i = 0;
	while (list[i].argc != -1){
		int temp_pipe[2];
		fd_carry = fd_in;
		if (pipe(temp_pipe)){
			fprintf(stderr, "pipe failure pipe num :%d\n", i);
			exit(-1);
		}
		fd_in = temp_pipe[READ_END];
		fd_out = temp_pipe[WRITE_END];
		if (!(temp_child = fork())){ //if we're in the child
			if (i == 0){
				firstChild(fd_in, fd_out, fd_carry, &fd_rin, list[i]);
			} else if (list[i+1].argc == -1 && i > 0){
				lastChild(fd_in, fd_out, fd_carry, &fd_rout, list[i]);
			} else {
				middleChild(fd_in, fd_out, fd_carry, list[i]);
			}
		}
		wait(NULL);
		if (i == 0){
			close(fd_out);
			if (fd_rin != -1){
				close(fd_rin);
			}
			if (fd_rout != -1){
				close(fd_rout);
			}
		} else{
			close(fd_out);
			close(fd_carry);
		}
		i++;
	}
}

void redirectInput(pipeInf curr, int *fd_rin){
	char temp_buff[5];
	strncpy(temp_buff, curr.input, 4);
	temp_buff[4] = '\0';
	if (0 != strcmp(temp_buff, "orig")){
		*fd_rin = open(curr.input, O_RDWR | O_CREAT, S_IRUSR | S_IWUSR);
		if (-1 == dup2(*fd_rin, STDIN_FILENO)){ //change the stdout of the child to the file 
			perror(__FUNCTION__);
			exit(-1);
		}
	}
}

void redirectOutput(pipeInf curr, int *fd_rout){
	char temp_buff[5];
	strncpy(temp_buff, curr.output, 4);
	temp_buff[4] = '\0';
	if (0 != strcmp(temp_buff, "orig")){
		*fd_rout = open(curr.output, O_RDWR | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
		if (-1 == dup2(*fd_rout, STDOUT_FILENO)){ //change the stdout of the child to the file 
			perror(__FUNCTION__);
			exit(-1);
		}
	}
	return;
}

void oneStage(pipeInf curr, pid_t temp_child, int *fd_rin, int *fd_rout){
	if (!(temp_child = fork())){
		// if (sigprocmask(SIG_SETMASK, &oldmask, NULL) < 0)
      // 	printf("SIG_SETMASK error");

		redirectInput(curr, fd_rin);
		redirectOutput(curr, fd_rout);
		if (-1 == execvp(curr.argv[0], curr.argv)){
			perror(curr.argv[0]);
			exit(-1);
		}
	}
	wait(NULL);
	if (*fd_rin != -1){
		close(*fd_rin);
	}
	if (*fd_rout != -1){
		close(*fd_rout);
	}
	return;
}


void firstChild(int fd_in, int fd_out, int fd_carry, int *fd_rin, pipeInf curr){
	char temp_buff[5];
	strncpy(temp_buff, curr.output, 4);
	temp_buff[4] = '\0';
	if(0 == strcmp(temp_buff, "pipe")){
		if (-1 == dup2(fd_out, STDOUT_FILENO)){ //change the stdout of the child to the file 
			perror(__FUNCTION__);
			exit(-1);

		}	
	}
	redirectInput(curr, fd_rin);
	close(fd_in);
	if (-1 == execvp(curr.argv[0], curr.argv)){
		perror(curr.argv[0]);
		exit(-1);
	}
}


void middleChild(int fd_in, int fd_out, int fd_carry, pipeInf curr){
	// printf("fd into child : %d\n", fd_carry);
	if (-1 == dup2(fd_carry, STDIN_FILENO)){ //change the stdout of the child to the file 
		perror(__FUNCTION__);
		exit(-1);
	}
	// printf("fd out of child : %d\n", fd_out);
	if (-1 == dup2(fd_out, STDOUT_FILENO)){ //change the stdout of the child to the file 
		perror(__FUNCTION__);
		exit(-1);
	}
	close(fd_in);
	if (-1 == execvp(curr.argv[0], curr.argv)){
		perror(curr.argv[0]);
		exit(-1);
	}
}

void lastChild(int fd_in, int fd_out, int fd_carry, int *fd_rout, pipeInf curr){
		if (-1 == dup2(fd_carry, STDIN_FILENO)){ //change the stdout of the child to the file 
			perror(__FUNCTION__);
			exit(-1);
		}
		redirectOutput(curr, fd_rout);
		close(fd_in);
		if (-1 == execvp(curr.argv[0], curr.argv)){
			perror(curr.argv[0]);
			exit(-1);
		}
}

void changeDirectory(char *directory){
	if (-1 == chdir(directory)){
		perror(directory);
	}
}









