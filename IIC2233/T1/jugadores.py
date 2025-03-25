from abc import ABC, abstractmethod
from tabulate import tabulate
from parametros import BONIFICACION_SUERTE_CASUAL, BONIFICACION_TACANO, \
    PORCENTAJE_APUESTA_TACANO, MULTIPLICADOR_BONIFICACION_BEBEDOR

class Jugador(ABC):
    def __init__(self, nombre, energia, suerte, dinero, frustracion, ego, 
    personalidad, carisma, confianza, juego_favorito, **kwargs):
        super().__init__(**kwargs)
        self.nombre = nombre
        self.__energia = int(energia)
        self.__suerte = int(suerte)
        self.dinero = int(dinero)
        self.__frustracion = int(frustracion)
        self.__ego = int(ego)
        self.personalidad = personalidad
        self.juegos_jugados = []
        self.__carisma = int(carisma)
        self.__confianza = int(confianza)
        self.juego_favorito = juego_favorito

    @property
    def energia(self):
        return self.__energia
    
    @energia.setter
    def energia(self, n):
        if 0 > n:
            self.__energia = 0
        elif n > 100:
            self.__energia = 100
        else:
            self.__energia = n

    @property
    def suerte(self):
        return self.__suerte
    
    @suerte.setter
    def suerte(self, n):
        if 0 > n:
            self.__suerte = 0
        elif n > 50:
            self.__suerte = 100
        else:
            self.__suerte = n
    
    @property
    def frustracion(self):
        return self.__frustracion
    
    @frustracion.setter
    def frustracion(self, n):
        if 0 > n:
            self.__frustracion = 0
        elif n > 100:
            self.__frustracion = 100
        else:
            self.__frustracion = n
    
    @property
    def ego(self):
        return self.__ego
    
    @ego.setter
    def ego(self, n):
        if 0 > n:
            self.__ego = 0
        elif n > 15:
            self.__ego = 15
        else:
            self.__ego = n

    @property
    def carisma(self):
        return self.__carisma
    
    @carisma.setter
    def carisma(self, n):
        if 0 > n:
            self.__carisma = 0
        elif n > 50:
            self.__carisma = 50
        else:
            self.__carisma = n

    @property
    def confianza(self):
        return self.__confianza
    
    @confianza.setter
    def confianza(self, n):
        if 0 > n:
            self.__carisma = 0
        elif n > 30:
            self.__carisma = 30
        else:
            self.__carisma = n

    def comprar_bebestible(self, bebestible):
        compra = self.dinero - bebestible.precio

        if compra < 0:
            return False, \
            'Lo siento. No tienes suficiente dinero para ese bebestible...'.center(54)
        else:
            self.dinero = compra
            return True, f'*** Has consumido {bebestible.nombre}. ***'.center(54) + \
                '\n'+ f'Tu dinero actual es ${self.dinero}'.center(54)
    
    @abstractmethod
    def apostar(self):
        pass

    def ver_habilidades(self, dinero_faltante):
        data = [['Habilidad', 'Valor']]
        data.append(['Nombre', self.nombre])
        data.append(['Personalidad', self.personalidad])
        data.append(['Energía', self.energia])
        data.append(['Suerte', self.suerte])
        data.append(['Dinero', f'${self.dinero}'])
        data.append(['Frustración', self.frustracion])
        data.append(['Ego', self.ego])
        data.append(['Carisma', self.carisma])
        data.append(['Confianza', self.confianza])
        data.append(['Juego favorito', self.juego_favorito.title()])
        data.append(['Dinero faltante', f'${dinero_faltante}'])

        data_2 = [['[0]', 'Volver'], ['[X]', 'Salir']]
        tabla = tabulate(data, headers='firstrow')
        tabla_2 = tabulate(data_2)
        print('\n' + tabulate(
            [[tabla+'\n\n'+tabla_2]],
            headers=[f'*** Ver estado del Jugador ***'.center(54)],
            tablefmt='fancy_grid'
            ))
    
    def probabilidad_juego(self, apuesta, favorito):
        return min(1, max(
                0, (15*self.suerte - 0.4*apuesta + 3*self.confianza*favorito + 2*self.carisma) \
                /(1000)
                ))


class Ludopata(Jugador):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def apostar(self, resultado):
        gasto_energia = round((self.ego + self.frustracion)*0.15)
        self.energia -= gasto_energia
        print('')
        print('Has gastado energía al jugar:'.center(54))
        print(f'-{gasto_energia} de energía'.center(54))
        self.ludopatia(resultado)

    def ludopatia(self, resultado):
        print('')
        print('Por ser ludopata has:'.center(54))
        self.ego += 2
        self.suerte += 3
        print('+2 Ego'.center(54))
        print('+3 Suerte'.center(54))

        if resultado == False:
            self.frustracion += 5
            print('+5 Frustración'.center(54))

class Tacano(Jugador):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
    
    def apostar(self, apuesta):
        gasto_energia = round((self.ego + self.frustracion)*0.15)
        self.energia -= gasto_energia
        print('')
        print('Has gastado energía al jugar:'.center(54))
        print(f'-{gasto_energia} de energía'.center(54))
        return self.tacano_extremo(apuesta)
        
    
    def tacano_extremo(self, apuesta):
        if int(apuesta) < PORCENTAJE_APUESTA_TACANO*self.dinero:
            return BONIFICACION_TACANO

class Bebedor(Jugador):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
    
    def apostar(self):
        gasto_energia = round((self.ego + self.frustracion)*0.15)
        self.energia -= gasto_energia
        print('')
        print('Has gastado energía al jugar:'.center(54))
        print(f'-{gasto_energia} de energía'.center(54))
    
    def cliente_recurrente(self):
        return MULTIPLICADOR_BONIFICACION_BEBEDOR

class Casual(Jugador):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
    
    def apostar(self, juego):
        gasto_energia = round((self.ego + self.frustracion)*0.15)
        self.energia -= gasto_energia
        print('')
        print('Has gastado energía al jugar:'.center(54))
        print(f'-{gasto_energia} de energía'.center(54))
        self.suerte += self.suerte_principiante(juego)

    def suerte_principiante(self, juego):
        if juego.nombre not in self.juegos_jugados:
            bonificacion = BONIFICACION_SUERTE_CASUAL
            print('')
            print('Por ser casual has recibido:'.center(54))
            print(f'+{bonificacion} de suerte'.center(54))
            return bonificacion
        return 0