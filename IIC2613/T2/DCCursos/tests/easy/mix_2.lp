% bound=4
cursos_pc(0..4).
cursos_major(0..4).

% Cursos del Plan Comun
pc_necesario("MAT1610", 0).
pc_necesario("MAT1620", 1).
pc_necesario("MAT1630", 2).
pc_necesario("MAT1640", 3).

pc_optativo("BIO143M", 4).
pc_optativo("BIO110C", 4).
pc_optativo("BIO141C", 4).
pc_optativo("BIO135C", 4).

% Cursos del Major
major_necesario("IIC1001", 0).
major_necesario("IIC1002", 1).
major_necesario("IIC1003", 2).
major_necesario("IIC1004", 3).
major_optativo("IIC1100", 4).
major_optativo("IIC1200", 4).
major_optativo("IIC1300", 4).

% Cursos en dependencias
curso("MAT1610", 0).
curso("MAT1620", 0).
curso("MAT1630", 0).
curso("MAT1640", 0).
curso("BIO143M", 0).
curso("BIO110C", 0).
curso("BIO141C", 0).
curso("BIO135C", 0).
curso("IIC1001", 0).
curso("IIC1002", 0).
curso("IIC1003", 0).
curso("IIC1004", 0).
curso("IIC1100", 1).
curso("IIC1200", 2).
curso("IIC1300", 1).

% Cursos y requisitos

% Para tomar MAT1620 se necesita MAT1610
requisito("MAT1620", 0, 0, 0, "MAT1610").
% Para tomar MAT1630 se necesita MAT1620
requisito("MAT1630", 0, 0, 0, "MAT1620").
% Para tomar MAT1640 se necesita MAT1630
requisito("MAT1640", 0, 0, 0, "MAT1630").

% Para tomar BIO135C se necesita BIO141C
requisito("BIO135C", 0, 0, 0, "BIO141C").
% Para tomar BIO135C se necesita MEB103F
requisito("BIO135C", 1, 0, 0, "MEB103F").
% Para tomar BIO135C se necesita BIO136C
requisito("BIO135C", 2, 0, 0, "BIO136C").
% Para tomar BIO135C se necesita MEB103E
requisito("BIO135C", 2, 1, 0, "MEB103E").
% Para tomar BIO135C se necesita BIO152C
requisito("BIO135C", 3, 0, 0, "BIO152C").
% Para tomar BIO143M se necesita MAT1610
requisito("BIO143M", 0, 0, 0, "MAT1610").

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

