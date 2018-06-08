#ifndef MUSH_H
#define MUSH_H
#define READ_END 0
#define WRITE_END 1

void piper(pipeInf list[]);
void pipeInputHandler(int flag, FILE *file);
void changeDirectory(char *directory);
void middleChild(int fd_in, int fd_out, int fd_carry, pipeInf curr);
void firstChild(int fd_in, int fd_out, int fd_carry, int *fd_rin, pipeInf curr);
void lastChild(int fd_in, int fd_out, int fd_carry, int *fd_rout, pipeInf curr);
void redirectInput(pipeInf curr, int *fd_rin);
void redirectOutput(pipeInf curr, int *fd_rout);
void oneStage(pipeInf curr, pid_t temp_child, int *fd_rin, int *fd_rout);

void handler(int signum);

#endif
