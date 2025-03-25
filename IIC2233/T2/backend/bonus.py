from PyQt5.QtCore import QObject
from random import randint, getrandbits
from parametros import TIEMPO_BOMBA, TIEMPO_CONGELAMIENTO

class BombaHielo(QObject):

    def __init__(self, tiempo_max:int):
        super().__init__()
        self.aparicion = bool(getrandbits(1)) #50% de probabilidad de aparecer
        self.tiempo = randint(
            1+TIEMPO_BOMBA+TIEMPO_CONGELAMIENTO,
            tiempo_max-3
            )
        self.x = randint(0, 690)
        self.y = randint(0, 420)
        self.en_pantalla = False