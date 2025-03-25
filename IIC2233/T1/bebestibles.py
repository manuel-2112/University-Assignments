
from abc import ABC, abstractmethod
from tabulate import tabulate
from random import randint
from parametros import MIN_ENERGIA_BEBESTIBLE, MAX_ENERGIA_BEBESTIBLE

class Bebestible(ABC):
    def __init__(self, nombre, tipo, precio, **kwargs) -> None:
        super().__init__(**kwargs)
        self.nombre = nombre
        self.tipo = tipo
        self.precio = int(precio)

    @abstractmethod
    def consumir(self, jugador, bonificacion):
        pass

    def imprimir_cambios(self, data):
        tabla = tabulate(
        data,
        headers=['Característica', 'Cambio', 'Valor actual'],
        tablefmt="simple"
        )
        print('\n' + tabulate(
            [[tabla]],
            headers=[f'***  Beneficios obtenidos por {self.tipo}***'.center(54)],
            tablefmt='fancy_grid'
            ))
        

class Jugo(Bebestible):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)

    def consumir(self, jugador, bonificacion):  
        cambio_energia = bonificacion * randint(MIN_ENERGIA_BEBESTIBLE, MAX_ENERGIA_BEBESTIBLE)
        jugador.energia += cambio_energia
        data_beneficios = [['Energía', f'+{cambio_energia}', jugador.energia]]

        largo_nombre = len(self.nombre)
        if largo_nombre <= 4:
            cambio_ego = bonificacion * 4
            jugador.ego += cambio_ego
            data_beneficios.append(['Ego', f'+{cambio_ego}', jugador.ego])

        elif 5 <= largo_nombre <= 7:
            cambio_suerte = bonificacion * 7
            jugador.suerte += cambio_suerte
            data_beneficios.append(['Suerte', f'+{cambio_suerte}', jugador.suerte])
        
        elif 8 <= largo_nombre:
            cambio_frustracion = bonificacion * -10
            jugador.frustracion += cambio_frustracion

            cambio_ego = bonificacion * 11
            jugador.ego += cambio_ego

            if cambio_frustracion < 0:
                data_beneficios.append(
                    ['Frustración', f'{cambio_frustracion}', jugador.frustracion]
                    )
            else:
                data_beneficios.append(
                    ['Frustración', f'+{cambio_frustracion}', jugador.frustracion]
                    )
            data_beneficios.append(['Ego', f'+{cambio_ego}', jugador.ego])

        return data_beneficios
        


class Gaseosa(Bebestible):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
    
    def consumir(self, jugador, bonificacion):
        cambio_energia = bonificacion * randint(MIN_ENERGIA_BEBESTIBLE, MAX_ENERGIA_BEBESTIBLE)
        jugador.energia += cambio_energia
        cambio_ego = bonificacion * 11
        jugador.ego += cambio_ego
        data_beneficios = [
            ['Energía', f'+{cambio_energia}', jugador.energia],
            ['Ego', f'+{cambio_ego}', jugador.ego]]

        if jugador.personalidad == 'Ludopata' or jugador.personalidad == 'Tacano':
            cambio_frustracion = bonificacion * -5
            jugador.frustracion += cambio_frustracion

        elif jugador.personalidad == 'Bebedor' or jugador.personalidad == 'Casual':
            cambio_frustracion = bonificacion * 5
            jugador.frustracion += cambio_frustracion
        
        if cambio_frustracion < 0:
            data_beneficios.append(
                ['Frustración', f'{cambio_frustracion}', jugador.frustracion]
                )
        else:
            data_beneficios.append(
                ['Frustración', f'+{cambio_frustracion}', jugador.frustracion]
                )

        return data_beneficios


class BrebajeMagico(Jugo, Gaseosa):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
    
    def consumir(self, jugador, bonificacion):
        beneficios_jugo = Jugo.consumir(self, jugador, bonificacion)
        beneficios_gaseosa = Gaseosa.consumir(self, jugador, bonificacion)

        data_beneficios = []
        caracteristicas = []

        for i in beneficios_gaseosa:
            for j in beneficios_jugo:
                if i[0] == j[0]:
                    cambio = int(i[1])+int(j[1])
                    if cambio < 0:
                        data_beneficios.append(
                            [i[0],
                            f'{cambio}',
                            i[2]]
                        )
                    else:
                        data_beneficios.append(
                            [i[0],
                            f'+{cambio}',
                            i[2]]
                        )

                    caracteristicas.append(i[0])

        for lista in [beneficios_gaseosa, beneficios_jugo]:
            for i in lista:
                if i[0] not in caracteristicas:
                    data_beneficios.append(i)

        cambio_carisma = bonificacion * 5
        jugador.carisma += cambio_carisma
        data_beneficios.append(['Carisma', f'+{cambio_carisma}', jugador.carisma])
        
        return data_beneficios