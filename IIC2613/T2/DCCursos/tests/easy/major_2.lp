% bound=4
cursos_major(0..4).

% Cursos del Major
major_necesario("IIC1001", 0).
major_necesario("IIC1002", 1).
major_necesario("IIC1003", 2).
major_necesario("IIC1004", 3).
major_optativo("IIC1100", 4).
% major_optativo("IIC1200", 4).
% major_optativo("IIC1300", 4).

% Cursos en dependencias
curso("IIC1001", 0).
curso("IIC1002", 0).
curso("IIC1003", 0).
curso("IIC1004", 0).
curso("IIC1100", 1).
curso("IIC1200", 2).
curso("IIC1300", 1).

% Cursos y requisitos

% Para tomar IIC1002 se necesita IIC1001
requisito("IIC1002", 0, 0, 0, "IIC1001").
% Para tomar IIC1003 se necesita IIC1002
requisito("IIC1003", 0, 0, 0, "IIC1002").
% Para tomar IIC1004 se necesita IIC1003
requisito("IIC1004", 0, 0, 0, "IIC1003").

% Para tomar IIC1100 se necesita IIC1001
requisito("IIC1100", 0, 0, 0, "IIC1001").
% Para tomar IIC1200 se necesita IIC1001
requisito("IIC1200", 0, 0, 0, "IIC1001").
% Para tomar IIC1300 se necesita IIC1001
requisito("IIC1300", 0, 0, 0, "IIC1001").
