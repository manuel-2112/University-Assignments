from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal
from get_info import data_json
from os.path import join

window_name, base_class = loadUiType(join(*data_json("RUTA_VENTANA_ESPERA")))

class VentanaEspera(window_name, base_class):

    def __init__(self):
        super().__init__()
        self.setupUi(self)

    def preparar_ventana(self):
        pass

    def actualizar_ventana(self):
        pass

    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.show()
