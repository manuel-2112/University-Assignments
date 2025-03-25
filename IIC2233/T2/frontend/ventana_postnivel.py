from sys import exit
from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal

from parametros import RUTA_VENTANA_POST_NIVEL

window_name, base_class = loadUiType(RUTA_VENTANA_POST_NIVEL)

class VentanaResumen(window_name, base_class):
    
    senal_siguiente_nivel = pyqtSignal()
    senal_volver_inicio = pyqtSignal()
    senal_enviar_datos_ranking = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.boton_salir.clicked.connect(self.salir)
        self.boton_siguiente_nivel.clicked.connect(self.siguiente_nivel)
        self.boton_volver_inicio.clicked.connect(self.volver_inicio)
    
    def cargar_estado(self, datos:dict):
        self.mensaje_derrota.show()
        self.mensaje_victoria.show()
        if datos["resultado"]:
            self.mensaje_derrota.hide()
            self.boton_siguiente_nivel.show()
        elif not datos["resultado"]:
            self.mensaje_victoria.hide()
            self.boton_siguiente_nivel.hide()
        
        self.jugador.setText(datos["jugador"])
        self.nivel_actual.setText(datos["nivel"])
        self.balas_restantes.setText(datos["balas"])
        self.tiempo_restante.setText(datos["tiempo"])
        self.puntaje_total.setText(datos["puntaje total"])
        self.puntaje_nivel.setText(datos["puntaje nivel"])
    
    def siguiente_nivel(self):
        self.ocultar()
        self.senal_siguiente_nivel.emit()

    def volver_inicio(self):
        self.ocultar()
        self.senal_enviar_datos_ranking.emit()
        self.senal_volver_inicio.emit()

    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.show()
    
    def salir(self):
        self.ocultar()
        self.senal_enviar_datos_ranking.emit()
        exit()
