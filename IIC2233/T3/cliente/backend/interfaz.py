from PyQt5.QtCore import pyqtSignal, QObject

from frontend.ventana_inicio import VentanaInicio
from frontend.ventana_espera import VentanaEspera
from frontend.ventana_juego import VentanaJuego


class Interfaz(QObject):

    senal_preparar_ventana_espera = pyqtSignal(str, str)
    senal_abrir_ventana_espera = pyqtSignal()
    senal_login_rechazado = pyqtSignal()
    
    def __init__(self, parent):
        super().__init__()
        self.ventana_inicio = VentanaInicio()
        self.ventana_espera = VentanaEspera()
        self.ventana_juego = VentanaJuego()

        # Senales
        self.ventana_inicio.senal_enviar_login.connect(
            parent.enviar
            )
        self.senal_preparar_ventana_espera.connect(
            self.ventana_espera.preparar_ventana
            )
        self.senal_abrir_ventana_espera.connect(
            self.abrir_ventana_espera
            )
        self.senal_login_rechazado.connect(
            self.ventana_inicio.mostrar_error
            )

    def iniciar(self):
        self.ventana_inicio.mostrar()
    
    def abrir_ventana_espera(self):
        self.ventana_inicio.ocultar()
        self.ventana_espera.mostrar()

    def manejar_mensaje(self, mensaje):
        try:
            comando = mensaje["CMD"]
        except KeyError:
            return {}

        if comando == "respuesta_validacion_nombre":
            if mensaje["estado"]:
                nombre_usuario = mensaje["jugador"].nombre
                usuarios = mensaje["usuarios"].split(",")
                #self.senal_preparar_ventana_espera.emit(nombre_usuario, usuarios)
                self.senal_abrir_ventana_espera.emit()
            else:
                self.senal_login_rechazado.emit()