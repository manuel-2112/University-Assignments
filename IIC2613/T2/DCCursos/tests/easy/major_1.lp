% bound=4
cursos_major(0..3).

% Cursos del Major
major_necesario("IIC1001", 0).
major_necesario("IIC1002", 1).
major_necesario("IIC1003", 2).
major_necesario("IIC1004", 3).

% Cursos en dependencias
curso("IIC1001", 0).
curso("IIC1002", 0).
curso("IIC1003", 0).
curso("IIC1004", 0).

% Cursos y requisitos

% Para tomar IIC1002 se necesita IIC1001
requisito("IIC1002", 0, 0, 0, "IIC1001").
% Para tomar IIC1003 se necesita IIC1002
requisito("IIC1003", 0, 0, 0, "IIC1002").
% Para tomar IIC1004 se necesita IIC1003
requisito("IIC1004", 0, 0, 0, "IIC1003").
