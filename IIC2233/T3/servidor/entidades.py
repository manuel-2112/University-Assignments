from pickle import loads, dumps

class Mensaje:

    def codificacion(self, contenido):
        mensaje_serializado = dumps(contenido)
        mensaje = Mensaje.__encriptacion(mensaje_serializado)
        bloques_mensaje = []
        n_bloque = 0
        for byte in range(0, len(mensaje), 20):
            bloques_mensaje.append((n_bloque).to_bytes(4, byteorder='big'))
            if byte+20 > len(mensaje):
                bloque = b'\x00'
                bloque += (len(mensaje)-byte).to_bytes(1, byteorder='big')
                bloque += mensaje[byte:len(mensaje)]
            else:
                bloque = b'\x01'
                bloque += (20).to_bytes(1, byteorder='big')
                bloque += mensaje[byte:byte+20]
            bloques_mensaje.append(bloque)
            n_bloque += 1
        cantidad_bloques = (len(bloques_mensaje)//2).to_bytes(4, byteorder='little')
        bloques_mensaje.insert(0, cantidad_bloques)

        return b''.join(bloques_mensaje)

    def decodificacion(self, bytes_contenido:bytearray):
        bytes_mensaje = self.__desencriptacion(bytes_contenido)
        mensaje = loads(bytes_mensaje)
        return mensaje

    def __encriptacion(mensaje_serializado):
        grupos = {"A": bytearray(), "B": bytearray()}
        bits_centrales = {"A": [], "B": []}
        iteraciones = 0
        byte_count = 0
        grupos_a = 0
        grupos_b = 0
        while byte_count < len(mensaje_serializado):
            if iteraciones == 0:
                grupos["A"] += mensaje_serializado[byte_count:byte_count+1]
                byte_count += 1
                grupos_a += 1
            elif iteraciones == 1:
                grupos["B"] += mensaje_serializado[byte_count:byte_count+1]
                byte_count += 1
                grupos_b += 1
            elif iteraciones == 2:
                grupos["A"] += mensaje_serializado[byte_count:byte_count+2]
                byte_count += 2                
            elif iteraciones == 3:
                grupos["B"] += mensaje_serializado[byte_count:byte_count+2]
                byte_count += 2
                iteraciones = -1
            iteraciones += 1

        for key, value in grupos.items():
            largo = len(value)
            for bit in value[largo//2-1:largo//2+2]:
                if largo % 2 == 0 and len(bits_centrales[key]) == 2:
                    bits_centrales[key].insert(0, bits_centrales[key][1])
                else:
                    bits_centrales[key].append(bit)
            bits_centrales[key] = bits_centrales[key][1] + \
                (bits_centrales[key][0] + bits_centrales[key][2])/2

        if bits_centrales["A"] <= bits_centrales["B"]:
            resultado = b'\x01' + grupos["A"] + grupos["B"]
        if bits_centrales["A"] > bits_centrales["B"]:
            resultado = b'\x00' + grupos["B"] + grupos["A"]
        
        return resultado

    def __desencriptacion(self, bytes_mensaje):
        forma = bytes_mensaje[0]
        bytes_mensaje = bytes_mensaje[1:]
        cantidad_bytes = len(bytes_mensaje)
        iteraciones = 0
        byte_count = 0
        n_grupos_a = 0
        n_grupos_b = 0
        while byte_count < cantidad_bytes:
            if iteraciones == 0:
                byte_count += 1
                n_grupos_a += 1
            elif iteraciones == 1:
                byte_count += 1
                n_grupos_b += 1
            elif iteraciones == 2:
                byte_count += 2                
            elif iteraciones == 3:
                byte_count += 2
                iteraciones = -1
            iteraciones += 1
        cantidad_subgrupos = n_grupos_a + n_grupos_b
        bytes_finales = cantidad_bytes - 3*(n_grupos_a-1 + n_grupos_b-1)        
        dic_bytes_finales = {2: (1,1), 3: (2,1), 4: (3,1), 5:(3,2), 6:(3,3)}
        recorrido = {0: [n_grupos_b, cantidad_subgrupos], 1: [n_grupos_a, cantidad_subgrupos]}
        subgrupos = {"A": [], "B": []}

        for i in range(1, cantidad_subgrupos+1):
            if i < recorrido[forma][0]:
                subgrupos["A"].append(bytes_mensaje[:3])
                bytes_mensaje = bytes_mensaje[3:]
            elif i == recorrido[forma][0]:
                subgrupos["A"].append(bytes_mensaje[:dic_bytes_finales[bytes_finales][0]])
                bytes_mensaje = bytes_mensaje[dic_bytes_finales[bytes_finales][0]:]
            elif i < recorrido[forma][1]:
                subgrupos["B"].append(bytes_mensaje[:3])
                bytes_mensaje = bytes_mensaje[3:]
            elif i == recorrido[forma][1]:
                subgrupos["B"].append(bytes_mensaje[:dic_bytes_finales[bytes_finales][1]])
                bytes_mensaje = bytes_mensaje[dic_bytes_finales[bytes_finales][1]:]
        
        orden = {6:(0,2,3,1,4,5), 5:(0,2,3,1,4,5), 4:(0,2,3,1), 3:(0,2,1), 2:(0,1)}
        lista_mensaje_ordenado = []
        for grupo in range(n_grupos_a):
            if grupo == n_grupos_a-1 and n_grupos_a > n_grupos_b:
                byte_aux = subgrupos["A"][grupo]
            else:
                byte_aux = subgrupos["A"][grupo] + subgrupos["B"][grupo]
            lista_aux = [None, None, None, None, None, None]
            for i in range(len(byte_aux)): #0->5
                lista_aux[orden[len(byte_aux)][i]] = (byte_aux[i]).to_bytes(1, 'big')
            lista_mensaje_ordenado.extend(lista_aux)
        
        return b''.join(list(filter(None, lista_mensaje_ordenado)))

class Jugador:
    
    def __init__(self, nombre):
        self.nombre = nombre

    def validar_nombre(self, usuarios):
        if 1 <= len(self.nombre) <= 10 and self.nombre.isalnum() and \
            self.nombre not in usuarios:
            return True
        else:
            return False
    
    def obtener_rol(self, id_):
        if id_ == 0:
            rol = "admin"
        else:
            rol = "jugador"
        self.rol = rol

"""
if __name__ == "__main__":
    mensaje = {'CMD': 'validar_nombre', 'nombre usuario': 'manuel'}
    bytes_contenido = Mensaje().codificacion(mensaje)
    cantidad_bloques_bytes = bytes_contenido[0:4]
    cantidad_bloques = int.from_bytes(cantidad_bloques_bytes, byteorder='little')    
    # Decodificacion
    n = 4
    bytes_mensaje = b''
    for i in range(cantidad_bloques):
        n_bloque_bytes = bytes_contenido[n:n+4]
        n += 4
        lleno = bytes_contenido[n]
        n += 1
        capacidad = bytes_contenido[n]
        n += 1
        bytes_mensaje += bytes_contenido[n:n+20]
        n += 20
    
    mensaje_desencriptado = Mensaje().decodificacion(bytes_mensaje)
    print(mensaje_desencriptado)
"""