% Tiempo óptimo 5
#const c = 9.
square(0..c,0..c).
time(0..30).

% Elegimos con que pieza queremos jugar
piece(knight).

% Definimos la meta
goal(0..c,c).

% definimos la posición inicial
pieceOn(3,0,0).

% declaramos a los enemigos
bishop(1,3,0).
bishop(2,5,1).
bishop(6,2,2).
bishop(3,5,3).
bishop(9,9,4).
bishop(1,9,5).