from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal
from PyQt5.QtGui import QPixmap

from parametros import RUTA_VENTANA_JUEGO, RUTA_AMBIENTES, RUTA_PISTOLA, \
    RUTA_ALIENS, RUTA_EXPLOSION, RUTA_DOG, RUTA_BOMBA_HIELO

window_name, base_class = loadUiType(RUTA_VENTANA_JUEGO)

class VentanaJuego(window_name, base_class):

    senal_tecla = pyqtSignal(tuple)
    senal_disparo_hecho = pyqtSignal()
    senal_dejar_mover = pyqtSignal(int)
    senal_pausado = pyqtSignal(bool)
    senal_volver_inicio = pyqtSignal()
    senal_enviar_datos_ranking = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.pausado = False
        self.mensaje_superado.hide()
        self.simbolo_pausa.hide()
        self.bomba_hielo.hide()
        self.boton_pausa.setShortcut('P')
        self.boton_pausa.clicked.connect(self.pausa)
        self.boton_salir.clicked.connect(self.salir)
        self.firstrelease = True
        self.keylist = []

    def cargar_ambiente(self, tupla_datos: tuple):
        nombre, ambiente = tupla_datos
        
        pixeles = QPixmap(RUTA_AMBIENTES[ambiente])
        self.ambiente.setPixmap(pixeles)
        self.ambiente.setMinimumSize(775, 500)
        self.ambiente.setMaximumSize(775, 500)
        self.ambiente.setScaledContents(True)

        pixeles = QPixmap(RUTA_PISTOLA["Negro"])
        self.pistola.setPixmap(pixeles)
        self.pistola.setMinimumSize(150, 100)
        self.pistola.setMaximumSize(150, 100)
        self.pistola.setScaledContents(True)

    def aparecer_aliens(self, aliens:dict):
        pixeles = QPixmap(RUTA_ALIENS[aliens[1].ambiente][0])
        n = 1
        for label in [self.label_alien_1, self.label_alien_2]:
            label.setPixmap(pixeles)
            label.setMinimumSize(aliens[1].ancho, aliens[1].alto)
            label.setMaximumSize(aliens[1].ancho, aliens[1].alto)
            label.setScaledContents(True)
            label.setStyleSheet("background-color: rgba(255, 255, 255, 0);")
            label.move(aliens[n].x, aliens[n].y)
            label.show()
            n +=1

    def matar_alien(self, acierto:dict):
        pixeles = QPixmap(RUTA_ALIENS[acierto["ambiente"]][1])
        if acierto["alien"] == 1:
            self.label_alien_1.setPixmap(pixeles)
            self.senal_dejar_mover.emit(1)
        if acierto["alien"] == 2:
            self.label_alien_2.setPixmap(pixeles)
            self.senal_dejar_mover.emit(2)
        
    def secuencia_explosion(self, datos:tuple):
        objeto, etapa = datos
        if etapa <= 3:
            pixeles = QPixmap(RUTA_EXPLOSION[etapa])
        if objeto == 1:
            if etapa <=3:
                self.label_alien_1.setPixmap(pixeles)
            else:
                self.label_alien_1.hide()
        elif objeto == 2:
            if etapa <= 3:
                self.label_alien_2.setPixmap(pixeles)
            else:
                self.label_alien_2.hide()
        elif objeto == "bomba":
            if etapa <= 3:
                self.bomba_hielo.setPixmap(pixeles)
            else:
                self.bomba_hielo.hide()
                pixeles = QPixmap(RUTA_BOMBA_HIELO)
                self.bomba_hielo.setPixmap(pixeles)

    def secuencia_dog(self, datos:dict):
        self.label_alien_1.hide()
        self.label_alien_2.hide()
        self.pistola.hide()
        pixeles = QPixmap(RUTA_DOG[datos["ambiente"]])
        x = self.dog.x()
        y = self.dog.y() + datos["movimiento"]
        if datos["resultado"]:
            self.mensaje_superado.show()
            self.dog.setPixmap(pixeles)
            self.dog.move(x, y)
            self.dog.show()

    def mover_aliens(self, aliens:dict):
        self.label_alien_1.move(aliens[1].x, aliens[1].y)
        self.label_alien_2.move(aliens[2].x, aliens[2].y)

    def cargar_panel_datos(self, datos:dict):
        self.tiempo.display(datos["tiempo"])
        self.nivel.setText(datos["nivel"])
        self.balas.setText(datos["balas"])
        self.puntaje.setText(datos["puntaje"])

        pixeles = QPixmap(RUTA_DOG["Riendose"])
        self.dog.setPixmap(pixeles)
        self.mensaje_superado.hide()
        self.pistola.show()

    def actualizar_tiempo(self):
        self.tiempo.display(self.tiempo.value() - 1)

    def cambiar_posicion_pistola(self, posicion:tuple):
        x, y = posicion
        self.pistola.move(x, y)
    
    def disparo(self, datos:tuple):
        estado, cheatcode = datos
        if estado == "Cheat":
            self.balas.setText("∞")
        elif estado == "Inicio":
            pixeles = QPixmap(RUTA_PISTOLA["Rojo"])
            self.pistola.setPixmap(pixeles)
            if not cheatcode:
                if int(self.balas.text())-1 < 0:
                    self.balas.setText("0")
                else:
                    self.balas.setText(str(int(self.balas.text())-1))
        else:
            pixeles = QPixmap(RUTA_PISTOLA["Negro"])
            self.pistola.setPixmap(pixeles)

    def aparicion_bomba_hielo(self, datos:tuple):
        inicio, posicion = datos
        if inicio:
            x, y = posicion
            self.bomba_hielo.move(x, y)
            self.bomba_hielo.show()
        else:
            self.bomba_hielo.hide()

    def pausa(self):
        if self.pausado:
            self.simbolo_pausa.hide()
            self.pausado = False
        elif not self.pausado:
            self.simbolo_pausa.show()
            self.pausado = True
        self.senal_pausado.emit(self.pausado)

    def keyPressEvent(self, event):
        self.firstrelease = True
        self.keylist.append(event.key())

    def keyReleaseEvent(self, event):
        if self.firstrelease and not self.pausado:
            self.senal_tecla.emit((self.keylist, (self.pistola.x(), self.pistola.y())))

        self.firstrelease = False        
        try:
            del self.keylist[-1]
        except IndexError:
            pass

    def ocultar(self):
        self.hide()
    
    def mostrar(self):
        self.keylist = []
        self.show()

    def salir(self):
        self.ocultar()
        self.senal_enviar_datos_ranking.emit()
        self.senal_volver_inicio.emit()