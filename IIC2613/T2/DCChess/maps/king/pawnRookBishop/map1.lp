% Tiempo óptimo 13
#const c = 8.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(3, 2, 0).

pawn(1,6).
pawn(2,4).
pawn(4,2).
pawn(6,7).
pawn(6,5).

rook(6,4,0).
rook(1,7,1).

bishop(0,1,2).
bishop(7,6,3).
