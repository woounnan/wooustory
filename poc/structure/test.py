from pwn import *
import re
context.update(log_level = 'debug')

p = process('./test')
#print u64(p.recv(999)[:-0x43][-6:].ljust(8, '\x00'))
_recv = p.recvrepeat(0.1)
print hex(u64(_recv[-0x60-1:-0x60-1+6].ljust(8, '\x00'))-132)
raw_input('debug: ' + str(p.pid))
p.interactive()
