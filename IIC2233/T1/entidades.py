from random import random, choice
from tabulate import tabulate
from parametros import CARISMA_GANAR, CONFIANZA_PERDER, DINERO_SHOW, EGO_GANAR, \
    ENERGIA_SHOW, FRUSTRACION_GANAR, FRUSTRACION_PERDER, FRUSTRACION_SHOW

class Casino:
    
    def __init__(self, jugador, bebestibles, juegos, deuda, probabilidad) -> None:
        self.jugador = jugador
        self.show = Show()
        self.bebestibles = bebestibles
        self.juegos = juegos
        self.dinero_faltante = deuda
        self.probabilidad_evento = probabilidad

    def evento_especial(self):
        if random() <= self.probabilidad_evento:
            bebestible = choice(self.bebestibles)

            print('\n' + tabulate(
            [[f'DCCasino te ha regalado {bebestible.nombre}']],
            headers=[f'***  Hay evento especial: ***'.center(54)],
            tablefmt='fancy_grid'
            ))

            bonificacion = 1
            if self.jugador.personalidad == 'Bebedor':
                bonificacion = self.jugador.cliente_recurrente()
                print('')
                print('Por ser bebedor has:'.center(54))
                print(f'x{bonificacion} tu bonificación'.center(54))
            cambios = bebestible.consumir(self.jugador, bonificacion)
            bebestible.imprimir_cambios(cambios)
            
    
    def jugar(self, juego, apuesta):
        favorito = 0
        if juego.nombre == self.jugador.juego_favorito:
            favorito = 1

        probabilidad_jugador = self.jugador.probabilidad_juego(apuesta, favorito)
        probabilidad_juego = juego.probabilidad_de_ganar(probabilidad_jugador, apuesta, favorito)
        prob = random()
        if prob <= probabilidad_juego:
            print('\n' + tabulate(
            [
                ['Duplicaste el valor de tu apuesta.'],
                [f'Ganaste ${apuesta*2}']
            ],
            headers=[f'***  Has ganado en {juego.nombre}! ***'.center(54)],
            tablefmt='fancy_grid'
            ))
            return True
            
        elif prob > probabilidad_juego:
            print('\n' + tabulate(
            [
                ['DCCasino se lleva el valor de tu apuesta.'],
                [f'Perdiste ${apuesta}']
            ],
            headers=[f'***  Has perdido en {juego.nombre}! ***'.center(54)],
            tablefmt='fancy_grid'
            ))
            return False

class Juego:
    def __init__(self, nombre, esperanza, apuesta_minima, apuesta_maxima) -> None:
        self.nombre = nombre
        self.esperanza = int(esperanza)
        self.apuesta_minima = int(apuesta_minima)
        self.apuesta_maxima = int(apuesta_maxima)
    
    def entregar_resultados(self, jugador, resultado, apuesta, bonificacion):       
        if resultado == False:
            jugador.frustracion += FRUSTRACION_PERDER
            jugador.confianza -= CONFIANZA_PERDER
            jugador.dinero -= apuesta
        elif resultado == True:
            jugador.frustracion -= FRUSTRACION_GANAR
            jugador.carisma += CARISMA_GANAR
            jugador.ego  += EGO_GANAR
            jugador.dinero += 2*apuesta + bonificacion
            
            if bonificacion > 0:
                print('')
                print('Por ser tacaño has recibido:'.center(54))
                print(f'${bonificacion} extra'.center(54))
        
    def probabilidad_de_ganar(self, probabilidad_jugador, apuesta, favorito):
        return min(1, probabilidad_jugador-(apuesta-(favorito*50-self.esperanza*30))/(10000))
    
    def validar_apuesta(self, apuesta, dinero_jugador):
        if apuesta.isdigit() == True:
            if self.apuesta_minima <= int(apuesta) <= self.apuesta_maxima:
                if int(apuesta) <= dinero_jugador:
                    return True
                else:
                    return (
                        False,
                        'No tienes ese dinero para apostar...'.center(54) + \
                            '\n'+ f'Tu dinero actual es de ${dinero_jugador}'.center(54))
        
        return (False, 'La cantidad indicada no es valida...'.center(54))
    
    def __str__(self) -> str:
        data = [
            ['Apuesta mínima', f'${self.apuesta_minima}'],
            ['Apuesta máxima', f'${self.apuesta_maxima}']]
        informacion = '\n\n' + tabulate(
            data,
            headers=['Característica', 'Cantidad'],
            tablefmt="simple"
        )
        mensaje = '\n' + tabulate(
            [[informacion]],
            headers=[f'***  {self.nombre.title()} ***'.center(54)],
            tablefmt='fancy_grid'
            )
        return mensaje

#BONUS
class Show:
    def __init__(self) -> None:
        self.costo = DINERO_SHOW
        self.energia_show = ENERGIA_SHOW
        self.frustracion_show = FRUSTRACION_SHOW

    def ver_show(self, jugador):
        entrada = self.validar_costo(jugador.dinero)
        
        if entrada == True:
            jugador.energia += self.energia_show
            jugador.frustracion -= self.frustracion_show
            jugador.dinero -= self.costo
        
            data = [
                ['Frustración', f'-{self.frustracion_show}', jugador.frustracion],
                ['Ego', f'+{self.energia_show}', jugador.ego]
                ]
            
            self.imprimir_beneficios(data)

    def validar_costo(self, dinero):
        if dinero < self.costo:
            print('')
            print('No tienes suficiente dinero para entrar al Show...'.center(54))
            print(f'El costo de la entrada es de ${self.costo}'.center(54))
            print(f'Tu dinero actual es de ${dinero}'.center(54))
            return False
        elif dinero >= self.costo:
            print('')
            print(f'*** Compraste entrada al Show ***'.center(54))
            print(f'El costo fue de ${self.costo}'.center(54))
            print(f'Tu dinero actual es de ${dinero-self.costo}'.center(54))
            return True
        
    def imprimir_beneficios(self, data):
        tabla = tabulate(
        data,
        headers=['Característica', 'Cambio', 'Valor actual'],
        tablefmt="simple"
        )
        print('\n' + tabulate(
            [[tabla]],
            headers=[f'***  Beneficios obtenidos por el Show***'.center(54)],
            tablefmt='fancy_grid'
            ))