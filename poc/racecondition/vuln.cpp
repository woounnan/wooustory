#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
  
int main()
{
    int fd;
    char *file = "file";
    char buffer[]="Success!! Race Condition : lazenca.0x0\n";
 
    int ret = access(file, W_OK);
    printf("ret: %d\n", ret);
    if (!ret) {
        printf("Able to open file %s.\n",file);
        fd = open(file, O_WRONLY);
        write(fd, buffer, sizeof(buffer));
        close(fd);
    }else{
        printf("Unable to open file %s.\n",file);
	sleep(1);
    }
    return 1;
}
