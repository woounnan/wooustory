#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
 
int main()
{
    unlink("file");
    symlink("./etc/passwd","file");
    return 1;
}
