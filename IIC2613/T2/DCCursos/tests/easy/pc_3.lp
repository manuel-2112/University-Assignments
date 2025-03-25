% bound=4
cursos_pc(0..7).

% Cursos del Plan Comun
pc_necesario("MAT1610", 0).
pc_necesario("MAT1620", 1).
pc_necesario("MAT1630", 2).
pc_necesario("MAT1640", 3).
pc_necesario("MAT1611", 4).
pc_necesario("MAT1621", 5).
pc_necesario("MAT1631", 6).
pc_necesario("MAT1641", 7).

% Cursos en dependencias
curso("MAT1610", 0).
curso("MAT1620", 0).
curso("MAT1630", 0).
curso("MAT1640", 0).
curso("MAT1611", 0).
curso("MAT1621", 0).
curso("MAT1631", 0).
curso("MAT1641", 0).

% Cursos y requisitos

% Para tomar MAT1620 se necesita MAT1610 y MAT1611
requisito("MAT1620", 0, 0, 0, "MAT1610").
requisito("MAT1620", 0, 1, 0, "MAT1611").
% Para tomar MAT1630 se necesita MAT1620 y MAT1621
requisito("MAT1630", 0, 0, 0, "MAT1620").
requisito("MAT1630", 0, 1, 0, "MAT1621").
% Para tomar MAT1640 se necesita MAT1630 y MAT1631
requisito("MAT1640", 0, 0, 0, "MAT1630").
requisito("MAT1640", 0, 1, 0, "MAT1631").

% Para tomar MAT1611 se necesita estar cursando (o haber cursado) MAT1610
correquisito("MAT1611", 0, 0, 0, "MAT1610").
% Para tomar MAT1621 se necesita estar cursando (o haber cursado) MAT1620
correquisito("MAT1621", 0, 0, 0, "MAT1620").
% Para tomar MAT1631 se necesita estar cursando (o haber cursado) MAT1630
correquisito("MAT1631", 0, 0, 0, "MAT1630").
% Para tomar MAT1641 se necesita estar cursando (o haber cursado) MAT1640
correquisito("MAT1641", 0, 0, 0, "MAT1640").