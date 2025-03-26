# Informe Etapa 1

## Computador básico de 16 bits

#### Grupo 43
- Karina Alarcón
- Manuel Espinoza
- Ignacio Vial

#### Curso
Profesor Germán Contreras  
IIC2343 - Arquitectura de Computadores  
Sección 3  
Septiembre de 2023

---

## Introducción

En este informe se detalla el diseño de una unidad de control y con ello también el lenguaje de máquina que se almacenará en las palabras de 36 bits de la ROM. Donde se implementó un algoritmo de multiplicación de dos números en el lenguaje de máquina de la ROM.

## Componentes agregados

- Dos registros `Reg A` y `Reg B` de uso general, de 16 bits. (`Reg.vhd`)
- Una unidad aritmética lógica `ALU` con 8 operaciones de 16 bits. (`ALU.vhd`)
- Un registro contador `PC` para el address de la instrucción del programa, de al menos 12 bits. (`PC.vhd`)
- Dos multiplexores `Mux A` y `Mux B` de cada uno de cuatro entradas de 16 bits. (Están implementados dentro de `CPU.vhd`)
- Una unidad de control `Control Unit` implementada con lógica combinacional. (`ControlUnit.vhd`)
- Un registro `Status` para los flags C, Z y N. (`RegistroStatus.vhd`)

## Instrucciones de la ROM

El grupo decidió que la disposición de los bits de la ROM quedarían distribuidos de la siguiente manera:

- Bits `35` al `20`: Literal de la instrucción
- Bits `19` al `0`: Opcode

La distribución de las señales quedo:

- LoadPC: `16`
- enableA: `15`
- enableB: `14`
- selA: `13 : 12`
- selB: `11 : 10`
- sop (selALU2, selALU1, selALU0): `9 : 7`
- w: `6`

El codigo de multiplicacion es el siguiente:

```assembly
DATA:
  x 20
  y 4
  res 0

; vamos a sumar y veces x
; B cuenta la cantidad de veces que ya lo sumamos, parte en 0
CODE:
  MOV B, 0

LOOP:
  MOV A, (y)     ; guardamos el valor de y para poder compararlo con B
  CMP A, B       ; si ya sumamos y veces, termina el loop
  JEQ END
  MOV A, (x)     ; guardamos en A el valor de x
  ADD A, (res)   ; sumamos res + x
  MOV (res), A   ; guardamos este nuevo valor
  INC B          ; B += 1 (porque sumamos una vez x)
  JMP loop       ; iteramos

END:
  MOV A, (res)
```

## Distribución de trabajo:

- Karina Alarcón: Se encargo del algoritmo de multiplicación en Assembly. Además, paso información a Excel e hizo el informe.
- Manuel Espinoza: Conexiones CPU, Control Unit, Muxers. Configuración en la ROM del codigo.
- Ignacio Vial: ALU, y registros (PC, Reg, RegistroStatus).

Esta distribución es una simplificacion del trabajo que se realizó. Todo tuvo colaboración de todos los integrantes del grupo en todas las etapas del proyecto.

### Tabla de Instrucciones

De igual forma se detallan en `docs/Template-senales.xlsx`

| INSTRUCCIÓN    | OPCODE            |
| --------------- | ------------------ |
| MOV A , B       | 00000000000000000000 |
| MOV B, A       | 00000000000000000001 |
| MOV A, LIT     | 00000000000000000010 |
| MOV B, LIT     | 00000000000000000011 |
| MOV A, DIR     | 00000000000000000100 |
| MOV B, DIR     | 00000000000000000101 |
| MOV DIR, A     | 00000000000000000110 |
| MOV DIR, B     | 00000000000000000111 |
| ADD A, B       | 00000000000000001000 |
| ADD B, A       | 00000000000000001001 |
| ADD A, LIT     | 00000000000000001010 |
| ADD A, DIR     | 00000000000000001011 |
| ADD DIR        | 00000000000000001100 |
| SUB A, B       | 00000000000000001101 |
| SUB B, A       | 00000000000000001110 |
| SUB A, LIT     | 00000000000000001111 |
| SUB A, DIR     | 00000000000000010000 |
| SUB DIR        | 00000000000000010001 |
| AND A, B       | 00000000000000010010 |
| AND B, A       | 00000000000000010011 |
| AND A, LIT     | 00000000000000010100 |
| AND A, DIR     | 00000000000000010101 |
| AND DIR        | 00000000000000010110 |
| OR A, B        | 00000000000000010111 |
| OR B, A        | 00000000000000011000 |
| OR A, LIT      | 00000000000000011001 |
| OR A, DIR      | 00000000000000011010 |
| OR DIR         | 00000000000000011011 |
| XOR A, B       | 00000000000000011100 |
| XOR B, A       | 00000000000000011101 |
| XOR A, LIT     | 00000000000000011110 |
| XOR A, DIR     | 00000000000000011111 |
| XOR DIR        | 00000000000000101000 |
| NOT A          | 00000000000000101001 |
| NOT B, A       | 00000000000000101010 |
| NOT DIR, A     | 00000000000000101011 |
| SHL A          | 00000000000000101100 |
| SHL B, A       | 00000000000000101101 |
| SHL DIR, A     | 00000000000000101110 |
| SHR A          | 00000000000000101111 |
| SHR B, A       | 00000000000000110000 |
| SHR DIR, A     | 00000000000000110001 |
| INC B          | 00000000000000110011 |
| INC DIR        | 00000000000000110100 |
| CMP A, B       | 00000000000000110110 |
| CMP A, LIT     | 00000000000000110111 |
| JMP             | 00000000000000111001 |
| JEQ             | 00000000000000111010 |
| JNE             | 00000000000000111011 |
| JLT             | 00000000000000111100 |
| NOP             | -                |

