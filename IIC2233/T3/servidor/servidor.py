from socket import socket, AF_INET, SOCK_STREAM
from threading import Thread
from entidades import Mensaje
from logica import Logica

class Servidor:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.socket_servidor = None
        self.logica = Logica(self)
        self.conectado = False
        self.id_cliente = 0
        self.table = '{:<30}|{:<30}|{:<30}'
        self.iniciar_log()
        self.iniciar_servidor()
        self.log(['-', "Iniciando servidor", "-"])

    def iniciar_servidor(self):
        self.socket_servidor = socket(AF_INET, SOCK_STREAM)
        # Enlazar socket
        self.socket_servidor.bind((self.host, self.port))
        # Comenzar a escuchar
        self.socket_servidor.listen(4)
        # Cambia el estado de conectado a True
        self.conectado = True
        self.log(['-', "Servidor escuchando", f"{self.host}:{self.port}"])
        self.comenzar_a_aceptar()

    def comenzar_a_aceptar(self):
        #thread = Thread(target=self.aceptar_clientes, daemon=True)
        thread = Thread(target=self.aceptar_clientes)
        thread.start()

    def aceptar_clientes(self):
        while self.conectado:
            try:
                # Aceptar cliente
                socket_cliente, direccion = self.socket_servidor.accept()
                self.log(['-', "Dirección aceptada", str(direccion)])
                # Crear y empezar thread para escuchar al cliente
                thread_cliente = Thread(
                    target=self.escuchar_cliente,
                    args=(self.id_cliente, socket_cliente),
                    daemon=True,
                )
                thread_cliente.start()
                self.id_cliente += 1

            except ConnectionError as error:
                self.log(['-', "Error de conexión",error])

    def escuchar_cliente(self, id_cliente, socket_cliente):
        self.log([f"Cliente {id_cliente}", 'Escuchando', "-"])
        try:
            while self.conectado:
                mensaje = self.recibir_mensaje(socket_cliente)
                if not mensaje:
                    raise ConnectionResetError
                
                respuesta = self.logica.procesar_mensaje(mensaje, socket_cliente)
                if respuesta != None:
                    self.log(respuesta["log"])
                    self.enviar_mensaje(respuesta, socket_cliente)
        
        except ConnectionError as error:
            self.log([f"Cliente {id_cliente}", "Error al escuchar cliente", error])
            self.eliminar_cliente(id_cliente, socket_cliente)

    def recibir_mensaje(self, socket_cliente):
        cantidad_bloques_bytes = socket_cliente.recv(4)
        cantidad_bloques = int.from_bytes(cantidad_bloques_bytes, byteorder='little')
        
        bytes_mensaje = bytearray()
        for _ in range(cantidad_bloques):
            n_bloque_bytes = socket_cliente.recv(4)
            #n_bloque = int.from_bytes(n_bloque_bytes, byteorder='big')
            lleno = socket_cliente.recv(1)
            byte_capacidad = socket_cliente.recv(1)
            capacidad = int.from_bytes(byte_capacidad, byteorder='big')
            bytes_mensaje += socket_cliente.recv(capacidad)

        # Decodificar mensaje
        mensaje = self.decodificar_mensaje(bytes_mensaje)
        return mensaje

    def enviar_mensaje(self, mensaje, socket_cliente):
        # Codificar mensaje
        bytes_mensaje = self.codificar_mensaje(mensaje)
        # Enviar mensaje
        socket_cliente.sendall(bytes_mensaje)

    def eliminar_cliente(self, id_cliente, socket_cliente):
        try:
            # Cerramos el socket
            self.log([f"Cliente {id_cliente}", "Eliminando", "Borrando socket"])
            socket_cliente.close()
            # Desconectamos el usuario de la lista de jugadores
            self.logica.procesar_mensaje(
                {"CMD": "desconectar", "id": id_cliente}, socket_cliente
            )

        except KeyError as error:
            self.log(["-", "Error al borrar cliente", error])

    def codificar_mensaje(self, contenido):
        mensaje = Mensaje().codificacion(contenido)
        return mensaje

    def decodificar_mensaje(self, bytes_mensaje):
        contenido = Mensaje().decodificacion(bytes_mensaje)
        return contenido
        
    def iniciar_log(self):
        table_headers = ['Cliente'.center(30), 'Evento'.center(30), 'Detalles'.center(30)]
        print('\n')
        print(self.table.format(*table_headers))
        print(self.table.replace(':', ':=').format('', '', ''))

    def log(self, mensaje:list):
        mensaje = [str(i)[:30].center(30) for i in mensaje]
        print(self.table.format(*mensaje))
        print(self.table.replace(':', ':-').format('', '', ''))