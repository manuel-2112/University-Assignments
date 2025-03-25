% bound=4
cursos_major(0..7).

% Cursos del Major
major_necesario("IIC1001", 0).
major_necesario("IIC1002", 1).
major_necesario("IIC1003", 2).
major_necesario("IIC1004", 3).
major_necesario("IIC1101", 4).
major_necesario("IIC1102", 5).
major_necesario("IIC1103", 6).
major_necesario("IIC1104", 7).

% Cursos en dependencias
curso("IIC1001", 0).
curso("IIC1002", 0).
curso("IIC1003", 0).
curso("IIC1004", 0).
curso("IIC1101", 1).
curso("IIC1102", 2).
curso("IIC1103", 1).
curso("IIC1104", 2).

% Cursos y requisitos

% Para tomar IIC1002 se necesita IIC1001
requisito("IIC1002", 0, 0, 0, "IIC1001").
% Para tomar IIC1003 se necesita IIC1002
requisito("IIC1003", 0, 0, 0, "IIC1002").
% Para tomar IIC1004 se necesita IIC1003
requisito("IIC1004", 0, 0, 0, "IIC1003").

% Para tomar IIC1101 se necesita estar cursando (o haber cursado) IIC1001
correquisito("IIC1101", 0, 0, 0, "IIC1001").
% Para tomar IIC1102 se necesita estar cursando (o haber cursado) IIC1002
correquisito("IIC1102", 0, 0, 0, "IIC1002").
% Para tomar IIC1103 se necesita estar cursando (o haber cursado) IIC1003
correquisito("IIC1103", 0, 0, 0, "IIC1003").
% Para tomar IIC1104 se necesita estar cursando (o haber cursado) IIC1004
correquisito("IIC1104", 0, 0, 0, "IIC1004").
