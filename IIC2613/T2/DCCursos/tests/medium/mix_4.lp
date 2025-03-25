% bound=4
cursos_pc(0..9).
cursos_major(0..9).

% Cursos del Plan Comun
pc_necesario("MAT1610", 0).
pc_necesario("MAT1620", 1).
pc_necesario("MAT1630", 2).
pc_necesario("MAT1640", 3).
pc_necesario("MAT1611", 4).
pc_necesario("MAT1621", 5).
pc_necesario("MAT1631", 6).
pc_necesario("MAT1641", 7).
pc_necesario("FIS1101", 8).
pc_necesario("FIS1102", 9).

% Cursos del Major
major_necesario("IIC1001", 0).
major_necesario("IIC1002", 1).
major_necesario("IIC1003", 2).
major_necesario("IIC1004", 3).
major_necesario("IIC1101", 4).
major_necesario("IIC1102", 5).
major_necesario("IIC1103", 6).
major_necesario("IIC1104", 7).
major_necesario("IIC2001", 8).
major_necesario("IIC2002", 9).

% Cursos en dependencias
curso("MAT1610", 0).
curso("MAT1620", 0).
curso("MAT1630", 0).
curso("MAT1640", 0).
curso("MAT1611", 0).
curso("MAT1621", 0).
curso("MAT1631", 0).
curso("MAT1641", 0).
curso("FIS1101", 0).
curso("FIS1102", 0).
curso("IIC1001", 0).
curso("IIC1002", 0).
curso("IIC1003", 0).
curso("IIC1004", 0).
curso("IIC1101", 1).
curso("IIC1102", 2).
curso("IIC1103", 1).
curso("IIC1104", 2).
curso("IIC2001", 2).
curso("IIC2002", 1).

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

% Para tomar FIS1101 se necesita estar cursando (o haber cursado) MAT1610
correquisito("FIS1101", 0, 0, 0, "MAT1610").

% Para tomar FIS1102 se necesita FIS1101 y (estar dando (o haber dado) MAT1620 o estar dando (o haber dado) MAT1621)
requisito("FIS1102", 0, 0, 0, "FIS1101").
correquisito("FIS1102", 0, 1, 0, "MAT1620").
requisito("FIS1102", 1, 0, 0, "FIS1101").
correquisito("FIS1102", 1, 1, 0, "MAT1621").

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

% Para tomar IIC2001 se necesita estar cursando (o haber cursado) IIC1001
correquisito("IIC2001", 0, 0, 0, "IIC1001").

% Para tomar IIC2002 se necesita IIC2001 y (estar dando (o haber dado) IIC1002 o estar dando (o haber dado) IIC1102)
requisito("IIC2002", 0, 0, 0, "IIC2001").
correquisito("IIC2002", 0, 1, 0, "IIC1002").
requisito("IIC2002", 1, 0, 0, "IIC2001").
correquisito("IIC2002", 1, 1, 0, "IIC1102").