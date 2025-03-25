% bound=4
cursos_pc(0..3).
cursos_major(0..3).

% Cursos del Plan Comun
pc_necesario("MAT1610", 0).
pc_necesario("MAT1620", 1).
pc_necesario("MAT1630", 2).
pc_necesario("MAT1640", 3).

% Cursos del Major
major_necesario("IIC1001", 0).
major_necesario("IIC1002", 1).
major_necesario("IIC1003", 2).
major_necesario("IIC1004", 3).

% Cursos en dependencias
curso("MAT1610", 0).
curso("MAT1620", 0).
curso("MAT1630", 0).
curso("MAT1640", 0).
curso("IIC1001", 0).
curso("IIC1002", 0).
curso("IIC1003", 0).
curso("IIC1004", 0).

% Cursos y requisitos

% Para tomar MAT1620 se necesita MAT1610
requisito("MAT1620", 0, 0, 0, "MAT1610").
% Para tomar MAT1630 se necesita MAT1620
requisito("MAT1630", 0, 0, 0, "MAT1620").
% Para tomar MAT1640 se necesita MAT1630
requisito("MAT1640", 0, 0, 0, "MAT1630").

% Para tomar IIC1002 se necesita IIC1001
requisito("IIC1002", 0, 0, 0, "IIC1001").
% Para tomar IIC1003 se necesita IIC1002
requisito("IIC1003", 0, 0, 0, "IIC1002").
% Para tomar IIC1004 se necesita IIC1003
requisito("IIC1004", 0, 0, 0, "IIC1003").
