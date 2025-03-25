% Tiempo óptimo 4
#const c = 7.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(2,1,0).

% declaramos a los enemigos
bishop(1,1,0).
bishop(7,7,1).
bishop(0,7,2).
bishop(6,3,3).
bishop(0,6,4).