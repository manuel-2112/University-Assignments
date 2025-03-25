% Tiempo óptimo 7
#const c = 7.

square(0..c, 0..c).
goal(0..c,c).
time(0..20).

piece(king).
pieceOn(0, 0, 0).

pawn(1,7).
pawn(5,0).
pawn(6,6).
pawn(7,3).
pawn(3,6).


rook(7,6,0).
rook(4,6,1).

bishop(0,6,3).
bishop(4,2,4).

knight(1,4).
knight(1,1).