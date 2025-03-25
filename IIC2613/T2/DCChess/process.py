
FILE = "output.txt"

class Answer:
    
    def __init__(self):
        self.board = (0,0)
        self.bound = 0
        self.bishops = []
        self.knights = []
        self.pawns = []
        self.rooks = []
        self.goals = []
        self.pieceOn = []
        self.blocks = []
        self.piece = ""

    def write_file(self):
        with open(FILE, "w") as output:
            output.write(f"{self.board[0]},{self.board[1]}\n")
            output.write(f"{self.bound}\n")
            output.write(f"{self.piece[0]}\n")
            for bishop in self.bishops:
                # si hay bishop
                if bishop != None:
                    output.write(f"Bi,{bishop[0]},{bishop[1]}\n")
            for knight in self.knights:
                if knight != None:
                    output.write(f"Kn,{knight[0]},{knight[1]}\n")
            for pawn in self.pawns:
                if pawn != None:
                    output.write(f"Pa,{pawn[0]},{pawn[1]}\n")
            for rook in self.rooks:
                if rook != None:
                    output.write(f"Ro,{rook[0]},{rook[1]}\n")
            for block in self.blocks:
                if block != None:
                    output.write(f"Bl,{block[0]},{block[1]}\n")
            for piece in self.pieceOn:
                if piece != None:
                    output.write(f"Pi,{piece[0]},{piece[1]},{piece[2]}\n")
            for goal in self.goals:
                if goal != None:
                    output.write(f"Go,{goal[0]},{goal[1]}\n")
                
def get_number(text):
    init = text.find("(") + 1
    end = text.find(")")
    return int(text[init:end])

def get_numbers(text):
    if text[0:6] != "piece(":
        init = text.find("(") + 1
        end = text.find(")")
        text_list = text[init:end].split(",")
        return tuple(list(map(int, text_list)))

def get_piece(text):
    init = text.find("k")
    end = text.find(")")
    return text[init:end]

from gettext import find
import sys

answer = Answer()
lines = sys.stdin.readlines()
# 
if 'OPTIMUM FOUND\n' in lines:
    sol_init_index = lines.index('OPTIMUM FOUND\n') - 2
else:
    sol_init_index = 4
atoms = lines[sol_init_index].split(" ")

answer = Answer()

answer.board = max(list(map(lambda x: get_numbers(x), list(filter(lambda x: "square" in x, atoms)))))
answer.bound = max(map(lambda x: get_number(x), list(filter(lambda x: "done" in x, atoms))))
answer.goals = list(map(lambda x: get_numbers(x), list(filter(lambda x: "goal" in x, atoms))))
answer.bishops = list(map(lambda x: get_numbers(x), list(filter(lambda x: "bishop" in x, atoms))))
answer.knights = list(map(lambda x: get_numbers(x), list(filter(lambda x: "knight" in x, atoms))))
answer.pawns = list(map(lambda x: get_numbers(x), list(filter(lambda x: "pawn" in x, atoms))))
answer.rooks = list(map(lambda x: get_numbers(x), list(filter(lambda x: "rook" in x, atoms))))
answer.pieceOn = list(map(lambda x: get_numbers(x), list(filter(lambda x: "pieceOn" in x, atoms))))
answer.piece = list(map(lambda x: get_piece(x), list(filter(lambda x: "piece" in x, atoms))))
answer.blocks = list(map(lambda x: get_numbers(x), list(filter(lambda x: "blocked" in x, atoms))))

answer.write_file()