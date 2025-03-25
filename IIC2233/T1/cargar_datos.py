from entidades import Juego
from bebestibles import Jugo, Gaseosa, BrebajeMagico
from jugadores import Ludopata, Tacano, Bebedor, Casual
from parametros import RUTA_JUEGOS, RUTA_BEBESTIBLES, RUTA_JUGADORES


class Datos:

    def __init__(self) -> None:
        self.cargar_juegos(RUTA_JUEGOS)
        self.cargar_jugadores(RUTA_JUGADORES)
        self.cargar_bebestibles(RUTA_BEBESTIBLES)

    def cargar_juegos(self, ruta):
        juegos = []
        with open(ruta, "r", encoding="UTF-8") as archivo:
            for linea in archivo.readlines()[1:]:
                linea = linea.strip().split(",")
                #nombre,esperanza,apuesta minima,apuesta maxima
                juegos.append(Juego(
                    nombre= linea[0],
                    esperanza= linea[1],
                    apuesta_minima= linea[2],
                    apuesta_maxima= linea[3]
                ))
            
        self.juegos = juegos

    def cargar_jugadores(self, ruta):
        jugadores = []
        with open(ruta, "r", encoding="UTF-8") as archivo:
            for linea in archivo.readlines()[1:]:
                linea = linea.strip().split(",")
                # nombre,personalidad,energia,suerte,dinero,frustracion,
                # ego,carisma,confianza, juego favorito                
                personalidad = {
                    'Ludopata' : Ludopata,
                    'Bebedor' : Bebedor,
                    'Tacano' : Tacano,
                    'Casual' : Casual
                }
                
                jugadores.append(personalidad[linea[1]](
                nombre= linea[0],
                personalidad= linea[1],
                energia= linea[2],
                suerte= linea[3],
                dinero= linea[4],
                frustracion= linea[5],
                ego = linea[6],
                carisma = linea[7],
                confianza= linea[8],
                juego_favorito= linea[9]
                ))
                    

        self.jugadores = jugadores

    def cargar_bebestibles(self, ruta):
        bebestibles = []
        with open(ruta, "r",  encoding="UTF-8") as archivo:
            for linea in archivo.readlines()[1:]:
                linea = linea.strip().split(",")
                #nombre,tipo,precio
                tipo = {
                    'Brebaje mágico': BrebajeMagico,
                    'Gaseosa': Gaseosa,
                    'Jugo': Jugo
                }
                
                bebestibles.append(
                    tipo[linea[1]](
                    nombre= linea[0],
                    tipo = linea[1],
                    precio = linea[2]
                ))

        self.bebestibles = bebestibles