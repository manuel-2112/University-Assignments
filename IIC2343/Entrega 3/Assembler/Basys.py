from iic2343 import Basys3
from binary_instructions import BinaryInstructions
import parameters as p
from funciones_auxiliares import *

def write_to_rom(instructions):
    instance = Basys3()
    instance.begin(port_number=0)
    n_line = 0
    line_white = p.WHITE_LINE
    for line in instructions:
        byte_array = int(line, 2).to_bytes((len(line) + 7) // 8, byteorder='big')
        instance.write(n_line, bytearray(byte_array))
        n_line += 1
    for _ in range(700):
        byte_array = int(line_white, 2).to_bytes((len(line_white) + 7) // 8, byteorder='big')
        instance.write(n_line, bytearray(byte_array))
        n_line += 1
    instance.end()


def translate_lines(opcodes, data, code):
    # Lista para almacenar las instrucciones binarias generadas
    lines_binary = BinaryInstructions()
    # Diccionario para mapear nombres de variables a direcciones de memoria y valores
    direcciones = {}

    # Contador para las direcciones de memoria asignadas
    contador_direccion_RAM = 0

    # Procesamiento de la sección de datos
    for line in data:
        if len(line) > 2:
            # Asignar dirección y valor a la variable principal
            direcciones[line[0]] = [bin(contador_direccion_RAM)[2:].zfill(16), check_type(line[1])]
            contador_direccion_RAM += 1

            # Asignar direcciones y valores a las subvariables
            count = 2
            while count < len(line):
                string = line[0] + "_" + str(count)
                direcciones[string] = [bin(contador_direccion_RAM)[2:].zfill(16), check_type(line[count])]
                count += 1
                contador_direccion_RAM += 1
        
        elif len(line) <= 2:
            # Asignar dirección y valor a la variable
            number = check_type(line[1])
            direcciones[line[0]] = [bin(contador_direccion_RAM)[2:].zfill(16), number]
            contador_direccion_RAM += 1 

    # Generar instrucciones de carga (MOV) para las variables en la sección de datos
    for elem in direcciones:
        lines_binary.append(direcciones[elem][1] + opcodes["MOV_A_LIT"])
        lines_binary.append(direcciones[elem][0] + opcodes["MOV_DIR_A"])

    # Instrucción de carga para finalizar la sección de datos
    lines_binary.append("0000000000000000" + opcodes["MOV_A_LIT"])

    # Inicialización del contador de direcciones de memoria para la sección de código
    i = (contador_direccion_RAM * 2) + 1

    # Procesamiento de la sección de código
    for line in code:
        # Guardar direcciones de labels
        if len(line) == 1:
            if line[0] == "RET":
                i += 2
                continue
            direcciones[line[0][:-1]] = [bin(i)[2:].zfill(16), line[0]]
            i -= 1
        if len(line) == 2:
            if "POP" == line[0]:
                i += 1
        i += 1

    # Generar instrucciones de código
    for line in code:
        # Instrucción RET
        if len(line) == 1:
            if line[0] == "RET":
                lines_binary.append("0000000000000000" + opcodes["RET"])
                lines_binary.append("0000000000000000" + opcodes["RET_2"])

        # Instrucciones con 2 operandos
        elif len(line) == 2:
            # Operaciones con A, B o (B)
            if line[1] == "B" or line[1] == "A" or line[1] == "(B)":
                # Instrucción POP
                if line[0] == "POP":
                    lines_binary.append("0000000000000000" + opcodes["POP_" + line[1]])
                    lines_binary.append("0000000000000000" + opcodes["POP_" + line[1] + "2"])
                # Instrucción CALL
                elif line[0] == "CALL":
                    lines_binary.append(direcciones[line[1]][1] + opcodes["CALL"])
                else:
                    lines_binary.append("0000000000000001" + opcodes[line[0] + "_" + line[1]])

            # Operaciones con direcciones o labels
            else:
                try:
                    lines_binary.append(direcciones[line[1]][0] + opcodes[line[0]])
                except KeyError:
                    if line[1][1:-1] not in direcciones:
                        number = check_type(line[1][1:-1])
                        dir = get_dir(number, direcciones)
                    else:
                        dir = direcciones[line[1][1:-1]][0]
                    lines_binary.append(dir + opcodes[line[0] + "_" + "DIR"])

        # Instrucciones con 3 operandos
        elif len(line) == 3:
            instruction = get_inst(line[0], line[1], line[2])

            # Operaciones con A, B o (B) en ambos operandos
            if (line[1] == "B" or line[1] == "A" or line[1] == "(B)") and (line[2] == "B" or line[2] == "A" or line[2] == "(B)"):
                lines_binary.append("0000000000000000" + opcodes[instruction])

            # Operaciones con A, Dir o B, Dir o Dir, A o Dir, B
            elif "A_DIR" in instruction or "B_DIR" in instruction:
                if line[2][1:-1] not in direcciones:
                    number = check_type(line[2][1:-1])
                    dir = get_dir(number, direcciones)
                else:
                    dir = direcciones[line[2][1:-1]][0]
                lines_binary.append(dir + opcodes[instruction])
            
            # Operaciones con Dir, A o Dir, B
            elif "DIR_A" in instruction or "DIR_B" in instruction:
                if line[1][1:-1] not in direcciones:
                    number = check_type(line[1][1:-1])
                    dir = get_dir(number, direcciones)
                else:
                    dir = direcciones[line[1][1:-1]][0]
                lines_binary.append(dir + opcodes[instruction])

            # Operaciones con A, LIT o B, LIT o (B), LIT
            elif "A_LIT" in instruction or "(B)_LIT" in instruction:
                try:
                    number = check_type(line[2])
                    lines_binary.append(number.zfill(16) + opcodes[instruction])
                except:
                    lines_binary.append(direcciones[line[2]][0] + opcodes[instruction])
            
            # Operaciones con B, LIT
            elif "B_LIT" in instruction: 
                try:
                    number = check_type(line[2])
                    lines_binary.append(number.zfill(16) + opcodes[instruction])
                except:
                    lines_binary.append(direcciones[line[2]][0] + opcodes[instruction])
    
    return lines_binary
