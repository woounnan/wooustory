from z3 import *

p = Bool('p')
q = Bool('q')
r = Bool('r')
solve(p == Not(r), Or(Not(q), r))
