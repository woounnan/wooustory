
import frida, sys, re
import codecs, time

from subprocess import *

def get_pid(name):
    return check_output(["pidof",name])


APP_NAME = "sg.vantagepoint.uncrackable3"
#PID = int(sys.argv[1])

def sbyte2ubyte(byte):
    return (byte % 256)

def print_result(message):
    print ("[*] %s" %(message))

def on_message(message, data):
    if 'payload' in message:
        data = message['payload']
        if type(data) is str:
            print_result(data)
        elif type(data) is list:
            a = data[0]
            if type(a) is int:
                print_result("".join([("%02X" % (sbyte2ubyte(a))) for a in data]))
            else:
                print_result(data)
        else:
            print_result(data)
    else:
        if message['type'] == 'error':
            print (message['stack'])
        else:
            print_result(message)

with codecs.open("hook.js", 'r', encoding='utf8') as f:
    p = Popen(["cmd.exe", "/C", "tasklist | findstr DarkEden.exe"], stdout=PIPE)
    output = p.communicate()[0]
    print('output: ' + output)
    import re
    pt = re.compile("[0-9]{3,5} C")
    i = 0
    while True:
        try:
            m = pt.findall(output)[i].split(' ')[0]
            print('pid: ' + m)
            jscode  = f.read()
            session = frida.attach(int(m, 10))
            break
        except frida.TransportError:
            print('Failed to connect ['+ m + ']')
            i += 1
            continue
    script  = session.create_script(jscode)
    #device.resume(APP_NAME)
    script.on('message', on_message)
    print ("[*] Intercepting ...")
    script.load()
    sys.stdin.read()