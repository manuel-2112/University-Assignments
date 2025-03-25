from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal
from PyQt5.QtWidgets import QMessageBox

from parametros import RUTA_VENTANA_PRINCIPAL

window_name, base_class = loadUiType(RUTA_VENTANA_PRINCIPAL)

class VentanaPrincipal(window_name, base_class):
    
    senal_enviar_datos = pyqtSignal(tuple) #(nombre, ambiente)
    senal_iniciar_juego = pyqtSignal()


    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.boton_cazar.clicked.connect(self.enviar_datos)
        
    
    def cazar(self):
        self.ocultar()
        self.senal_iniciar_juego.emit()

    def enviar_datos(self):
        # Este metodo envia los datos a la logica
        # Logica envia resultado a metodo cazar
        nombre = self.nombre_astronauta.text()
        ambiente = self.ambiente()
        self.senal_enviar_datos.emit((nombre, ambiente))
        

    def ambiente(self):
        # Este metodo indicara que ambiente se selecciono
        if self.boton_lunar.isChecked():
            return "Luna"
        elif self.boton_jupiter.isChecked():
            return "Jupiter"
        elif self.boton_intergalactico.isChecked():
            return "Galaxia"

    def pop_up_error(self, booleano: bool, errores: list):
        # Este metodo mostrara el pop-up de error si lo hay
        # Si no ejecutara el inicio del juego
        if not booleano:
            pop_up = QMessageBox()
            pop_up.setWindowTitle("Ocurrio un error")
            pop_up.setText("Hay errores en el nombre del astronauta")
            pop_up.setIcon(QMessageBox.Information)
            pop_up.setStandardButtons(QMessageBox.Ok)
            pop_up.setDetailedText("\n".join(errores))
            pop_up.exec_()
            
        elif booleano:
            self.cazar()
    
    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.show()


