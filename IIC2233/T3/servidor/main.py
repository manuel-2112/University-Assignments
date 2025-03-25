from get_info import get, data_json
from servidor import Servidor

if __name__ == "__main__":
    get()
    servidor = Servidor(
        host = data_json("IP_HOST"),
        port = data_json("PORT")
        )
