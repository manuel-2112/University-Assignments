% Tiempo óptimo 5
#const c = 7.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(2,0,0).

% declaramos a los enemigos

pawn(4,6).

rook(7,6,0).
rook(3,2,2).

bishop(6,2,4).
bishop(5,5,5).

knight(4,3).
