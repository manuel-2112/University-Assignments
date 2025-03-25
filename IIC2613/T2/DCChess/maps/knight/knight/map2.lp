% Tiempo óptimo 6
#const c = 7.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(0,0,0).

knight(4,5).
knight(2,3).
knight(1,7).
knight(2,7).
knight(6,3).
knight(6,7).