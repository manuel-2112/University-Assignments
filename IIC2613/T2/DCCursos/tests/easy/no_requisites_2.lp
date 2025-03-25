% bound=1
cursos_pc(0..1).
cursos_major(0..1).

% Cursos del Plan Comun
pc_necesario("ING1000", 0).
pc_necesario("ING2000", 1).

% Cursos del Major
major_necesario("IIC1000", 0).
major_necesario("IIC2000", 1).

% Cursos en dependencias
curso("ING1000", 0).
curso("ING2000", 0).
curso("IIC1000", 0).
curso("IIC2000", 0).
