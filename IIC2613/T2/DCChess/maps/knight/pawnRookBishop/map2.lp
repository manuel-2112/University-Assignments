% Tiempo óptimo 4
#const c = 8.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(5,0,0).

pawn(2,5).
pawn(6,4).

% rook(1,1,0).
rook(8,5,0).
rook(6,7,1).
rook(0,3,2).

bishop(1,2,3).
bishop(5,2,4).