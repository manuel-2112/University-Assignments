from entidades import Admin, Encomiendas, Usuario, Reclamos
from parametros import RUTA_ENCOMIENDAS, RUTA_RECLAMOS, RUTA_USUARIOS

class Datos:

    def __init__(self):
        self.encomiendas = None
        self.usuarios = None
        self.reclamos = None
        self.admin = None
        self.rutas = [RUTA_ENCOMIENDAS, RUTA_RECLAMOS, RUTA_USUARIOS]

    def cargar_datos(self):
        self.cargar_encomiendas(self.rutas[0])
        self.cargar_reclamos(self.rutas[1])
        self.cargar_usuarios(self.rutas[2])
        self.admin = Admin()

    def cargar_encomiendas(self, ruta):
        encomiendas = []
        with open(ruta, "r", encoding='utf-8') as archivo:
            for linea in archivo.readlines()[1:]:
                linea = linea.strip().split(",")
                #nombre ,receptor ,peso, destino, fecha, estado
                encomienda = Encomiendas()
                encomienda.crear_encomienda(
                    linea[0], linea[1], linea[2],
                    linea[3], linea[4], linea[5]
                    )
                encomiendas.append(encomienda)
        
        self.encomiendas = encomiendas

    def cargar_usuarios(self, ruta):
        usuarios = []
        with open(ruta, "r", encoding='utf-8') as archivo:
            for linea in archivo.readlines()[1:]:
                linea = linea.strip().split(",")
                #usuario, contrasena
                usuario = Usuario()
                usuario.crear_usuario(
                    linea[0], linea[1]
                    )
                usuarios.append(usuario)

        self.usuarios = usuarios

    def cargar_reclamos(self, ruta):
        reclamos = []
        with open(ruta, "r", encoding='utf-8') as archivo:
            for linea in archivo.readlines()[1:]:
                linea = linea.strip().split(",", maxsplit=3)
                #usuario,titulo,descripcion
                reclamo = Reclamos()
                reclamo.cargar_reclamos(
                    linea[0], linea[1], linea[2]
                    )
                reclamos.append(reclamo)

        self.reclamos = reclamos

    def actualizar_reclamos(self, usuario, titulo, descripcion):
        with open(self.ruta[1], mode='a', encoding='utf-8') as archivo:
            archivo.write(f'\n{usuario},{titulo},{descripcion}')
        reclamo = Reclamos()
        reclamo.cargar_reclamos(usuario, titulo, descripcion)
        self.reclamos.append(reclamo)

        return 'El reclamo fue recibido correctamente'

    def crear_usuario(self, nombre, contrasena):
        usuario_a_agregar = Usuario()
        resultado = usuario_a_agregar.crear_usuario(nombre, contrasena)
        condicion = False

        if resultado == '\nTodos los datos estan bien. Se agrego el usuario correctamente':
            condicion = True
            for usuario in self.usuarios:
                if usuario.nombre == nombre:
                    condicion = False
                    resultado = '**Lo siento! Ese nombre ya esta utilizado...**'
            
            if condicion == True:
                with open(self.rutas[2], mode='a', encoding='utf-8') as archivo:
                    archivo.write(f'\n{nombre},{contrasena}')
                self.usuarios.append(usuario_a_agregar)
                resultado += f'\nBienvenido {nombre}'

        return (condicion, usuario_a_agregar, resultado)

    def instanciar_encomienda(self):
        encomienda = Encomiendas()
        return encomienda

    def crear_encomienda(self, encomienda_a_agregar, datos):
        if datos != None:
            encomienda_a_agregar.crear_encomienda(
                datos[0], datos[1], datos[2],
                datos[3], datos[4], datos[5]
            )
        self.encomiendas.append(encomienda_a_agregar)
        mensaje = f'\n{encomienda_a_agregar.nombre},{encomienda_a_agregar.receptor},'
        mensaje += f'{encomienda_a_agregar.peso},{encomienda_a_agregar.destino},'
        mensaje += f'{encomienda_a_agregar.fecha},{encomienda_a_agregar.estado}'
        
        with open(self.rutas[0], mode='a', encoding='utf-8') as archivo:
            archivo.write(mensaje)

        return encomienda_a_agregar
    
    def actualizar_encomiendas(self, encomiendas):
        mensaje = 'nombre_articulo,receptor,peso,destino,fecha,estado'
        for encomienda in encomiendas:
            mensaje += f'\n{encomienda.nombre},{encomienda.receptor},{encomienda.peso},'
            mensaje += f'{encomienda.destino},{encomienda.fecha},{encomienda.estado}'
        
        with open(self.rutas[0], mode='w', encoding='utf-8') as archivo:
            archivo.write(mensaje)

    
    def crear_reclamo(self, reclamo):
        with open(self.rutas[1], mode='a', encoding='utf-8') as archivo:
            archivo.write(
                f'\n{reclamo.usuario.nombre},{reclamo.titulo},{reclamo.descripcion}'
                )
        print(' ** Se registro el reclamo con exito **')
        self.reclamos.append(reclamo)
    
    def obtener_encomiendas(self, usuario):
        encomiendas = []
        for encomienda in self.encomiendas:
            if encomienda.receptor == usuario.nombre:
                encomiendas.append(encomienda)
        
        return encomiendas

    def ingresar(self, datos_usuario):
        nombre = False
        contrasena = False
        estado = False
        usuario_ingresando = None
        for usuario in self.usuarios:
            if datos_usuario[0] == usuario.nombre:
                nombre = True
            if datos_usuario[1] == usuario.contrasena:
                contrasena = True
            if datos_usuario == (usuario.nombre, usuario.contrasena):
                usuario_ingresando = usuario
                
        if usuario_ingresando != None:
            mensaje = f'\nBienvenido {usuario_ingresando.nombre}'
            estado = True
        elif nombre == True and contrasena == True and usuario_ingresando == None:
            mensaje = '\nNo coinciden el usuario y la contraseña ingresados...\
                \nIntentelo nuevamente'
        elif nombre == True and contrasena == False:
            mensaje = '\nLa contraseña es incorrecta...\nIntentelo nuevamente'
        elif nombre == False and contrasena == True:
            mensaje = '\nEl nombre de usuario es incorrecto...\nIntentelo nuevamente'
        else:
            mensaje = '\nEl nombre de usuario y la contraseña son incorrectos...\
                \nIntentelo nuevamente'
        
        return (estado, usuario_ingresando, mensaje)

    def ingresar_admin(self, contrasena_admin):
        resultado = self.admin.validar_contrasena(contrasena_admin)
        if resultado == False:
            print('\nContraseña incorrecta...')
            print('Puede intentarlo nuevamente')
            return False
        return True

    def verificar_usuario_existe(self, nombre_usuario):
        mensaje = ''
        for usuario in self.usuarios:    
            if nombre_usuario == usuario.nombre:
                return (True, mensaje)
        
        mensaje += f' ** {nombre_usuario} no existe. Ingrese un destinatario valido ** '
        return (False, mensaje)