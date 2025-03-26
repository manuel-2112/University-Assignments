# Informe Etapa 2

## Computador básico de 16 bits

#### Grupo 43
- Karina Alarcón
- Manuel Espinoza
- Ignacio Vial

#### Curso
Profesor Germán Contreras  
IIC2343 - Arquitectura de Computadores  
Sección 3  
Noviembre de 2023

---

## Introducción

En este informe se detalla 

## Componentes agregados

- Registro contador `SP` para la dirección del puntero al stack de 12 bits . (`SP.vhd`)
- Un multiplexor `Mux PC` para la carga del PC que selecciona una de dos entradas, cada una de 12 bits. (En `CPU.vhd`)
- Un multiplexor `Mux Datain` para la entrada de datos de la RAM que selecciona una de dos entradas, cada una de 16 bits. (En `CPU.vhd`)
- Un multiplexor `Mux S` para la dirección de la RAM que selecciona una de tres entradas, cada una de 12 bits. (En `CPU.vhd`)
- Un sumador `Adder12` que incrementa el valor de 12 bits del PC en 1 y entrega un resultado en 16 bits. (`Adder12.vhd`)

## Instrucciones de la ROM

El grupo decidió que la disposición de los bits de la ROM quedarían distribuidos de la siguiente manera:

- Bits `35` al `20`: Literal de la instrucción
- Bits `19` al `0`: Opcode

La distribución de las señales quedo detallada en `ContolUnit.vhd`.

## Assembler

Se implementó un assembler en Python que traduce un archivo de texto con instrucciones en assembly a un archivo de texto con las instrucciones en lenguaje de máquina. El assembler se encuentra en `/Assembler` y se ejecuta con el comando `python3 assembler.py <code_file>`.

El assembler es capaz de escribir directamente en la ROM usando la libreria ```iic2343``` documentada en [PyPi]("https://pypi.org/project/iic2343/").

## Distribución de trabajo:

El grupo se junto y todos se encargaron equitativamente del trabajo.

### Tabla de Instrucciones

De igual forma se detallan las de la Etapa 1 en `docs/Template-senales.xlsx`

| **Instrucción** | **OPCODES** |
| -----------  | -------------------- |
| **Etapa 1** |  |
| MOV A, B     | 00000000000000000000 |
| MOV B, A     | 00000000000000000001 |
| MOV A, LIT   | 00000000000000000010 |
| MOV B, LIT   | 00000000000000000011 |
| MOV A, DIR   | 00000000000000000100 |
| MOV B, DIR   | 00000000000000000101 |
| MOV DIR, A   | 00000000000000000110 |
| MOV DIR, B   | 00000000000000000111 |
| ADD A, B     | 00000000000000001000 |
| ADD B, A     | 00000000000000001001 |
| ADD A, LIT   | 00000000000000001010 |
| ADD A, DIR   | 00000000000000001011 |
| ADD DIR      | 00000000000000001100 |
| SUB A, B     | 00000000000000001101 |
| SUB B, A     | 00000000000000001110 |
| SUB A, LIT   | 00000000000000001111 |
| SUB A, DIR   | 00000000000000010000 |
| SUB DIR      | 00000000000000010001 |
| AND A, B     | 00000000000000010010 |
| AND B, A     | 00000000000000010011 |
| AND A, LIT   | 00000000000000010100 |
| AND A, DIR   | 00000000000000010101 |
| AND DIR      | 00000000000000010110 |
| OR A, B      | 00000000000000010111 |
| OR B, A      | 00000000000000011000 |
| OR A, LIT    | 00000000000000011001 |
| OR A, DIR    | 00000000000000011010 |
| OR DIR       | 00000000000000011011 |
| XOR A, B     | 00000000000000011100 |
| XOR B, A     | 00000000000000011101 |
| XOR A, LIT   | 00000000000000011110 |
| XOR A, DIR   | 00000000000000011111 |
| XOR DIR      | 00000000000000101000 |
| NOT A       | 00000000000000101001 |
| NOT B, A     | 00000000000000101010 |
| NOT DIR, A  | 00000000000000101011 |
| SHL A       | 00000000000000101100 |
| SHL B, A     | 00000000000000101101 |
| SHL DIR, A  | 00000000000000101110 |
| SHR A       | 00000000000000101111 |
| SHR B, A     | 00000000000000110000 |
| SHR DIR, A  | 00000000000000110001 |
| INC A       | 00000000000000110010 |
| INC B       | 00000000000000110011 |
| INC DIR     | 00000000000000110100 |
| DEC A       | 00000000000000110101 |
| CMP A, B     | 00000000000000110110 |
| CMP A, LIT   | 00000000000000110111 |
| CMP A, DIR   | 00000000000000111000 |
| JMP         | 00000000000000111001 |
| JEQ         | 00000000000000111010 |
| JNE         | 00000000000000111011 |
| **Etapa 2** |  |
| MOV A, (B)   | 00000000000000111100 |
| MOV B, (B)   | 00000000000000111101 |
| MOV (B), A   | 00000000000000111110 |
| MOV (B), LIT | 00000000000000111111 |
| ADD A, (B)   | 00000000000001000000 |
| ADD B, (B)   | 00000000000001000001 |
| SUB A, (B)   | 00000000000001000010 |
| SUB B, (B)   | 00000000000001000011 |
| AND A, (B)   | 00000000000001000100 |
| AND B, (B)   | 00000000000001000101 |
| OR A, (B)    | 00000000000001000110 |
| OR B, (B)    | 00000000000001000111 |
| XOR A, (B)   | 00000000000001001000 |
| XOR B, (B)   | 00000000000001001001 |
| NOT (B), A   | 00000000000001001010 |
| SHL (B), A   | 00000000000001001011 |
| SHR (B), A   | 00000000000001001100 |
| INC (B)     | 00000000000001001101 |
| CMP A, (B)   | 00000000000001001110 |
| JGT         | 00000000000001001111 |
| JGE         | 00000000000001010000 |
| JLT         | 00000000000001010001 |
| JLE         | 00000000000001010010 |
| JCR         | 00000000000001010011 |
| PUSH A      | 00000000000001010100 |
| PUSH B      | 00000000000001010101 |
| POP A       | 00000000000001010110 |
| POP A2      | 00000000000001010111 |
| POP B       | 00000000000001011000 |
| POP B2      | 00000000000001011001 |
| CALL        | 00000000000001011010 |
| RET         | 00000000000001011011 |
| RET_2       | 00000000000001011100 |
| ADD B, LIT  | 00000000000001011101 |
| ADD B, DIR  | 00000000000001011110 |
| SUB B, LIT  | 00000000000001011111 |
| SUB B, DIR  | 00000000000001100000 |
| AND B, LIT  | 00000000000001100001 |
| AND B, DIR  | 00000000000001100010 |
| OR B, LIT   | 00000000000001100011 |
| OR B, DIR   | 00000000000001100100 |
| XOR B, LIT  | 00000000000001100101 |
| XOR B, DIR  | 00000000000001100110 |
