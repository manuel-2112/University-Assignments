from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal

from parametros import RUTA_VENTANA_INICIO

window_name, base_class = loadUiType(RUTA_VENTANA_INICIO)

class VentanaInicio(window_name, base_class):
    
    senal_jugar = pyqtSignal()
    senal_ver_ranking = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.boton_jugar.clicked.connect(self.jugar)
        self.boton_rankings.clicked.connect(self.rankings)

    def jugar(self):
        self.ocultar()
        self.senal_jugar.emit()

    def rankings(self):
        self.ocultar()
        self.senal_ver_ranking.emit()

    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.show()
