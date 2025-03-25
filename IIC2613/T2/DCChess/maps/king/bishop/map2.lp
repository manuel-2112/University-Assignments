% Tiempo óptimo 4
#const c = 9.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(3, 5, 0).

bishop(8,1,0).
bishop(3,6,1).
bishop(3,4,2).
bishop(2,5,3).