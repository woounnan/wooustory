from z3 import *
x = Real('x')
s = Solver()
s.add(x**2 == 4)
print s.check()
print s.mode()
