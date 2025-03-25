from os.path import join
from get_info import data_json
from entidades import Jugador

class Logica:
    def __init__(self, parent):
        self.parent = parent
        self.usuarios = {}
        self.min_max_jugadores = [
            data_json("MINIMO_JUGADORES"),
            data_json("MAXIMO_JUGADORES")
            ]

    def procesar_mensaje(self, mensaje, socket_cliente):
        """
        Procesa un mensaje recibido desde el cliente
        """
        try:
            comando = mensaje["CMD"]
            if comando == "validar_nombre":
                respuesta = self.validar_nombre(mensaje["nombre usuario"], socket_cliente)
            if comando == "desconectar":
                self.eliminar_nombre(mensaje["id"])
                return None
            return respuesta
        except KeyError as error:
            return {}

    def validar_nombre(self, nombre, socket_cliente):
        jugador = Jugador(nombre)
        if jugador.validar_nombre(self.usuarios.values()):
            usuarios = ",".join(self.usuarios.values())
            jugador.obtener_rol(self.parent.id_cliente -1)
            self.usuarios[self.parent.id_cliente -1] = jugador.nombre

            return {
                "CMD": "respuesta_validacion_nombre",
                "estado": True,
                "jugador": jugador,
                "usuarios": self.usuarios,
                "log": [
                    f"Cliente {self.parent.id_cliente -1}",
                    "Ingreso nombre correctamente",
                    jugador.nombre]
            }
        return {
            "CMD": "respuesta_validacion_nombre",
            "estado": False,
            "error": "Datos invalidos",
            "log": [
                    f"Cliente {self.parent.id_cliente -1}",
                    "Ingreso nombre incorrectamente",
                    jugador.nombre]
        }

    def eliminar_nombre(self, id):
        """
        Elimina el nombre del usuario del diccionario
        """
        self.usuarios.pop(id, None)