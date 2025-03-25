from abc import ABC, abstractmethod
from tabulate import tabulate

class Menu(ABC):
    def __init__(self) -> None:
        pass
    
    def elegir_opcion(self, largo):
        try:
            opcion = input('\nIndique su opción: ')
            resultado = self.validar_opcion(opcion, largo)
        
        except (TypeError, ValueError) as error:
            print(f'Ocurrio un error:\n{error}')
            return self.elegir_opcion(largo)

        else:
            return resultado


    def validar_opcion(self, opcion, largo):
        if opcion.isalpha():
            opcion = opcion.upper()

        if opcion != 'X' and opcion.isdigit() == False:
            raise TypeError('La opción ingresada no es un número')
        
        if opcion != 'X' and not 0 <= int(opcion) <= largo:
            raise ValueError('La opción ingresada no existe')

        return opcion
    
    @abstractmethod
    def desplegar_menu(self):
        pass


class MenuInicio(Menu):
    def __init__(self) -> None:
        self.nombre = 'Menú de Inicio'
        self.opciones = [
            'Iniciar Partida'
            ]

    def desplegar_menu(self):
        data = [['N°', 'Opción']]
        n = 1
        for opcion in self.opciones:
            data.append([f'[{n}]', opcion])
            n += 1
        data.append(['[X]', 'Salir'])
        tabla = tabulate(data, headers='firstrow')
        print('\n' + tabulate(
            [[tabla]],
            headers=[f'*** {self.nombre} ***'.center(54)],
            tablefmt='fancy_grid'
            ))

        opcion = self.elegir_opcion(len(self.opciones))
        return opcion


class OpcionesJugador(Menu):
    def __init__(self) -> None:
        self.nombre = 'Opciones de Jugador'
    
    def desplegar_menu(self, jugadores: list):
        data = [['N°', 'Nombre', 'Personalidad']]
        for i in range(len(jugadores)):
            data.append([f'[{i+1}]', jugadores[i].nombre, jugadores[i].personalidad])
        
        data_2 = [['[0]', 'Volver'], ['[X]', 'Salir']]
        tabla = tabulate(data, headers='firstrow')
        tabla_2 = tabulate(data_2)

        print('\n' + tabulate(
            [[tabla+'\n\n'+tabla_2]],
            headers=[f'*** {self.nombre} ***'.center(54)],
            tablefmt='fancy_grid'
            ))
        
        n_eleccion = self.elegir_opcion(len(jugadores))

        if n_eleccion != '0' and n_eleccion != 'X':
            return n_eleccion, jugadores[int(n_eleccion)-1]
        else:
            return n_eleccion, None


class MenuPrincipal(Menu):
    def __init__(self) -> None:
        self.nombre = 'Menú Principal'
        self.opciones = [
            'Opciones de juegos',
            'Comprar bebestible',
            'Habilidades jugador',
            'Show'
            ]

    def desplegar_menu(self):
        data = [['N°', 'Opción']]
        n = 1
        for opcion in self.opciones:
            data.append([f'[{n}]', opcion])
            n += 1

        data_2 = [['[0]', 'Volver'], ['[X]', 'Salir']]
        tabla = tabulate(data, headers='firstrow')
        tabla_2 = tabulate(data_2)
        print('\n' + tabulate(
            [[tabla+'\n\n'+tabla_2]],
            headers=[f'*** {self.nombre} ***'.center(54)],
            tablefmt='fancy_grid'
            ))
        
        opcion = self.elegir_opcion(len(self.opciones))
        return opcion

class OpcionesJuego(Menu):

    def __init__(self) -> None:
        self.nombre = 'Opciones de Juegos'

    def desplegar_menu(self, juegos: list):
        data = [['N°', 'Nombre']]
        for i in range(len(juegos)):
            data.append([f'[{i+1}]', juegos[i].nombre.title()])

        data_2 = [['[0]', 'Volver'], ['[X]', 'Salir']]
        tabla = tabulate(data, headers='firstrow')
        tabla_2 = tabulate(data_2)

        print('\n' + tabulate(
            [[tabla+'\n\n'+tabla_2]],
            headers=[f'*** {self.nombre} ***'.center(54)],
            tablefmt='fancy_grid'
            ))

        n_eleccion = self.elegir_opcion(len(juegos))
        
        if n_eleccion != '0' and n_eleccion != 'X':
            return n_eleccion, juegos[int(n_eleccion)-1]
        else:
            return n_eleccion, None


class OpcionesBebestibles(Menu):
    def __init__(self) -> None:
        self.nombre = 'Bebestibles'

    def desplegar_menu(self, bebestibles: list):
        data = [['N°', 'Nombre', 'Tipo', 'Precio']]
        n = 1
        for bebestible in bebestibles:
            data.append([
                f'[{n}]',
                bebestible.nombre,
                bebestible.tipo,
                f'${bebestible.precio}'
            ])
            n += 1
        
        tabla = tabulate(data, headers='firstrow')
        tabla += '\n\n[0] Volver'
        tabla += '\n[X] Salir'

        print('\n' + tabulate(
            [[tabla]],
            headers=[f'*** {self.nombre} ***'.center(54)],
            tablefmt='fancy_grid'
            ))

        n_eleccion = self.elegir_opcion(len(bebestibles))
        
        if n_eleccion != '0' and n_eleccion != 'X':
            return n_eleccion, bebestibles[int(n_eleccion)-1]
        else:
            return n_eleccion, None

class VolverSalir(Menu):
    def desplegar_menu(self):
        n_eleccion = self.elegir_opcion(0)
        return n_eleccion