from PyQt5.QtCore import QObject, pyqtSignal, QTimer
from PyQt5 import QtMultimedia
from random import randint
from collections import MutableMapping, Counter
from parametros import VELOCIDAD_PISTOLA, TECLA_ARRIBA, TECLA_ABAJO, TECLA_DERECHA, \
    TECLA_DISPARO, TECLA_IZQUIERDA, PONDERADORES, CHEAT_CODE_BALAS, RUTA_SONIDO_DISPARO

class Alien(QObject):
    def __init__(self, ambiente, velocidad):
        super().__init__()
        self.ambiente = ambiente
        self.calcular_velocidad(ambiente, velocidad)
        self.ancho_alto(ambiente)
        self._x = 0
        self._y = 0
        self.calcular_coordenadas()
    
    @property
    def x(self):
        return self._x
    
    @x.setter
    def x(self, valor):
        if valor <= -65 + round(self.ancho/2)+1:
            self._x = (-65 + round(self.ancho/2)+1)
            self.cambiar_direccion('x')
        elif valor >= 692 - round(self.ancho/2)+1:
            self._x = (692 - round(self.ancho/2)+1)
            self.cambiar_direccion('x')
        else:
            self._x = valor

    @property
    def y(self):
        return self._y
    
    @y.setter
    def y(self, valor):
        if valor <= -40 + round(self.alto/2)+1:
            self._y = (-40 + round(self.alto/2)+1)
            self.cambiar_direccion('y')
        elif valor >= 440 - round(self.alto/2)+1:
            self._y = (440 - round(self.alto/2)+1)
            self.cambiar_direccion('y')
        else:
            self._y = valor

    def moverse(self):
        self.x += self.velocidad[0]
        self.y += self.velocidad[1]

    def calcular_velocidad(self, ambiente, velocidad_actual):
        ponderador = PONDERADORES[ambiente]
        self.velocidad = [velocidad_actual[0]/ponderador, velocidad_actual[1]/ponderador]
    
    def ancho_alto(self, ambiente):
        if ambiente == "Luna" or "Jupiter":
            self.ancho = 90
            self.alto = 98
        elif ambiente == "Galaxia":
            self.ancho = 150
            self.alto = 90

    def cambiar_direccion(self, eje):
        if eje == 'x':
            self.velocidad[0] = -self.velocidad[0]
        elif eje == 'y':
            self.velocidad[1] = -self.velocidad[1]

    def calcular_coordenadas(self):
        self.x = randint(-65 + round(self.ancho/2)+1, 692 - round(self.ancho/2)+1)
        self.y = randint(-40 + round(self.alto/2)+1, 440 - round(self.alto/2)+1)
    
    def coomparar_coordenadas(self, x, y):
        if abs(x-self.x) < 200 or abs(y-self.y) < 150:
            return False
        return True


class AliensPantalla(dict, MutableMapping):
    def __getitem__(self, key):
        return dict.__getitem__(self, key)
        
    def __setitem__(self, key, value):
        value = int(value)
        try:
            if 0 <= value <= 1:
                dict.__setitem__(self, key, value)
            else:
                raise ValueError
        except ValueError as error:
            pass

class Pistola(QObject):

    senal_disparo = pyqtSignal(tuple)
    senal_moverse = pyqtSignal(tuple)
    senal_enviar_coordenadas = pyqtSignal(tuple)

    def __init__(self):
        super().__init__()
        self._x = 0
        self._y = 0
        self.velocidad = VELOCIDAD_PISTOLA
        self.cheatcode = False
        self.sonido = QtMultimedia.QSound(RUTA_SONIDO_DISPARO)
        self.instanciar_timer()

    @property
    def x(self):
        return self._x
    
    @x.setter
    def x(self, valor):
        if valor <= -65:
            self._x = -65
        elif valor >= 692:
            self._x = 692
        else:
            self._x = valor

    @property
    def y(self):
        return self._y
    
    @y.setter
    def y(self, valor):
        if valor <= -40:
            self._y = -40
        elif valor >= 440:
            self._y = 440
        else:
            self._y = valor

    def instanciar_timer(self):
        self.timer_disparo = QTimer()
        self.timer_disparo.setSingleShot(True)
        self.timer_disparo.setInterval(1000)
        self.timer_disparo.timeout.connect(self.fin_disparo)

    def mover(self, datos:tuple):
        teclas, posicion = datos
        self.x, self.y = posicion
        
        if teclas == [TECLA_ARRIBA]:
            self.y -= self.velocidad
        elif teclas == [TECLA_ABAJO]:
            self.y += self.velocidad
        elif teclas == [TECLA_DERECHA]:
            self.x += self.velocidad
        elif teclas == [TECLA_IZQUIERDA]:
            self.x -= self.velocidad
        elif TECLA_ARRIBA in teclas and TECLA_IZQUIERDA in teclas:
            self.x -= self.velocidad
            self.y -= self.velocidad
        elif TECLA_ARRIBA in teclas and TECLA_DERECHA in teclas:
            self.x += self.velocidad
            self.y -= self.velocidad
        elif TECLA_ABAJO in teclas and TECLA_IZQUIERDA in teclas:
            self.x -= self.velocidad
            self.y += self.velocidad
        elif TECLA_ABAJO in teclas and TECLA_DERECHA in teclas:
            self.x += self.velocidad
            self.y += self.velocidad                       

        if TECLA_DISPARO in teclas:
            self.disparo()
        if Counter(teclas) == Counter(CHEAT_CODE_BALAS):
            self.cheatcode = True
            self.senal_disparo.emit(("Cheat", self.cheatcode))
        else:
            self.senal_moverse.emit((self.x, self.y))

    def disparo(self):
        self.sonido.play()
        self.senal_disparo.emit(("Inicio", self.cheatcode))
        self.senal_enviar_coordenadas.emit((self.x, self.y))
        self.timer_disparo.start()
    
    def fin_disparo(self):
        self.senal_disparo.emit(("Final", self.cheatcode))
    
    def reset(self):
        self.x = 312
        self.y = 100
        self.cheatcode = False
        self.senal_moverse.emit((self.x, self.y))