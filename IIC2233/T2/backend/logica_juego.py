from PyQt5.QtCore import QObject, pyqtSignal, QTimer, QMutex
from PyQt5 import QtMultimedia
from collections import Counter
from backend.entidades import Alien, AliensPantalla
from backend.bonus import BombaHielo
from parametros import VELOCIDAD_ALIEN, PONDERADORES, DURACION_NIVEL_INICIAL, \
    CHEAT_CODE_BALAS, CHEAT_CODE_NIVEL, RUTA_RISA_DOG, TIEMPO_TERMINATOR_DOG, \
    TIEMPO_BOMBA, TIEMPO_CONGELAMIENTO


class LogicaJuego(QObject):

    senal_cargar_datos_panel = pyqtSignal(dict)
    senal_enviar_aliens = pyqtSignal(dict)
    senal_bajar_seg = pyqtSignal()
    senal_mover_aliens = pyqtSignal(dict)
    senal_acierto_alien = pyqtSignal(dict)
    senal_explosion = pyqtSignal(tuple)
    senal_final_juego = pyqtSignal(dict)
    senal_ocultar_juego = pyqtSignal()
    senal_enviar_puntaje = pyqtSignal()
    senal_animacion = pyqtSignal(dict)
    senal_enviar_datos_ranking = pyqtSignal(tuple)
    senal_aparecer_bomba = pyqtSignal(tuple)

    def __init__(self):
        super().__init__()
        self.puntaje_total = 0
        self.nivel = 0
        self._balas = 0
        self.cheatcode_balas = False
        self.tiempo_total = DURACION_NIVEL_INICIAL
        self.velocidad_aliens = VELOCIDAD_ALIEN
        self.tiempo_nivel = 0
        self.ambiente = None
        self.jugador = None
        self.ponderador = None
        self.aliens_en_pantalla = AliensPantalla({1: 0, 2: 0})
        self.aliens_nivel = [] #[{pareja alien 1}, (pareja alien 2), ...]
        self.etapa_explosion = {1: 0, 2: 0, "bomba": 0}
        self.etapa_dog = 0
        self.risa_dog = QtMultimedia.QSound(RUTA_RISA_DOG)

    @property
    def balas(self):
        return self._balas

    @balas.setter
    def balas(self, valor):
        if valor <= 0:
            self._balas = 0
            self.finalizar(False)
        else:
            self._balas = valor
    
    def iniciar(self):
        self.enviar_aliens()
        self.timer_nivel.start()
        self.timer_revision_pantalla.start()
    
    def pausa(self, pausado:bool):
        if pausado:
            self.timer_revision_pantalla.stop()
            self.timer_nivel.stop()
            if self.timer_movimiento_alien_1.isActive():
                self.timer_movimiento_alien_1.stop()
            if self.timer_movimiento_alien_2.isActive():
                self.timer_movimiento_alien_2.stop()
        elif not pausado:
            self.timer_revision_pantalla.start()
            self.timer_nivel.start()
            if self.aliens_en_pantalla[1] == 1:
                self.timer_movimiento_alien_1.start()
            if self.aliens_en_pantalla[2] == 1:
                self.timer_movimiento_alien_2.start()

    
    def finalizar(self, resultado:bool):
        self.resultado = resultado
        aliens_destruidos = self.finalizar_timers()
        self.cheatcode_balas = False
        puntaje_nivel = self.calcular_puntaje(aliens_destruidos, self.tiempo_nivel)

        self.senal_final_juego.emit({
            "resultado": self.resultado,
            "jugador": self.jugador,
            "nivel": str(self.nivel),
            "balas": str(self.balas),
            "tiempo": str(self.tiempo_nivel),
            "puntaje total": str(self.puntaje_total),
            "puntaje nivel": str(puntaje_nivel)
        })
        
        if self.resultado:
            self.timer_animacion.start()
        else:
            self.ocultar()
    
    def calcular_puntaje(self, aliens_destruidos:int, tiempo_restante:int):
        puntaje_nivel = round((aliens_destruidos*100 + self.nivel* \
            (tiempo_restante*30 + self.balas*70))/self.ponderador)
        self.puntaje_total += puntaje_nivel
        return puntaje_nivel

    def finalizar_timers(self):
        self.timer_revision_pantalla.stop()
        self.timer_nivel.stop()
        aliens_destruidos = self.nivel*2
        if self.timer_movimiento_alien_1.isActive():
            self.timer_movimiento_alien_1.stop()
            aliens_destruidos -= 1
        if self.timer_movimiento_alien_2.isActive():
            self.timer_movimiento_alien_2.stop()
            aliens_destruidos -= 1

        return aliens_destruidos

    def animacion_final(self):
        self.etapa_dog += 1
        if self.etapa_dog == 1:
            self.timer_revision_pantalla.stop()
            self.risa_dog.play()
        if self.etapa_dog > 8:
            self.timer_animacion.stop()
            self.etapa_dog = 0
            self.ocultar()
        else:
            self.senal_animacion.emit({
                "resultado": self.resultado,
                "ambiente": self.ambiente,
                "movimiento": (5*(-1)**(self.etapa_dog))
                })

    def ocultar(self):
        self.senal_ocultar_juego.emit()
        self.datos_nuevo_nivel()

    def recibir_datos(self, datos:tuple):
        self.jugador, self.ambiente = datos
        self.ponderador = PONDERADORES[self.ambiente]
        self.datos_nuevo_nivel()

    def datos_nuevo_nivel(self):
        self.instanciar_timers_generales()
        self.timer_aliens()
        self.tiempo_total = round(self.tiempo_total * self.ponderador)
        self.tiempo_nivel = self.tiempo_total
        self.nivel += 1
        self.balas = self.nivel * 4
        self.bomba_hielo = BombaHielo(self.tiempo_nivel)

        datos = {
            "tiempo": self.tiempo_nivel,
            "nivel": str(self.nivel),
            "balas": str(self.balas),
            "puntaje": str(self.puntaje_total)
        }
        
        self.senal_cargar_datos_panel.emit(datos)
        self.aliens_nivel = []
        self.crear_aliens()

    def instanciar_timers_generales(self):
        self.timer_nivel = QTimer(self)
        self.timer_nivel.setInterval(1000)
        self.timer_nivel.timeout.connect(self.bajar_seg)

        self.mutex_aliens_en_pantalla = QMutex()
        self.timer_revision_pantalla = QTimer(self)
        self.timer_revision_pantalla.setInterval(10)
        self.timer_revision_pantalla.timeout.connect(self.revisar_pantalla)
        
        self.timer_animacion = QTimer(self)
        self.timer_animacion.setInterval(TIEMPO_TERMINATOR_DOG*1000/8)
        self.timer_animacion.timeout.connect(self.animacion_final)

        self.timer_bomba_hielo = QTimer(self)
        self.timer_bomba_hielo.setInterval(TIEMPO_BOMBA*1000)
        self.timer_bomba_hielo.setSingleShot(True)
        self.timer_bomba_hielo.timeout.connect(self.desaparecer_bomba_hielo)

        self.timer_explosion_bomba = QTimer(self)
        self.timer_explosion_bomba.setInterval(200)
        self.timer_explosion_bomba.timeout.connect(self.secuencia_explosion)

        self.timer_congelamiento = QTimer(self)
        self.timer_congelamiento.setInterval(TIEMPO_CONGELAMIENTO*1000)
        self.timer_congelamiento.setSingleShot(True)
        self.timer_congelamiento.timeout.connect(self.finalizar_congelamiento)

    def timer_aliens(self):
        self.timer_movimiento_alien_1 = QTimer(self)
        self.timer_movimiento_alien_2 = QTimer(self)
        self.timer_explosion_1 = QTimer(self)
        self.timer_explosion_2 = QTimer(self)
        timers = [self.timer_movimiento_alien_1, self.timer_movimiento_alien_2]
        explosion = [self.timer_explosion_1, self.timer_explosion_2]
        fx = [self.mover_alien_1, self.mover_alien_2]

        for i in range(2):
            timers[i].setInterval(100)
            timers[i].timeout.connect(fx[i])
            explosion[i].setInterval(200)
            explosion[i].timeout.connect(self.secuencia_explosion)

    def bajar_seg(self):
        if self.tiempo_nivel > 0:
            self.tiempo_nivel -= 1
            self.senal_bajar_seg.emit()
        else:
            self.finalizar(False)

        if self.bomba_hielo.aparicion and \
            self.bomba_hielo.tiempo == self.tiempo_nivel:
            self.bomba_hielo.en_pantalla = True
            self.senal_aparecer_bomba.emit((
                True, (self.bomba_hielo.x, self.bomba_hielo.y)
                ))
            self.timer_bomba_hielo.start()

    def enviar_aliens(self):
        self.aliens_en_pantalla[1] = 1
        self.aliens_en_pantalla[2] = 1
        self.senal_enviar_aliens.emit(self.aliens_nivel[0])
        self.timer_movimiento_alien_1.start()
        self.timer_movimiento_alien_2.start()
        
    def actualizar_aliens(self):
        if len(self.aliens_nivel) > 1:
            self.aliens_nivel.pop(0)
            self.enviar_aliens()
        else:
            self.finalizar(True)
    
    def mover_alien_1(self):
        self.aliens_nivel[0][1].moverse()
        self.senal_mover_aliens.emit(self.aliens_nivel[0])

    def mover_alien_2(self):
        self.aliens_nivel[0][2].moverse()
        self.senal_mover_aliens.emit(self.aliens_nivel[0])

    def crear_aliens(self):
        for _ in range(self.nivel):
            alien_1 = Alien(self.ambiente, self.velocidad_aliens)
            alien_2 = Alien(self.ambiente, self.velocidad_aliens)
            while not alien_1.coomparar_coordenadas(alien_2.x, alien_2.y):
                alien_2 = Alien(self.ambiente, self.velocidad_aliens)
            self.aliens_nivel.append({1:alien_1, 2:alien_2})
        self.velocidad_aliens = alien_1.velocidad
    
    def revisar_acierto_disparo(self, coordenadas:tuple):
        if not self.cheatcode_balas:
            self.balas -= 1
        acierto = {"alien": None, "ambiente": self.ambiente}
        x, y = coordenadas
        alien_1 = self.aliens_nivel[0][1]
        alien_2 = self.aliens_nivel[0][2]

        if self.ambiente == "Luna" or "Jupiter":
            if alien_1.x - 75 < x < alien_1.x + 15 and \
            alien_1.y - 40 < y < alien_1.y + 40:
                acierto["alien"] = 1

            if alien_2.x - 75 < x < alien_2.x + 15 and \
            alien_2.y - 40 < y < alien_2.y + 40:
                acierto["alien"] = 2

        elif self.ambiente == "Galaxia":
            if alien_1.x - 30 < x < alien_1.x + 30 and \
            alien_1.y - 45 < y < alien_1.y + 35:
                acierto["alien"] = 1

            if alien_2.x - 30 < x < alien_2.x + 30 and \
            alien_2.y - 45 < y < alien_2.y + 35:
                acierto["alien"] = 2

        self.senal_acierto_alien.emit(acierto)

        if self.bomba_hielo.aparicion and self.bomba_hielo.en_pantalla:
            if self.bomba_hielo.x - 70 < x  < self.bomba_hielo.x - 10 and \
                self.bomba_hielo.y -40 < y < self.bomba_hielo.y + 30:
                self.timer_bomba_hielo.stop()
                self.timer_explosion_bomba.start()

    def secuencia_explosion(self):
        if self.timer_explosion_1.isActive():
            if self.etapa_explosion[1] <= 3:
                self.etapa_explosion[1] += 1
                self.senal_explosion.emit((1, self.etapa_explosion[1]))
                
            elif self.etapa_explosion[1] == 4:
                self.timer_explosion_1.stop()
                self.etapa_explosion[1] = 0
                self.mutex_aliens_en_pantalla.lock()
                self.aliens_en_pantalla[1] -= 1
                self.mutex_aliens_en_pantalla.unlock()
        
        if self.timer_explosion_2.isActive():
            if self.etapa_explosion[2] <= 3:
                self.etapa_explosion[2] += 1
                self.senal_explosion.emit((2, self.etapa_explosion[2]))
            
            elif self.etapa_explosion[2] == 4:
                self.timer_explosion_2.stop()
                self.etapa_explosion[2] = 0
                self.mutex_aliens_en_pantalla.lock()
                self.aliens_en_pantalla[2] -= 1
                self.mutex_aliens_en_pantalla.unlock()

        if self.timer_explosion_bomba.isActive():
            if self.etapa_explosion["bomba"] <= 3:
                self.etapa_explosion["bomba"] += 1
                self.senal_explosion.emit(("bomba", self.etapa_explosion["bomba"]))
            
            elif self.etapa_explosion["bomba"] == 4:
                self.timer_explosion_bomba.stop()
                self.bomba_hielo.en_pantalla = False
                self.etapa_explosion["bomba"] = 0
                self.inicio_congelamiento()
                
    def revisar_pantalla(self):
        if self.aliens_en_pantalla[1] == 0 and \
            self.aliens_en_pantalla[2] == 0:
            self.actualizar_aliens()
            
    def stop_alien(self, alien):
        if alien == 1:
            self.timer_movimiento_alien_1.stop()
            self.timer_explosion_1.start()
            
        elif alien == 2:
            self.timer_movimiento_alien_2.stop()
            self.timer_explosion_2.start()

    def inicio_congelamiento(self):
        if self.timer_movimiento_alien_1.isActive():
            self.timer_movimiento_alien_1.stop()
        if self.timer_movimiento_alien_2.isActive():
            self.timer_movimiento_alien_2.stop()
        self.timer_congelamiento.start()
    
    def finalizar_congelamiento(self):
        if self.aliens_en_pantalla[1] == 1:
            self.timer_movimiento_alien_1.start()
        if self.aliens_en_pantalla[2] == 1:
            self.timer_movimiento_alien_2.start()

    def desaparecer_bomba_hielo(self):
        self.senal_aparecer_bomba.emit((False, None))
        self.bomba_hielo.en_pantalla = False

    def cheatcodes(self, datos:tuple):
        teclas, posicion = datos
        if Counter(teclas) == Counter(CHEAT_CODE_NIVEL):
            self.finalizar(True)
        if Counter(teclas) == Counter(CHEAT_CODE_BALAS):
            self.cheatcode_balas = True

    def enviar_datos_ranking(self):
        datos = (self.jugador, str(self.puntaje_total))
        self.senal_enviar_datos_ranking.emit(datos)

    def resetear(self):
        self.finalizar_timers()
        self.cheatcode_balas = False
        self.puntaje_total = 0
        self.nivel = 0
        self.tiempo_total = DURACION_NIVEL_INICIAL
        self.velocidad_aliens = VELOCIDAD_ALIEN
        self.aliens_en_pantalla = AliensPantalla({1: 0, 2: 0})
        self.aliens_nivel = []
        self.etapa_explosion = {1: 0, 2: 0, "bomba": 0}
        self.etapa_dog = 0