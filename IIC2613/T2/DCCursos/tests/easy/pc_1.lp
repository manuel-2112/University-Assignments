% bound=4
cursos_pc(0..3).

% Cursos del Plan Comun
pc_necesario("MAT1610", 0).
pc_necesario("MAT1620", 1).
pc_necesario("MAT1630", 2).
pc_necesario("MAT1640", 3).

% Cursos en dependencias
curso("MAT1610", 0).
curso("MAT1620", 0).
curso("MAT1630", 0).
curso("MAT1640", 0).

% Cursos y requisitos

% Para tomar MAT1620 se necesita MAT1610
requisito("MAT1620", 0, 0, 0, "MAT1610").
% Para tomar MAT1630 se necesita MAT1620
requisito("MAT1630", 0, 0, 0, "MAT1620").
% Para tomar MAT1640 se necesita MAT1630
requisito("MAT1640", 0, 0, 0, "MAT1630").