from PyQt5.uic import loadUiType
from PyQt5.QtCore import pyqtSignal

from parametros import RUTA_VENTANA_RANKING

window_name, base_class = loadUiType(RUTA_VENTANA_RANKING)

class VentanaRanking(window_name, base_class):

    senal_mostrar_inicio = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.boton_volver.clicked.connect(self.volver)

    def actualizar_labels(self, jugadores:list):        
        if len(jugadores) > 0:
            self.mensaje_registro.hide()
        else:
            self.mensaje_registro.show()

        labels_puntaje = [
           self.puntos_1, self.puntos_2,
           self.puntos_3, self.puntos_4,
           self.puntos_5
           ]
        
        labels_nombres = [
            self.nombre_1, self.nombre_2,
            self.nombre_3, self.nombre_4,
            self.nombre_5
            ]

        labels_numeros = [
            self.num_1, self.num_2,
            self.num_3, self.num_4,
            self.num_5
        ]

        labels_pts = [
            self.pts_1, self.pts_2,
            self.pts_3, self.pts_4,
            self.pts_5
        ]

        labels_imagen = [
            self.img_1, self.img_2, self.img_3
        ]

        for i in range(5):
            try:
                labels_nombres[i].setText(str(jugadores[i][0]))
                labels_puntaje[i].setText(str(jugadores[i][1]))
                labels_numeros[i].show()
                labels_nombres[i].show()
                labels_puntaje[i].show()
                labels_pts[i].show()
                if i <= 2:
                    labels_imagen[i].show()
            except IndexError as error:
                labels_nombres[i].hide()
                labels_puntaje[i].hide()
                labels_numeros[i].hide()
                labels_nombres[i].hide()
                labels_puntaje[i].hide()
                labels_pts[i].hide()
                if i <= 2:
                    labels_imagen[i].hide()
    
    def closeEvent(self, event):
        self.senal_mostrar_inicio.emit()
        event.accept()
        
    def mostrar(self):
        self.show()

    def volver(self):
        self.hide()
        self.senal_mostrar_inicio.emit()