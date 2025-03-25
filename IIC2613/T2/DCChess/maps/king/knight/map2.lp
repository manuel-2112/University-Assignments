% Tiempo óptimo 11
#const c = 7.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(7, 0, 0).

knight(7,7).
knight(0,7).
knight(4,4).
knight(2,5).
knight(6,4).
knight(6,1).
knight(0,1).