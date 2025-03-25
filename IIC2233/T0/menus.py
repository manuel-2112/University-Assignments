from tabulate import tabulate

class Menu:
    def __init__(self):
        self.nombre = ''
        self.opciones = []
        self.acciones = []

    def desplegar_menu(self):
        print('\n')
        if self.nombre != '':
            print(f'** {self.nombre} **\n')

        for i in range(len(self.opciones)):
            print(f"[{i+1}] {self.opciones[i]}")
        
        return self.elegir_opcion()

    def elegir_opcion(self):
        opcion = input('\nIndique su opción: ')
        if opcion.isdigit() and 1 <= int(opcion) <= len(self.opciones):
            if len(self.opciones) == len(self.acciones):
                return self.acciones[int(opcion)-1]()
            elif len(self.acciones) == 1:
                return self.acciones[0](int(opcion)-1)
            elif len(self.acciones) == 3:
                if int(opcion) < len(self.opciones):
                    return self.acciones[0](int(opcion)-1)
                elif int(opcion) == len(self.opciones):
                    return self.acciones[1]()
            
        else:
            print('¡Lo siento! Esa opcion no existe, intentalo de nuevo')
            return self.elegir_opcion()
                


class MenuInicio(Menu):
    def __init__(self):
        self.nombre = 'Menu de Inicio'
        self.opciones = [
            'Iniciar sesión como usuario',
            'Registrarse como usuario',
            'Iniciar sesión como administrador',
            'Salir del programa'
        ]
        self.acciones = [
            self.iniciar_sesion_usuario,
            self.registrarse,
            self.iniciar_sesion_adm,
            self.salir
        ]

    def iniciar_sesion_usuario(self):
        print('\n-Ingresar sesión:')
        nombre_usuario = input('Nombre de usuario:: ')
        contrasena_usuario = input('Contraseña:: ')

        return (1, (nombre_usuario, contrasena_usuario))
        
    def registrarse(self):
        print('\n-Crear cuenta:')
        nombre_usuario = input('Nombre de usuario:: ')
        contrasena_usuario = input('Contraseña:: ')

        return (2, (nombre_usuario, contrasena_usuario))


    def iniciar_sesion_adm(self):
        print('\n-Ingresar sesión como Administrador:')
        contrasena_admin = input('Contraseña ADMIN:: ')

        return (3, contrasena_admin)

    def salir(self):
        print("\n ** Gracias por ingresar! ** \n")
        return (4, None)


class MenuUsuario(Menu):
    def __init__(self):
        self.nombre = 'Menu de Usuario'
        self.usuario = None
        self.opciones = [
            'Hacer encomienda',
            'Revisar estado de encomiendas realizadas',
            'Realizar reclamos',
            'Ver el estado de los pedidos personales',
            'Cerrar sesión'
        ]
        self.acciones = [
            self.hacer_encomienda,
            self.revisar_estado_encomiendas,
            self.realizar_reclamos,
            self.ver_estado_pedidos,
            self.cerrar_sesion
        ]
    
    def ingresar_usuario(self, usuario):
        self.usuario = usuario

    def hacer_encomienda(self):
        print('\n-Ingresa los datos de tu encomienda a continuacion:')
        return self.enviar_datos(0)
    
    def enviar_datos(self, indice):
        funciones = [
            self.recibir_nombre_articulo, self.recibir_destinatario,
            self.recibir_peso, self.recibir_destino
            ]
        respuesta = funciones[indice]()
        return (1, respuesta, indice)


    def recibir_nombre_articulo(self):
        nombre_articulo = input('Nombre del artículo: ')        
        return nombre_articulo

    def recibir_destinatario(self):
        destinatario = input('Nombre del destinatario: ')        
        return destinatario
    
    def recibir_peso(self):
        peso = input('Peso (kg): ')
        return peso

    def recibir_destino(self):
        destino = input('Nombre del destino: ')        
        return destino

    def revisar_estado_encomiendas(self):
        print(f'\n-Estado encomiendas realizadas por {self.usuario.nombre}:\n')
        self.usuario.visualizar_encomiendas_realizadas()
        return (2, None)

    def realizar_reclamos(self):
        print('\n-Realizar un reclamo:')
        print(f'Autor:  {self.usuario.nombre}')
        reclamo = self.usuario.ingresar_reclamo()
        return (3, reclamo)

    def ver_estado_pedidos(self):
        print(f'\n-Estado de pedidos para {self.usuario.nombre}:\n')
        return (4, None)

    def cerrar_sesion(self):
        print(f'\n** Se ha cerrado la sesion de {self.usuario.nombre} **')
        self.usuario = None
        return (5, None)


class MenuAdmin(Menu):
    def __init__(self):
        self.nombre = 'Menu de Administrador'
        self.opciones = [
            'Actualizar encomiendas',
            'Revisar reclamos',
            'Cerrar sesión'
        ]
        self.acciones = [
            self.actualizar_encomiendas,
            self.revisar_reclamos,
            self.cerrar_sesion
        ]
    
    def actualizar_encomiendas(self):
        return (1, None)


    def revisar_reclamos(self):
        reclamos = MenuReclamos()
        return (2, reclamos)


    def cerrar_sesion(self):
        print(f'\n** Se ha cerrado la sesion de Administrador **')
        return (3, None)

class RepetirContrasena(Menu):
    def __init__(self):
        self.nombre = ''
        self.opciones = [
            'Repetir Contraseña',
            'Volver'
        ]
        self.acciones = [
            self.repetir_contrasena,
            self.volver
        ]

    def repetir_contrasena(self):
        print('\n-Repetir contraseña:')
        contrasena_admin = input('Contraseña ADMIN:: ')
        return (1, contrasena_admin)

    def volver(self):
        print('\n-Volviendo al Menu de Inicio...')
        return (2, None)

class ContinuarSalir(Menu):
    def __init__(self):
        self.nombre = ''
        self.opciones = [
            'Continuar',
            'Salir'
        ]
        self.acciones = [
            self.continuar,
            self.salir
        ]

    def continuar(self):
        dato = input('\nIngrese nuevamente el dato: ')
        return (1, dato)
    
    def salir(self):
        print('\n ** Volviendo a Menu de Usuario ** ')
        return (2, None)

class MenuReclamos(Menu):
    def __init__(self):
        self.nombre = ''
        self.opciones = []
        self.acciones = [self.visualizar_comentario]
        self.reclamos = []

    def cargar_reclamos(self, reclamos):
        for reclamo in reclamos:
            self.opciones.append(reclamo.titulo)
            self.reclamos.append(reclamo)

    def visualizar_comentario(self, indice):
        print(f'\nTitulo: {self.reclamos[indice].titulo}')
        print(f'Autor: {self.reclamos[indice].usuario}')
        print('\nDescripcion:')
        print('     ' + self.reclamos[indice].descripcion)
        opcion = Seguir()
        print('\n-Desea:')
        return opcion.desplegar_menu()
        

class Seguir(Menu):
    def __init__(self):
        self.nombre = ''
        self.opciones = [
            'Visualizar otro comentario',
            'Volver al Menu'
        ]
        self.acciones = [
            self.visualizar_otro_comentario,
            self.volver
        ]

    def visualizar_otro_comentario(self):
        return True
    
    def volver(self):
        return False

class MenuEncomiendas(Menu):
    def __init__(self):
        self.nombre = ''
        self.opciones = []
        self.acciones = [self.cambiar_estado, self.volver, None]
    
    def cargar_encomiendas(self, encomiendas):
        for encomienda in encomiendas:
            self.opciones.append(encomienda)
        self.opciones.append('Volver')

    def desplegar_menu(self):        
        if len(self.opciones) > 0:
            data = [
                [' ', 'Nombre articulo', 'Receptor', 'Peso',
                'Destino', 'Fecha de emision','Estado']
                ]
            for i in range(len(self.opciones)-1):
                encomienda = self.opciones[i]
                data.append([f'[{i+1}]',
                    encomienda.nombre, encomienda.receptor,
                    encomienda.peso, encomienda.destino,
                    encomienda.fecha, encomienda.estado
                    ])

            print('\n ** Encomiendas registradas **\n')
            print(tabulate(data, headers='firstrow'))

        else:
            print('\nNo se han realizado encomiendas...')

        print(f'\n[{len(self.opciones)}] Volver')
        
        return self.elegir_opcion()

    def cambiar_estado(self, indice):
        estados = ['Emitida', 'Revisada por agencia', 'En camino', 'Llegada al destino']
        n_estado_encomienda = estados.index(self.opciones[indice].estado) + 1
        
        if n_estado_encomienda < 4:
            self.opciones[indice].estado = estados[n_estado_encomienda]
            print(f'\n** Se ha actualizado el estado de {self.opciones[indice].nombre} de: **')
            print(f'{estados[n_estado_encomienda-1]}  >>> {self.opciones[indice].estado}')

        elif n_estado_encomienda == 4:
            print(f' ** {self.opciones[indice].nombre} ya llego a destino **')

        return self.opciones[:-1]

    def volver(self):
        print('\n ** Volviendo al Menu de Administrador... **')