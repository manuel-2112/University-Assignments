from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal, Qt
from PyQt5.QtWidgets import QMessageBox
from get_info import data_json
from os.path import join

window_name, base_class = loadUiType(join(*data_json("RUTA_VENTANA_INICIO")))

class VentanaInicio(window_name, base_class):

    senal_enviar_login = pyqtSignal(dict)

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.boton_jugar.clicked.connect(self.enviar_login)
    
    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Return:
            self.enviar_login()
    
    def enviar_login(self):
        nombre_usuario = self.nombre.text()
        diccionario = {
            "CMD": "validar_nombre",
            "nombre usuario": nombre_usuario
        }
        self.senal_enviar_login.emit(diccionario)

    def mostrar_error(self):
        pop_up = QMessageBox()
        pop_up.setWindowTitle("Ocurrio un error")
        pop_up.setText("Los datos ingresados son inválidos")
        pop_up.setIcon(QMessageBox.Information)
        pop_up.setStandardButtons(QMessageBox.Ok)
        pop_up.setDetailedText("Recuerde el nombre debe ser alfanumérico y no puede repetirse")
        pop_up.exec_()

    
    #def jugar(self):
    #    self.ocultar()
    #    self.senal_jugar.emit()

    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.show()
