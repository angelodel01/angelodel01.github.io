#include "parseline.h"


char *readFile(FILE *file, int *exit){
	//FILE *file =stdin
	char *string = malloc(sizeof(int)*512);
	//char string[50];
	int temp = getc(file);
	if (temp == EOF){
		*exit = 0;
		return string;
	}
	int i = 0;
	while (temp != 10){
		// printf("%d", interupt);
		// if(interupt){
		// 	break;
		// }
		string[i] = temp;
		temp = getc(file);
		i++;
	}
	string[i] = '\0';
	string = realloc(string, (strlen(string) + 1)*sizeof(int));
	return string;
}


void parser(char *line, pipeInf list[]){
	//pipeInf list[11];
	char *command, *arg;
	char *commandSave, *argSave;
	int arg_count = 0, stage_count = 0;
	int stdin_flag, stdout_flag;
	int stdin_count = 0, stdout_count = 0;
	int redirection_flag = 0;
	char stdin_prompt[] = "original stdin";
	char stdout_prompt[] = "original stdout";
	char inputbuf[19];
	char outputbuf[17];

	char lessthan[] = "<";
	char greaterthan[] = ">";

	command = strtok_r(line, "|", &commandSave);
	if (command == NULL){
		list[stage_count].argc = -1;
		return;
	}
	arg = stdin_prompt;

	while(command != NULL || arg != NULL){
		if (arg != NULL){
			if (arg_count == 0){
				// if (strlen(line) > 512){
				// 	fprintf(stderr, "Too long of command\n");
				// 	list[stage_count].argc = -1;
				// 	return;				
				// }
				// printf("command: %s\n", command);
				strcpy(list[stage_count].stage_name, command);
				strcpy(list[stage_count].input, stdin_prompt);
				strcpy(list[stage_count].output, stdout_prompt);
				redirection_flag = 0;
				arg = strtok_r(command, " ", &argSave);
			}
			
			if ((!(stdin_flag = strcmp(arg, lessthan))) || (!(stdout_flag = strcmp(arg, greaterthan)))){
				redirection_flag = 1;
				if (!stdin_flag){
					arg = strtok_r(NULL, " ", &argSave);
					strcpy(list[stage_count].input, arg);
					if (stage_count == 0 && *commandSave != '\0'){
						sprintf(outputbuf, "pipe to stage %d", stage_count + 1);
						strcpy(list[stage_count].output, outputbuf);
					}
					stdin_count++;
				} else if (!stdout_flag){
					arg = strtok_r(NULL, " ", &argSave);
					strcpy(list[stage_count].output, arg);
					if (stage_count != 0 && *commandSave == '\0'){
						sprintf(inputbuf, "pipe from stage %d", stage_count - 1);
						strcpy(list[stage_count].input, inputbuf);
					}
					stdout_count++;
				} 
				if (stdin_flag == 0 && stage_count != 0) {
					fprintf(stderr, "%s: Ambiguous Input\n", list[stage_count].argv[0]);
					list[0].argc = -1;
					return;
				}
				if (*commandSave == '|'){
					fprintf(stderr, "Too many pipes\n");
					list[0].argc = -1;
					return;
				} else if (*(commandSave) != '\0'){
					//printf("stage not end pipe : %d value : %c\n", stage_count, *(commandSave + 1));
					if (stdout_count > 0){
						fprintf(stderr, "%s: Ambiguous Output\n", list[stage_count].argv[0]);
						list[0].argc = -1;
						return;					}
				}
				arg = strtok_r(NULL, " ", &argSave);
				continue;
			}
			//printf("arg : %s\n", arg);
			list[stage_count].argv[arg_count] = arg;
			arg_count++;
			arg = strtok_r(NULL, " ", &argSave);
			continue;

		} else if (arg == NULL) {
			if (!redirection_flag){
				sprintf(inputbuf, "pipe from stage %d", stage_count - 1);
				sprintf(outputbuf, "pipe to stage %d", stage_count + 1);
				if (stage_count > 0){
					strcpy(list[stage_count].input, inputbuf);
				}
				if (*commandSave != '\0'){
					strcpy(list[stage_count].output, outputbuf);
				}
			}
			list[stage_count].argv[arg_count] = NULL;
			list[stage_count].argc = arg_count;
			if (stage_count > 9 ){
				fprintf(stderr, "Pipeline too deep.\n");
				list[0].argc = -1;
				return;

			} else if (arg_count > 10){
				fprintf(stderr, "Too many arguments.\n");
				list[0].argc = -1;
				return;
			}

			list[stage_count].stage_num = stage_count;
			arg_count = 0;
			stage_count++;
			command = strtok_r(NULL, "|", &commandSave);
			arg = command;
			continue;
		}
	}

	if (stdout_count > 1 || stdin_count > 1){
		perror("Usage");
		list[0].argc = -1;
		return;
	} 


	list[stage_count].argc = -1;

}





void printFunc(pipeInf list[]){
	int i = 0;

	while (list[i].argc != -1){
		printf("\n--------\nStage %d: \"%s\"\n--------\n", list[i].stage_num, list[i].stage_name);
		printf("     input: %s\n",list[i].input);
		printf("    output: %s\n", list[i].output);
		printf("      argc: %d\n", list[i].argc);
		char printable[512];
		int offset = 0;
		for (int j = 0; j < list[i].argc; ++j){
			*(printable + offset++) = '\"';
			strcpy(printable + offset, list[i].argv[j]);
			offset += strlen(list[i].argv[j]);
			*(printable + offset++) = '\"';

			if ((j + 1) < list[i].argc){
				*(printable + offset++) = ',';
			}
		}
		*(printable + offset) = '\0';
		printf("      argv: %s\n", printable);
		i++;
	}
}

	
