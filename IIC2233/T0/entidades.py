from parametros import CONTRASENA_ADMIN, MIN_CARACTERES, LARGO_CONTRASENA, MAX_PESO
from tabulate import tabulate

class Encomiendas:
    def __init__(self):
        self.nombre = None
        self.receptor = None
        self.peso = None
        self.destino = None
        self.fecha = None
        self.estado = None

    def crear_encomienda(self, nombre, receptor, peso, destino, fecha, estado):
        self.agregar_nombre(nombre)
        self.agregar_receptor(receptor)
        self.agregar_peso(peso)
        self.agregar_destino(destino)
        self.agregar_fecha(fecha)
        self.agregar_estado(estado)
    
    def agregar_nombre(self, nombre):
        self.nombre = nombre
    
    def agregar_receptor(self, receptor):
        self.receptor = receptor
    
    def agregar_peso(self, peso):
        self.peso = peso
    
    def agregar_destino(self, destino):
        self.destino = destino
    
    def agregar_fecha(self, fecha):
        self.fecha = fecha
    
    def agregar_estado(self, estado):
        self.estado = estado
    
    def validar_nombre(self, nombre_articulo):
        mensaje = ''
        if ',' in nombre_articulo:
            mensaje = ' ** El nombre no debe llevar comas (,) ** '
            return (False, mensaje)
        return (True, mensaje)

    def validar_peso(self, peso):
        mensaje = ''
        if peso.replace('.', '', 1).isdigit() == False:
                mensaje += f' ** No es valido. Ingresa un numero. **'
                return (False, mensaje)
        elif peso.replace('.', '', 1).isdigit() == True:
            if float(peso) > MAX_PESO:
                mensaje += f'** El peso ingresado no es valido. El peso maximo es {MAX_PESO} kg**'
                return (False, mensaje)
            elif float(peso) == 0:
                mensaje += f' ** El peso ingresado no es valido. Debe ser mayor a 0 kg **'
                return (False, mensaje)
            elif float(peso) < MAX_PESO:
                return (True, mensaje)
    
    def validar_destino(self, destino):
        mensaje = ''
        if ',' in destino:    
            mensaje = ' ** El destino no debe llevar comas (,) ** '
            return (False, mensaje)
        return (True, mensaje)


class Reclamos:
    def __init__(self):
        self.usuario = None
        self.titulo = None
        self.descripcion = None

    def cargar_reclamos(self, usuario, titulo, descripcion):
        self.usuario = usuario
        self.titulo = titulo
        self.descripcion = descripcion
    
    def imprimir_reclamo(self):
        print('\n\n* Reclamo *\n')
        print(f'-Titulo: {self.titulo}')
        print(f'-Descripcion: {self.descripcion}')
    
    def escribir_reclamo(self, usuario):
        titulo = input('Escriba el titulo del reclamo: ')
        descripcion = input('Describa el reclamo:\n')

        self.titulo = titulo
        self.descripcion = descripcion
        self.usuario = usuario
        

class Usuario:
    def __init__(self):
        self.nombre = None
        self.contrasena = None
        self.encomiendas_realizadas = []

    def crear_usuario(self, nombre, contrasena):
        resultado = self.validar_crear_usuario(nombre, contrasena)
        if resultado[0] == True:
            self.nombre = nombre
            self.contrasena = contrasena
            return resultado[1]
        elif resultado[0] == False:
            return resultado[1]

    def validar_crear_usuario(self, nombre_ingresado, contrasena_ingresada):
        mensaje_errores = ''
        min_c = MIN_CARACTERES
        lar = LARGO_CONTRASENA
        caracteres_alfabeticos = ''
        for letra in nombre_ingresado:
            if letra.isdigit() == False:
                caracteres_alfabeticos += letra
        if len(caracteres_alfabeticos) < min_c:
            mensaje_errores += f'** El nombre ingresado no cumple con {min_c} caracteres **\n'
        if len(contrasena_ingresada) < lar:
            mensaje_errores += f'** La contraseña no cumple con {lar} caracteres **\n'
            
        if mensaje_errores == '':
            return (True, '\nTodos los datos estan bien. Se agrego el usuario correctamente')
        return (False, mensaje_errores)

    def validar_contrasena(self, contrasena_ingresada):
        if contrasena_ingresada != self.contrasena:
            return False
        elif contrasena_ingresada == self.contrasena:
            return True
    
    def visualizar_encomiendas_realizadas(self):
        if len(self.encomiendas_realizadas) > 0:
            data = [['Nombre', 'Estado']]
            for encomienda in self.encomiendas_realizadas:
                data.append([encomienda.nombre, encomienda.estado])

            print(tabulate(data, headers='firstrow'))
        else:
            print('\nNo se han realizado encomiendas...')
    
    def visualizar_encomiendas_recibidas(self, encomiendas):
        if len(encomiendas) > 0:
            data = [['Nombre', 'Estado']]
            for encomienda in encomiendas:
                data.append([encomienda.nombre, encomienda.estado])

            print(tabulate(data, headers='firstrow'))

        else:
            print('\nNo se te ha enviado ninguna encomienda...')

    def ingresar_encomienda(self, encomienda):
        self.encomiendas_realizadas.append(encomienda)
    
    def ingresar_reclamo(self):
        reclamo = Reclamos()
        reclamo.escribir_reclamo(self)
        return reclamo

class Admin:
    def __init__(self):
        self._contrasena = CONTRASENA_ADMIN
    
    def validar_contrasena(self, contrasena_ingresada):
        if contrasena_ingresada != self._contrasena:
            return False
        elif contrasena_ingresada == self._contrasena:
            return True
