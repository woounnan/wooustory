all: patchme

clean: clean_patchme

patchme.o:
	nasm -f elf32 -o patchme.o patchme.S

patchme: patchme.o
	gcc -m32 -o patchme patchme.o -no-pie

clean_patchme:
	rm -f patchme
	rm -f patchme.o
