from PyQt5.QtCore import QObject, pyqtSignal, QTimer
from parametros import RUTA_PUNTAJES

class LogicaRanking(QObject):

    senal_enviar_ranking = pyqtSignal(list)
    
    def __init__(self):
        super().__init__()
        self.primer_ranking = True
        self.cargar_datos_ranking()

    def cargar_datos_ranking(self):
        ranking = {}
        try:
            with open(RUTA_PUNTAJES, "r", encoding="UTF-8") as archivo:
                for linea in archivo.readlines():
                    linea = linea.strip().split(",")
                    ranking[linea[0]] = int(linea[1])
                
            ranking = sorted(ranking.items(), key=lambda x:x[1], reverse=True)
            top_5 = ranking[:5]
            self.ranking = dict(ranking)
            
        except FileNotFoundError as error:
            registro_ranking = open(RUTA_PUNTAJES, "w")
            registro_ranking.close()
            self.ranking = {}
            top_5 = []
        
        if self.primer_ranking:
            QTimer.singleShot(1, lambda: self.senal_enviar_ranking.emit(top_5))
            self.primer_ranking = False
        else:
            self.senal_enviar_ranking.emit(top_5)

    def agregar_jugador(self, jugador:tuple):
        with open(RUTA_PUNTAJES, "a") as archivo:
            archivo.write('\n')
            archivo.write(','.join(map(str, jugador)))
        
        self.cargar_datos_ranking()
