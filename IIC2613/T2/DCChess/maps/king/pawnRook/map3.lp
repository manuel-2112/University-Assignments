% Tiempo óptimo 7
#const c = 7.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(7, 0, 0).

pawn(1,5).
pawn(6,2).
pawn(4,2).
pawn(3,2).
pawn(6,7).
pawn(6,4).

rook(0,2,0).
rook(4,7,1).
rook(5,4,2).