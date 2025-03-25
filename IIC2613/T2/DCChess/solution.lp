%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%% COSAS POR IMPLEMENTAR %%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                                                   %
% 1. Acciones del caballo (como jugador).           %
% 2. Movimientos del caballo (como jugador).        %
% 3. Knight blocks (bloqueos del caballo oponente). %
% 4. Bishop blocks (bloqueos del alfil oponente).   %
%                                                   %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Para utilizar un mapa y generar el archivo de salida para el visualizador:
% clingo maps/piece/(...)/mapX.lp solution.lp | python process.py

% Esto generara un archivo output.txt que puede ser visualizado en el visualizador (DCChess.html).

% -------------------------------------------------------------------------------------------
% ------------------------------ KING'S ACTIONS (REY JUGADOR) -------------------------------
% -------------------------------------------------------------------------------------------

% Ejecución acciones
1 {exec(A, T) : kingAction(A)} 1 :- piece(king), time(T + 1), T >= 0.

% Acciones del rey.
kingAction(up).             % 1 arriba
kingAction(down).           % 1 abajo
kingAction(left).           % 1 izquierda
kingAction(right).          % 1 derecha
kingAction(upright).        % 1 arriba y 1 derecha
kingAction(upleft).         % 1 arriba y 1 izquierda
kingAction(downright).      % 1 abajo y 1 derecha
kingAction(downleft).       % 1 abajo y 1 izquierda

% Movimientos rey
1 {pieceOn(X,Y+1,T+1) : exec(up, T), able(X,Y+1);
pieceOn(X,Y-1,T+1) : exec(down, T), able(X,Y-1);
pieceOn(X-1,Y,T+1) : exec(left, T), able(X-1,Y);
pieceOn(X+1,Y,T+1) : exec(right, T), able(X+1,Y);
pieceOn(X+1,Y+1,T+1) : exec(upright, T), able(X+1,Y+1);
pieceOn(X-1,Y+1,T+1) : exec(upleft, T), able(X-1,Y+1);
pieceOn(X-1,Y-1,T+1) : exec(downleft, T), able(X-1,Y-1);
pieceOn(X+1,Y-1,T+1) : exec(downright, T), able(X+1,Y-1)
} 1 :- piece(king), pieceOn(X,Y,T), not done(T).

% -------------------------------------------------------------------------------------------
% --------------------------- KNIGHT'S ACTIONS (CABALLO JUGADOR) ----------------------------
% -------------------------------------------------------------------------------------------

% Ejecución acciones
1 {exec(A, T) : knightAction(A)} 1 :- piece(knight), time(T + 1), T >= 0.

% Acciones del caballo.
knightAction(up2left1).  % 2 arriba, 1 izquierda
knightAction(up2right1). % 2 arriba, 1 derecha
knightAction(down2left1).% 2 abajo, 1 izquierda
knightAction(down2right1).% 2 abajo, 1 derecha
knightAction(left2up1).  % 2 izquierda, 1 arriba
knightAction(left2down1).% 2 izquierda, 1 abajo
knightAction(right2up1). % 2 derecha, 1 arriba
knightAction(right2down1).% 2 derecha, 1 abajo

% Movimientos del caballo
1 {pieceOn(X-1,Y+2,T+1) : exec(left2up1, T), able(X-1,Y+2);
   pieceOn(X+1,Y+2,T+1) : exec(right2up1, T), able(X+1,Y+2);
   pieceOn(X-1,Y-2,T+1) : exec(left2down1, T), able(X-1,Y-2);
   pieceOn(X+1,Y-2,T+1) : exec(right2down1, T), able(X+1,Y-2);
   pieceOn(X-2,Y+1,T+1) : exec(up2left1, T), able(X-2,Y+1);
   pieceOn(X+2,Y+1,T+1) : exec(up2right1, T), able(X+2,Y+1);
   pieceOn(X-2,Y-1,T+1) : exec(down2left1, T), able(X-2,Y-1);
   pieceOn(X+2,Y-1,T+1) : exec(down2right1, T), able(X+2,Y-1)
} 1 :- piece(knight), pieceOn(X,Y,T), not done(T).


% -------------------------------------------------------------------------------------------
% ---------------------------------- PAWN'S BLOCKS (PEON) -----------------------------------
% -------------------------------------------------------------------------------------------

% Down left
blocked(X-1,Y-1) :- pawn(X,Y), square(X-1,Y-1). 

% Down right
blocked(X+1,Y-1) :- pawn(X,Y), square(X+1,Y-1). 

% Presence
blocked(X,Y) :- pawn(X,Y), square(X,Y). 

% -------------------------------------------------------------------------------------------
% --------------------------------- ROOKS'S BLOCKS (TORRE) ----------------------------------
% -------------------------------------------------------------------------------------------

% Down
rook_attack_d(X,Y-D,I) :- rook(X,Y,I), D = 1..c , square(X,Y-D).
attack_line(X,Y,I) :- rook_attack_d(X,Y,I).
end_attack_line(X,Y-D,I) :- knight(X,Y), rook_attack_d(X,Y,I), square(X,Y-D), D = 1..c.
end_attack_line(X,Y-D,I) :- pawn(X,Y), rook_attack_d(X,Y,I), square(X,Y-D), D = 1..c.
end_attack_line(X,Y-D,I) :- bishop(X,Y,I2), rook_attack_d(X,Y,I), square(X,Y-D), D = 1..c.

% Right
rook_attack_r(X+D,Y,I) :- rook(X,Y,I), D = 1..c , square(X+D,Y).
attack_line(X,Y,I) :- rook_attack_r(X,Y,I).
end_attack_line(X+D,Y,I) :- knight(X,Y), rook_attack_r(X,Y,I), square(X+D,Y), D = 1..c.
end_attack_line(X+D,Y,I) :- pawn(X,Y), rook_attack_r(X,Y,I), square(X+D,Y), D = 1..c.
end_attack_line(X+D,Y,I) :- bishop(X,Y,I2), rook_attack_r(X,Y,I), square(X+D,Y), D = 1..c.

% Up
rook_attack_u(X,Y+D,I) :- rook(X,Y,I), D = 1..c , square(X,Y+D).
attack_line(X,Y,I) :- rook_attack_u(X,Y,I).
end_attack_line(X,Y+D,I) :- knight(X,Y), rook_attack_u(X,Y,I), square(X,Y+D), D = 1..c.
end_attack_line(X,Y+D,I) :- pawn(X,Y), rook_attack_u(X,Y,I), square(X,Y+D), D = 1..c.
end_attack_line(X,Y+D,I) :- bishop(X,Y,I2), rook_attack_u(X,Y,I), square(X,Y+D), D = 1..c.

% Left
rook_attack_l(X-D,Y,I) :- rook(X,Y,I), D = 1..c , square(X-D,Y).
attack_line(X,Y,I) :- rook_attack_l(X,Y,I).
end_attack_line(X-D,Y,I) :- knight(X,Y), rook_attack_l(X,Y,I), square(X-D,Y), D = 1..c.
end_attack_line(X-D,Y,I) :- pawn(X,Y), rook_attack_l(X,Y,I), square(X-D,Y), D = 1..c.
end_attack_line(X-D,Y,I) :- bishop(X,Y,I2), rook_attack_l(X,Y,I), square(X-D,Y), D = 1..c.

% Presence
blocked(X,Y) :- rook(X,Y,I), square(X,Y).

% Blocked by attack line
blocked(X,Y) :- attack_line(X,Y,I), not end_attack_line(X,Y,I).

% -------------------------------------------------------------------------------------------
% --------------------------------- BISHOP'S BLOCKS (ALFIL) ---------------------------------
% -------------------------------------------------------------------------------------------

% Down left
% Ataques diagonales del alfil
bishop_attack_d(X+D,Y+D,I) :- bishop(X,Y,I), D = 1..c, square(X+D,Y+D).
bishop_attack_d(X-D,Y+D,I) :- bishop(X,Y,I), D = 1..c, square(X-D,Y+D).
bishop_attack_d(X+D,Y-D,I) :- bishop(X,Y,I), D = 1..c, square(X+D,Y-D).
bishop_attack_d(X-D,Y-D,I) :- bishop(X,Y,I), D = 1..c, square(X-D,Y-D).

attack_line(X,Y,I) :- bishop_attack_d(X,Y,I).
end_attack_line(X+D,Y+D,I) :- knight(X,Y), bishop_attack_d(X,Y,I), square(X+D,Y+D), D = 1..c.
end_attack_line(X-D,Y+D,I) :- knight(X,Y), bishop_attack_d(X,Y,I), square(X-D,Y+D), D = 1..c.
end_attack_line(X+D,Y-D,I) :- knight(X,Y), bishop_attack_d(X,Y,I), square(X+D,Y-D), D = 1..c.
end_attack_line(X-D,Y-D,I) :- knight(X,Y), bishop_attack_d(X,Y,I), square(X-D,Y-D), D = 1..c.

% Bloqueo por líneas de ataque del alfil
blocked(X,Y) :- attack_line(X,Y,I), not end_attack_line(X,Y,I).


% -------------------------------------------------------------------------------------------
% -------------------------------- KNIGHT'S BLOCKS (CABALLO) --------------------------------
% -------------------------------------------------------------------------------------------

% Down left
blocked(X-1,Y+2) :- knight(X,Y), square(X-1,Y+2).
blocked(X+1,Y+2) :- knight(X,Y), square(X+1,Y+2).
blocked(X-1,Y-2) :- knight(X,Y), square(X-1,Y-2).
blocked(X+1,Y-2) :- knight(X,Y), square(X+1,Y-2).
blocked(X-2,Y+1) :- knight(X,Y), square(X-2,Y+1).
blocked(X+2,Y+1) :- knight(X,Y), square(X+2,Y+1).
blocked(X-2,Y-1) :- knight(X,Y), square(X-2,Y-1).
blocked(X+2,Y-1) :- knight(X,Y), square(X+2,Y-1).

% -------------------------------------------------------------------------------------------
% ----------------------------------- REGLAS GENERALES --------------------------------------
% -------------------------------------------------------------------------------------------

% Regla para caminos no bloqueados
able(X,Y) :- not blocked(X,Y), square(X,Y).

% Reglas para el término del juego
done(X,Y,T) :- pieceOn(X, Y, T), goal(X, Y).
done(T) :- done(X,Y,T).
#minimize{T : done(T)}.

% -------------------------------------------------------------------------------------------
% ------------------------------- VISUALIZADOR DE RESULTADOS --------------------------------
% -------------------------------------------------------------------------------------------
#show square/2.
#show time/1.
#show done/1.
#show goal/2.
#show bishop/3.
#show knight/2.
#show pawn/2.
#show rook/3.
#show pieceOn/3.
#show piece/1.
#show blocked/2.
