# 설명

poison null byte attack을 이용한 fastbin fd overwrite로 oneshot 쉘 획득 익스플로잇

--- 
# 환경

### OS
```sh
root@ubuntu:/work# uname -a
Linux ubuntu 4.15.0-45-generic #48~16.04.1-Ubuntu SMP Tue Jan 29 18:03:48 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
```

### libc
```sh
root@ubuntu:/work# ldd test
	linux-vdso.so.1 =>  (0x00007fff243f7000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fc928388000)
	/lib64/ld-linux-x86-64.so.2 (0x00007fc928752000)
root@ubuntu:/work# ls -al /lib/x86_64-linux-gnu/libc.so.6
lrwxrwxrwx 1 root root 12 Apr 18  2020 /lib/x86_64-linux-gnu/libc.so.6 -> lib
```
--- 
# 참조
[https://velog.io/@woounnan/SYSTEM-Poison-Null-Byte-Libc-Leak](https://velog.io/@woounnan/SYSTEM-Poison-Null-Byte-Libc-Leak)
