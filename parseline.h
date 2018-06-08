#ifndef PARSELINE_H
#define PARSELINE_H


#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>           /* Definition of AT_* constants */
#include <sys/stat.h>
#include <dirent.h>
#include <ftw.h>
#include <grp.h>
#include <arpa/inet.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <utime.h>

// extern int interupt;

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
extern void parser(char *line, pipeInf list[]);
extern void printFunc(pipeInf list[]);






#endif
