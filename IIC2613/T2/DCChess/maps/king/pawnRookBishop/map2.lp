% Tiempo óptimo 10
#const c = 8.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(7, 1, 0).

pawn(1,7).
pawn(5,0).
pawn(6,6).
pawn(8,3).
pawn(3,6).


rook(8,6,0).
rook(4,6,1).

bishop(8,8,2).
bishop(0,8,3).
bishop(4,2,4).