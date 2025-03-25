% Tiempo óptimo 7
#const c = 7.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(6,0,0).

% declaramos a los enemigos
pawn(5,5).
pawn(2,2).
pawn(2,6).
pawn(1,4).
pawn(7,3).
pawn(6,7).


rook(3,3,0).
rook(1,2,1).
rook(7,5,2).
