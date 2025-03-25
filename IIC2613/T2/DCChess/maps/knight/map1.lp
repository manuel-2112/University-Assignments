% Declaraciones del mundo
#const c = 7.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(D, c) :- D = 1..c.

% definimos la posición inicial
pieceOn(0,0,0).

% declaramos a los enemigos
rook(3,3,0).
bishop(3,5,1).
pawn(5,5).
pawn(2,2).
pawn(2,6).
king(4,4).