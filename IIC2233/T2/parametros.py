from os.path import join
from PyQt5.QtCore import Qt
from random import uniform

#Rutas Ventanas
RUTA_VENTANA_INICIO = join("frontend", "UI files", "VentanaInicio.ui")
RUTA_VENTANA_PRINCIPAL = join("frontend", "UI files", "VentanaPrincipal.ui")
RUTA_VENTANA_RANKING = join("frontend", "UI files", "VentanaRankings.ui")
RUTA_VENTANA_JUEGO = join("frontend", "UI files", "VentanaJuego.ui")
RUTA_VENTANA_POST_NIVEL = join("frontend", "UI files", "VentanaResumen.ui")

# Teclas
TECLA_ARRIBA = Qt.Key_W
TECLA_IZQUIERDA = Qt.Key_A
TECLA_ABAJO = Qt.Key_S
TECLA_DERECHA = Qt.Key_D
TECLA_DISPARO = Qt.Key_K
# Secuencia teclas cheatcodes
CHEAT_CODE_BALAS = [Qt.Key_O, Qt.Key_V, Qt.Key_N, Qt.Key_I]
CHEAT_CODE_NIVEL = [Qt.Key_C, Qt.Key_I, Qt.Key_A]

#Ranking
RUTA_PUNTAJES = join("puntajes.txt")

#Ambientes
RUTA_AMBIENTES = {
    "Luna": join("frontend", "Sprites", "Fondos", "Luna.png"),
    "Jupiter": join("frontend", "Sprites", "Fondos", "Jupiter.png"),
    "Galaxia": join("frontend", "Sprites", "Fondos", "Galaxia.png")
}

PONDERADORES = {
    "Luna": uniform(0.9, 1),
    "Jupiter": uniform(0.8, 0.9),
    "Galaxia": uniform(0.7, 0.8)
}

#Pistola
RUTA_SONIDO_DISPARO = join("frontend","Sonidos", "disparo.wav")
VELOCIDAD_PISTOLA = 15
RUTA_PISTOLA = {
    "Negro": join("frontend", "Sprites", "Elementos juego", "Disparador_negro.png"),
    "Rojo": join("frontend", "Sprites", "Elementos juego", "Disparador_rojo.png")
}
RUTA_EXPLOSION = {
    1: join("frontend", "Sprites", "Elementos juego", "Disparo_f1.png"),
    2: join("frontend", "Sprites", "Elementos juego", "Disparo_f2.png"),
    3: join("frontend", "Sprites", "Elementos juego", "Disparo_f3.png"),
}

#Terminator-Dog
TIEMPO_TERMINATOR_DOG = 2 #seg
RUTA_RISA_DOG = join("frontend", "Sonidos", "risa_robotica.wav")
RUTA_DOG = {
    "Riendose": join("frontend", "Sprites", "Terminator-Dog", "Dog1"),
    "Luna": join("frontend", "Sprites", "Terminator-Dog", "Perro_y_alien1"),
    "Jupiter": join("frontend", "Sprites", "Terminator-Dog", "Perro_y_alien2"),
    "Galaxia": join("frontend", "Sprites", "Terminator-Dog", "Perro_y_alien3")
}

#Aliens
VELOCIDAD_ALIEN = (10, 10)
RUTA_ALIENS = {
    "Luna": (join("frontend", "Sprites", "Aliens", "Alien1.png"),
        join("frontend", "Sprites", "Aliens", "Alien1_dead.png")),
    "Jupiter": (join("frontend", "Sprites", "Aliens", "Alien2.png"),
        join("frontend", "Sprites", "Aliens", "Alien2_dead.png")),
    "Galaxia": (join("frontend", "Sprites", "Aliens", "Alien3.png"),
        join("frontend", "Sprites", "Aliens", "Alien3_dead.png"))
}

#Datos sobre nivel
DURACION_NIVEL_INICIAL = 60 #seg

#Bonus
RUTA_BOMBA_HIELO = join("frontend", "Sprites", "Bonus", "Bomba_hielo.png")
TIEMPO_BOMBA = 5 #seg
TIEMPO_CONGELAMIENTO = 5 #seg