% Tiempo óptimo 5
#const c = 7.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(5,0,0).

knight(0,0).
knight(0,7).
knight(7,7).
knight(7,0).
knight(3,3).
knight(4,3).
knight(3,4).
knight(6,7).