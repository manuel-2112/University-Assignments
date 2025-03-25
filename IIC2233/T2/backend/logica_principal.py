from PyQt5.QtCore import QObject, pyqtSignal

class LogicaPrincipal(QObject):

    senal_respuesta_validacion = pyqtSignal(bool, list)
    senal_cargar_juego = pyqtSignal(tuple)

    def __init__(self):
        super().__init__()

    def verificar_datos(self, tupla_datos):
        nombre, ambiente = tupla_datos
        booleano = True
        errores = []

        if not nombre.isalnum():
            booleano = False
            errores.append('El nombre ingresado no es alfanumerico')
        if len(nombre) <= 0:
            booleano = False
            errores.append('El nombre debe contener minimo 1 caracter')

        if booleano:
            self.senal_cargar_juego.emit(tupla_datos)
        
        self.senal_respuesta_validacion.emit(booleano, errores)
