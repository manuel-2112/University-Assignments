from socket import socket, AF_INET, SOCK_STREAM
from threading import Thread
from backend.interfaz import Interfaz
from backend.entidades import Mensaje

class Cliente:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.socket_cliente = socket(AF_INET, SOCK_STREAM)
        self.interfaz = Interfaz(self)
        self.conectado = False
        self.iniciar_cliente()

    def iniciar_cliente(self):
        try:
            self.socket_cliente.connect((self.host, self.port))
            self.conectado = True
            self.comenzar_a_escuchar()
            self.interfaz.iniciar()

        except (ConnectionError, ConnectionRefusedError) as error:
            print(f"ERROR: No se pudo conectar al servidor. {error}")
            
    def comenzar_a_escuchar(self):
        thread = Thread(target=self.escuchar_servidor)
        #thread = Thread(target=self.escuchar_servidor, daemon=True)
        thread.start()

    def escuchar_servidor(self):
        try:
            while self.conectado:
                mensaje = self.recibir()
                if mensaje != None:
                    self.interfaz.manejar_mensaje(mensaje)
        except ConnectionError as error:
            print("ERROR: El servidor se ha desconectado.", error)

    def recibir(self):
        cantidad_bloques_bytes = self.socket_cliente.recv(4)
        cantidad_bloques = int.from_bytes(cantidad_bloques_bytes, byteorder='little')
        
        bytes_mensaje = bytearray()
        for _ in range(cantidad_bloques):
            n_bloque_bytes = self.socket_cliente.recv(4)
            #n_bloque = int.from_bytes(n_bloque_bytes, byteorder='big')
            lleno = self.socket_cliente.recv(1)
            byte_capacidad = self.socket_cliente.recv(1)
            capacidad = int.from_bytes(byte_capacidad, byteorder='big')
            bytes_mensaje += self.socket_cliente.recv(capacidad)
        
        # Decodificar mensaje
        mensaje = self.decodificar_mensaje(bytes_mensaje)
        return mensaje

    def enviar(self, mensaje):
        # Codificar mensaje
        bytes_mensaje = self.codificar_mensaje(mensaje)
        # Enviar mensaje
        self.socket_cliente.sendall(bytes_mensaje)

    def codificar_mensaje(self, contenido):
        mensaje = Mensaje().codificacion(contenido)
        return mensaje

    def decodificar_mensaje(self, bytes_mensaje):
        contenido = Mensaje().decodificacion(bytes_mensaje)
        return contenido