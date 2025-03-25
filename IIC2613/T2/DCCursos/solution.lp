% Los test son ejecutados mediante "clingo solution.lp tests/subcarpeta/nombre_test.lp -c bound=X"

% ACTIVIDAD 1: Reglas Basicas
%----------------------------------------

% 1.1 Cada curso solo puede tomarse hasta una vez
% COMPLETAR

% 1.2 Cada semestre se toman a lo sumo 6 cursos
% COMPLETAR

% 1.3 Se toman todos los cursos X_necesarios de Plan Comun y Major
% COMPLETAR

% 1.4 Solo se puede tomar un curso en un semestre par/impar si es dictado en ese semestre
% COMPLETAR

% 1.5 Para un mismo ID de requisito (definido en X_optativo(C, ID)), se debe tomar al menos uno de los cursos
% COMPLETAR


% ACTIVIDAD 2: Requisitos y Correquisitos
%----------------------------------------

% 2.1 Cumplir el subrequisito 3 de un curso para un cierto IDX1 e IDX2
% COMPLETAR

% 2.2 Cumplir el subrequisito 2 de un curso para un cierto IDX1
% COMPLETAR

% 2.3 Cumplir el subrequisito 1 de un curso
% COMPLETAR

% 2.4 Si tiene requisitos, se necesita cumplir el subrequisito 1 de un curso para poder tomarlo
% COMPLETAR


% NO TOCAR!!
%----------------------------------------
% Se definen los semestres usando la constante especificada mediante "-c bound=X"
semestre(1..bound).

% Usado para visualizar la toma final de cursos
#show tomar/2.

% Esta linea permite minimizar el numero total de cursos tomados en total, no tocar
total_courses(T) :- T = #count {C : tomar(C, _)}.
#minimize{T : total_courses(T)}.

% Definimos predicados presentes en los test para evitar errores
#defined pc_necesario/2.
#defined major_necesario/2.
#defined pc_optativo/2.
#defined major_optativo/2.
#defined requisito/5.
#defined correquisito/5.
#defined cursos_major/1.
#defined cursos_pc/1.