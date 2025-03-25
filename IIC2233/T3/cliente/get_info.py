from socket import gethostbyname, gethostname
from json import dump, load
from os.path import join

def get():
    info = {
    "NAME_HOST": gethostname(),
    "IP_HOST": gethostbyname(gethostname()),
    "PORT": 8080,
    "RUTA_VENTANA_INICIO": ["frontend", "UI files", "VentanaInicio.ui"],
    "RUTA_VENTANA_ESPERA": ["frontend", "UI files", "VentanaEspera.ui"],
    "RUTA_VENTANA_JUEGO": ["frontend", "UI files", "VentanaJuego.ui"],
    }

    with open("parametros.json", "w", encoding="UTF-8") as archivo:
        dump(info, archivo, indent=4)

def data_json(llave):
    ruta = join("parametros.json")
    with open(ruta, "r", encoding="UTF-8") as archivo:
        diccionario_data = load(archivo)
    valor = diccionario_data[llave]
    return valor