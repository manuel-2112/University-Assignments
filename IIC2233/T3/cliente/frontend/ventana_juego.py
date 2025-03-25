from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal
from PyQt5.QtGui import QPixmap
from get_info import data_json
from os.path import join

window_name, base_class = loadUiType(join(*data_json("RUTA_VENTANA_JUEGO")))

class VentanaJuego(window_name, base_class):

    def __init__(self):
        super().__init__()
        self.setupUi(self)

    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.show()
