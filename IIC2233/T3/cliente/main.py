from sys import argv, exit
from PyQt5.QtWidgets import QApplication
from backend.cliente import Cliente
from get_info import get, data_json

if __name__ == "__main__":
    try:
        get()
        # Instanciamos la APP
        app = QApplication(argv)
        # Iniciamos el cliente
        cliente = Cliente(
            host = data_json("IP_HOST"),
            port = data_json("PORT")
            )

        exit(app.exec_())

    except ConnectionError as error:
        print("Ocurrió un error.", error)