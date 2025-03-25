% bound=2
cursos_pc(0..3).
cursos_major(0..3).

% Cursos del Plan Comun
pc_necesario("ING1000", 0).
pc_necesario("ING2000", 1).
pc_necesario("ING3000", 2).
pc_necesario("ING4000", 3).

% Cursos del Major
major_necesario("IIC1000", 0).
major_necesario("IIC2000", 1).
major_necesario("IIC3000", 2).
major_necesario("IIC4000", 3).

% Cursos en dependencias
curso("ING1000", 0).
curso("ING2000", 0).
curso("ING3000", 0).
curso("ING4000", 0).
curso("IIC1000", 0).
curso("IIC2000", 0).
curso("IIC3000", 0).
curso("IIC4000", 0).
