from Basys import write_to_rom, translate_lines
from opcodes import OPCODES
import parameters as p
import sys

class AssemblyInstructionGroup:
    def __init__(self, element_list):
        self.instruction = None
        self.first_operand = None
        self.second_operand = None

        self.load_instruction(element_list)
    
    def __str__(self) -> str:
        output = self.instruction
        output += f" {self.first_operand}" if self.first_operand is not None else p.EMPTY_STRING_SYMBOL
        output += f", {self.second_operand}" if self.second_operand is not None else p.EMPTY_STRING_SYMBOL
        return output
    
    def __len__(self):
        output = 1
        if self.first_operand > 1:
            output = 2
        if self.second_operand > 2:
            output = 3
        return output

    
    def load_instruction(self, element_list):
        self.instruction = element_list[0]
        self.first_operand = element_list[1] if len(element_list) > 1 else None
        self.second_operand = element_list[2] if len(element_list) > 2 else None

class AssemblyReader:
    
    def __init__(self):
        self.data_list = []
        self.code_list = []
        self.data = []
        self.code = []
    
    def __str__(self) -> str:
        output = "Variables:\n"
        for line in self.data:
            output += str(line) + "\n"
        output += "Instrucciones:\n"
        for line in self.code:
            output += str(line) + "\n"
        return output
    
    def start(self, path:str):
        file_lines = self.read_file(path)
        self.read_code(file_lines)

    def read_file(self, path:str):
        with open(path, "r") as file:
            return file.readlines()
        
    def read_code(self, file_lines):
        data = False
        code = False
        for line in file_lines:
            cleaned_line = self.clean_line(line)
            if cleaned_line is None:
                continue

            if data:
                self.process_data_section(cleaned_line)
            elif code:
                self.process_code_section(cleaned_line)

            if p.DATA_SECTION_SYMBOL in cleaned_line:
                data = True
            if p.CODE_SECTION_SYMBOL in cleaned_line:
                data, code = False, True
        
        self.data = [AssemblyInstructionGroup(element_list) for element_list in self.data_list]
        self.code = [AssemblyInstructionGroup(element_list) for element_list in self.code_list]

    def process_data_section(self, line):
        if len(line) == 1:
            if line[0] == p.CODE_SECTION_SYMBOL:
                pass
            else:
                self.data_list[len(self.data_list) - 1].append(line[0])
        else:
            self.process_non_empty_data_line(line)

    def process_code_section(self, line):
        if len(line) > 1 and p.DOUBLE_DOT_SYMBOL in line[0]:
            self.code_list.append([line[0]])
            self.code_list.append(line[1:])
            return
        self.process_non_empty_code_line(line)

    def process_non_empty_data_line(self, line):
        self.change_to_ascii(line)
        if len(line) > 2:
            line.append('0')
        self.data_list.append(line)

    def process_non_empty_code_line(self, line):
        self.change_to_ascii(line)
        self.code_list.append(line)

    def change_to_ascii(self, new_line):
        for elem in new_line:
            if elem[0] == p.SINGLE_QUOTATION_MARK_SYMBOL and elem[-1] == p.SINGLE_QUOTATION_MARK_SYMBOL:
                new_line[new_line.index(elem)] = str(ord(elem[1:-1]))
        return new_line
        
    def delete_comments_in_line(self, line):
        if p.COMMENT_LINE_SYMBOL in line:
            position = line.index(p.COMMENT_LINE_SYMBOL)
            line = line[:position]
        line = line.strip()
        line = p.SPACE_SYMBOL.join(line.split())
        return line
    
    def clean_line(self, line):
        line_with_no_comments = self.delete_comments_in_line(line)
        new_line = p.EMPTY_STRING_SYMBOL
        inside_parentheses = False
        inside_string = False
        for character in line_with_no_comments:
            new_line += self.process_character(character, inside_parentheses, inside_string)
            
            if character in p.PARENTHESIS_SYMBOLS and not inside_string:
                inside_parentheses = not inside_parentheses
            
            if character == p.DOUBLE_QUOTATION_MARK_SYMBOL:
                inside_string = not inside_string
                current_line = current_line[:-1]
        
        new_line = self.process_final_line(new_line)
        new_line = new_line.split(p.SPACE_SYMBOL)
        new_line = list(map(lambda x: x.replace(p.AT_SYMBOL, p.QUOTED_SPACE_SYMBOL), new_line))
        if new_line == [p.EMPTY_STRING_SYMBOL]:
            return None
        return new_line

    def process_character(self, character, inside_parentheses, inside_string):
        if inside_parentheses and character != p.SPACE_SYMBOL:
            return character
        elif inside_string:
            return self.process_inside_string(character)
        elif not inside_parentheses:
            return character
        else:
            return p.EMPTY_STRING_SYMBOL

    def process_inside_string(self, character):
        if character == p.SPACE_SYMBOL:
            return p.AT_SYMBOL + p.SPACE_SYMBOL
        elif character == p.DOUBLE_QUOTATION_MARK_SYMBOL:
            return p.EMPTY_STRING_SYMBOL
        else:
            return p.SINGLE_QUOTATION_MARK_SYMBOL + character + p.SINGLE_QUOTATION_MARK_SYMBOL + p.SPACE_SYMBOL

    def process_final_line(self, line):
        line = line.replace(p.COMMA_SYMBOL, p.SPACE_SYMBOL)
        line = p.SPACE_SYMBOL.join(line.split())
        return line



def read_file_name():
    args = sys.argv
    if len(args) == 2:
        archivo = args[1]
        return archivo
    else:
        print("Ningun nombre de archivo fue especificado. Se usará el archivo de prueba 1.")
        return p.TESTS[1]

if __name__ == "__main__":
    assembler = AssemblyReader()
    archivo = read_file_name()
    print(f"\nEnsamblando archivo: {archivo}...")
    assembler.start(path=archivo)
    lineas_binario = translate_lines(OPCODES, assembler.data_list, assembler.code_list)
    #print(lineas_binario)
    try:
        write_to_rom(lineas_binario)
    except Exception as e:
        print("Error al escribir en la ROM.")
        print(e)