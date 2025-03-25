from simulacion import Simulacion
from parametros import DEUDA_TOTAL, PROBABILIDAD_EVENTO


if __name__ == "__main__":
    dccasino = Simulacion(
        deuda= DEUDA_TOTAL,
        probabilidad= PROBABILIDAD_EVENTO
        )
    
    dccasino.iniciar()