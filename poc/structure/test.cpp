#include<stdio.h>

int main(){

	setbuf(stdout, NULL);
	stdout->_flags = 0xfbad0000 | 0x1800;
	*((char*)(&stdout->_IO_write_base)) = 0x00;
	printf("%p\n", stdout->_IO_write_base);

	puts("hihellowannyung");
	getchar();

	return 0;
}
