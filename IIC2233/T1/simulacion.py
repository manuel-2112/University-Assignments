from entidades import Casino
from menus import MenuInicio, MenuPrincipal, OpcionesBebestibles, \
    OpcionesJugador, OpcionesJuego, VolverSalir
from cargar_datos import Datos


class Simulacion:

    def __init__(self, deuda, probabilidad) -> None:
        self.cargar_datos()
        self.iniciar_menus()
        self.deuda_original = deuda

        self.casino = Casino(
            jugador= None,
            bebestibles= self.datos['Bebestibles'],
            juegos = self.datos['Juegos'],
            deuda= deuda,
            probabilidad= probabilidad
            )

    def iniciar_menus(self):
        self.menu = {
            'inicio': MenuInicio(),
            'principal': MenuPrincipal(),
            'jugadores': OpcionesJugador(),
            'bebestibles': OpcionesBebestibles(),
            'juegos': OpcionesJuego(),
            'volver': VolverSalir()
        }
    
    def cargar_datos(self):
        datos = Datos()
        self.datos = {
            'Juegos': datos.juegos,
            'Jugadores': datos.jugadores,
            'Bebestibles': datos.bebestibles
        }


    def iniciar(self):
        print('_' * 60 + '\n')
        print(f'*** BIENVENID@ A DCCASINO ***'.center(60))
        print('_' * 60 + '\n')

        self.flujo_menu_inicio()

        print('_' * 60 + '\n')
        print(f'*** GRACIAS POR JUGAR  ***'.center(60))
        print('_' * 60 + '\n')

    def flujo_menu_inicio(self):

        opcion_elegida = None
        while opcion_elegida != 'X':
            opcion_elegida = self.menu['inicio'].desplegar_menu()
            
            if opcion_elegida == '0':
                print('Ocurrio un error:')
                print('La opción ingresada no existe')

            if opcion_elegida == '1':
                opcion_elegida = self.elegir_jugador()
    
    def elegir_jugador(self):
        opcion_elegida, jugador = self.menu['jugadores'].desplegar_menu(self.datos['Jugadores'])

        if jugador != None:
            self.casino.jugador = jugador
            print('')
            print(f'*** Se ha seleccionado a {jugador.nombre} ***'.center(54))
            opcion_elegida = self.flujo_menu_ppal()
        
        if opcion_elegida == 'X':
            return 'X'

    def flujo_menu_ppal(self):
        opcion_elegida = None
        while opcion_elegida != 'X' and opcion_elegida != '0':
            self.casino.dinero_faltante = self.deuda_original - self.casino.jugador.dinero
            if self.casino.dinero_faltante <= 0:
                print('_' * 60 + '\n')
                print(f'*** FELICITACIONES!  ***'.center(60))
                print(f'*** LE HAS PAGADO TU DEUDA A BIG CAT  ***'.center(60))
                print('_' * 60 + '\n')
                self.__init__(self.deuda_original, self.casino.probabilidad_evento)
                opcion_elegida = '0'
            
            if self.casino.jugador.dinero == 0:
                print('_' * 60 + '\n')
                print(f'*** HAS PERDIDO!  ***'.center(60))
                print(f'*** NO HAS PODIDO PAGARLE LA DEUDA A BIG CAT ***'.center(60))
                print('_' * 60 + '\n')
                self.__init__(self.deuda_original, self.casino.probabilidad_evento)
                opcion_elegida = '0'
            
            if opcion_elegida != '0':
                opcion_elegida = self.menu['principal'].desplegar_menu()

            if opcion_elegida == '1':
                opcion_elegida = self.elegir_juego()
            
            elif opcion_elegida == '2':
                opcion_elegida = self.comprar_bebestible()

            elif opcion_elegida == '3':
                opcion_elegida = self.habilidades_jugador()
            
            elif opcion_elegida == '4':
                self.casino.show.ver_show(self.casino.jugador)
            
            elif opcion_elegida == '0':
                self.__init__(self.deuda_original, self.casino.probabilidad_evento)

            if opcion_elegida == 'X':
                return 'X'
            


    def elegir_juego(self):
        opcion_elegida, juego = self.menu['juegos'].desplegar_menu(self.datos['Juegos'])

        if juego != None:
            
            if self.casino.jugador.dinero >= juego.apuesta_minima:
                print(juego)
                apuesta = input('\nCuanto quieres apostar?: $')
                confirmacion = juego.validar_apuesta(apuesta, self.casino.jugador.dinero)
            elif self.casino.jugador.dinero < juego.apuesta_minima:
                print('')
                print(f'Lo siento no puedes jugar {juego.nombre.title()}...'.center(54))
                print(f'La apuesta mínima es de ${juego.apuesta_minima}'.center(54))
                print(f'Tu dinero actual es de ${self.casino.jugador.dinero}'.center(54))
                return self.elegir_juego()

            if confirmacion == True:
                bonificacion = 0
                if self.casino.jugador.personalidad == 'Tacano':
                    bonificacion = self.casino.jugador.apostar(apuesta)
                elif self.casino.jugador.personalidad == 'Bebedor':
                    self.casino.jugador.apostar()
                elif self.casino.jugador.personalidad == 'Casual':
                    self.casino.jugador.apostar(juego)
                
                
                resultado = self.casino.jugar(juego, int(apuesta))
                if self.casino.jugador.personalidad == 'Ludopata':
                    self.casino.jugador.apostar(resultado)

                self.casino.jugador.juegos_jugados.append(juego.nombre)
                juego.entregar_resultados(self.casino.jugador, resultado, int(apuesta), bonificacion)
                
                #Evento especial
                self.casino.evento_especial()

            
            elif confirmacion[0] == False:
                print('')
                print(confirmacion[1])
                return self.elegir_juego()
        
        if opcion_elegida == 'X':
            return 'X'

    def comprar_bebestible(self):
        opcion_elegida, bebestible = self.menu['bebestibles'].desplegar_menu(self.datos['Bebestibles'])

        if bebestible != None:
            resultado, mensaje = self.casino.jugador.comprar_bebestible(bebestible)
            print('')
            print(mensaje)

            if resultado == True:
                bonificacion = 1
                if self.casino.jugador.personalidad == 'Bebedor':
                    bonificacion = self.casino.jugador.cliente_recurrente()
                    print('')
                    print('Por ser bebedor has:'.center(54))
                    print(f'x{bonificacion} tu bonificación'.center(54))

                cambios = bebestible.consumir(self.casino.jugador, bonificacion)
                bebestible.imprimir_cambios(cambios)

        if opcion_elegida == 'X':
            return 'X'

    def habilidades_jugador(self):
        self.casino.jugador.ver_habilidades(self.casino.dinero_faltante)
        opcion_elegida = self.menu['volver'].desplegar_menu()

        if opcion_elegida == 'X':
            return 'X'