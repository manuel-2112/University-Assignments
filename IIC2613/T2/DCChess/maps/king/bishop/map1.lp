% Tiempo óptimo 8
#const c = 7.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(0, 0, 0).

bishop(0,1,0).
bishop(0,3,1).
bishop(1,5,2).
bishop(5,7,3).
bishop(1,7,4).