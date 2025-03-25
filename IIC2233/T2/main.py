import sys
from PyQt5.QtWidgets import QApplication

from frontend.ventana_inicio import VentanaInicio
from frontend.ventana_principal import VentanaPrincipal
from frontend.ventana_ranking import VentanaRanking
from frontend.ventana_juego import VentanaJuego
from frontend.ventana_postnivel import VentanaResumen

from backend.logica_principal import LogicaPrincipal
from backend.logica_juego import LogicaJuego
from backend.logica_ranking import LogicaRanking
from backend.entidades import Pistola

if __name__ == '__main__':
    def hook(type, value, traceback):
        print(type)
        print(traceback)
    sys.__excepthook__ = hook
    app = QApplication([])

    #Ventanas
    ventana_inicio = VentanaInicio()
    ventana_principal = VentanaPrincipal()
    ventana_ranking = VentanaRanking()
    ventana_juego = VentanaJuego()
    ventana_resumen = VentanaResumen()
    
    #Logica
    logica_principal = LogicaPrincipal()
    logica_juego = LogicaJuego()
    logica_ranking = LogicaRanking()
    pistola = Pistola()

    #Senales
    #Flujo jugar
    ventana_inicio.senal_jugar.connect(
        ventana_principal.mostrar
    )

    #Flujo ventana ranking
    logica_ranking.senal_enviar_ranking.connect(
        ventana_ranking.actualizar_labels
    )

    ventana_inicio.senal_ver_ranking.connect(
        ventana_ranking.mostrar
    )

    ventana_ranking.senal_mostrar_inicio.connect(
        ventana_inicio.mostrar
    )

    #Flujo principal
    ventana_principal.senal_enviar_datos.connect(
        logica_principal.verificar_datos
    )

    logica_principal.senal_respuesta_validacion.connect(
        ventana_principal.pop_up_error
    )

    #Cargar el Juego
    logica_principal.senal_cargar_juego.connect(
        ventana_juego.cargar_ambiente
    )

    logica_principal.senal_cargar_juego.connect(
        logica_juego.recibir_datos
    )

    logica_juego.senal_cargar_datos_panel.connect(
        ventana_juego.cargar_panel_datos
    )

    #Iniciar juego
    ventana_principal.senal_iniciar_juego.connect(
        ventana_juego.mostrar
    )

    ventana_principal.senal_iniciar_juego.connect(
        logica_juego.iniciar
    )

    logica_juego.senal_bajar_seg.connect(
        ventana_juego.actualizar_tiempo
    )

    #Eventos por teclas
    ventana_juego.senal_tecla.connect(
        pistola.mover
    )

    ventana_juego.senal_tecla.connect(
        logica_juego.cheatcodes
    )

    pistola.senal_moverse.connect(
        ventana_juego.cambiar_posicion_pistola
    )

    #Flujo Aliens
    logica_juego.senal_enviar_aliens.connect(
        ventana_juego.aparecer_aliens
    )

    logica_juego.senal_mover_aliens.connect(
        ventana_juego.mover_aliens
    )

    ventana_juego.senal_dejar_mover.connect(
        logica_juego.stop_alien
    )

    # Disparo
    pistola.senal_disparo.connect(
        ventana_juego.disparo
    )

    pistola.senal_enviar_coordenadas.connect(
        logica_juego.revisar_acierto_disparo
    )

    logica_juego.senal_acierto_alien.connect(
        ventana_juego.matar_alien
    )

    #Explosion
    logica_juego.senal_explosion.connect(
        ventana_juego.secuencia_explosion
    )

    #Pausa
    ventana_juego.senal_pausado.connect(
        logica_juego.pausa
    )

    #Termino de nivel
    logica_juego.senal_final_juego.connect(
        ventana_resumen.cargar_estado
    )

    logica_juego.senal_ocultar_juego.connect(
        ventana_juego.ocultar
    )
    
    logica_juego.senal_ocultar_juego.connect(
        ventana_resumen.mostrar
    )

    logica_juego.senal_ocultar_juego.connect(
        pistola.reset
    )

    logica_juego.senal_animacion.connect(
        ventana_juego.secuencia_dog
    )
    
    #Volver a inicio
    ventana_resumen.senal_volver_inicio.connect(
        ventana_inicio.mostrar
    )

    ventana_resumen.senal_volver_inicio.connect(
        logica_juego.resetear
    )

    ventana_juego.senal_volver_inicio.connect(
        ventana_inicio.mostrar
    )

    ventana_juego.senal_volver_inicio.connect(
        logica_juego.resetear
    )

    #Avanzar al proximo nivel
    ventana_resumen.senal_siguiente_nivel.connect(
        logica_juego.iniciar
    )

    ventana_resumen.senal_siguiente_nivel.connect(
        ventana_juego.mostrar
    )

    #Actualizar ranking
    ventana_juego.senal_enviar_datos_ranking.connect(
        logica_juego.enviar_datos_ranking
    )


    ventana_resumen.senal_enviar_datos_ranking.connect(
        logica_juego.enviar_datos_ranking
    )

    logica_juego.senal_enviar_datos_ranking.connect(
        logica_ranking.agregar_jugador
    )

    #Bomba de Hielo
    logica_juego.senal_aparecer_bomba.connect(
        ventana_juego.aparicion_bomba_hielo
    )

    #Inicio
    ventana_inicio.mostrar()
    app.exec()