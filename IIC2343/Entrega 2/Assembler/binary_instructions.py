class BinaryInstructions(list):
    def __init__(self, *args):
        super().__init__(*args)
    
    def __str__(self):
        elements = [f'"{elem}"' for elem in self]
        return ',\n'.join(elements)
