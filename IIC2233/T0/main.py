from cargar_datos import Datos
from datetime import datetime
from menus import ContinuarSalir, MenuEncomiendas, MenuInicio,\
     MenuUsuario, MenuAdmin, RepetirContrasena


class DCCorreos:
    def __init__(self) -> None:
        self.datos = None
        self.menus = []

    def iniciar(self):
        datos = Datos()
        datos.cargar_datos()
        menu_inicio = MenuInicio()
        menu_usuario = MenuUsuario()
        menu_admin = MenuAdmin()
        self.menus.extend((menu_inicio, menu_usuario, menu_admin))
        
        self.datos = datos
        print('\n--- Bienvenid@ a DCCorreos de Chile ---')
        self.flujo_menu_inicio()


    def flujo_menu_inicio(self):
        opcion = [0]

        while opcion[0] != 4:
            opcion = self.menus[0].desplegar_menu()

            if opcion[0] == 1:
                funcion = self.datos.ingresar(opcion[1])
                print(funcion[2])
                if funcion[0] == True:
                    usuario = funcion[1]
                    self.menus[1].ingresar_usuario(usuario)
                    self.flujo_menu_usuario()
                
            elif opcion[0] == 2:
                resultado = self.datos.crear_usuario(opcion[1][0], opcion[1][1])
                print(resultado[2])

                if resultado[0] == True:
                    self.menus[1].ingresar_usuario(resultado[1])
                    self.flujo_menu_usuario()

            elif opcion[0] == 3:
                self.ingreso_admin(opcion)
            
    def ingreso_admin(self, opcion):
        resultado = self.datos.ingresar_admin(opcion[1])
        if resultado == False:
            opcion_repetir = RepetirContrasena()
            decision = opcion_repetir.desplegar_menu()

            if decision[0] == 1:
                return self.ingreso_admin(decision)
            elif decision[0] == 2:
                pass
        
        elif resultado == True:
            self.flujo_menu_admin()

    def flujo_menu_usuario(self):
        opcion = [0]
        while opcion[0] != 5:
            opcion = self.menus[1].desplegar_menu()

            if opcion[0] == 1:
                encomienda = self.datos.instanciar_encomienda()
                self.validar_datos_encomienda(opcion[1], opcion[2], encomienda)

            elif opcion[0] == 3:
                self.datos.crear_reclamo(opcion[1])
            
            elif opcion[0] == 4:
                encomiendas_recibidas = self.datos.obtener_encomiendas(self.menus[1].usuario)
                self.menus[1].usuario.visualizar_encomiendas_recibidas(encomiendas_recibidas)

    def validar_datos_encomienda(self, respuesta, indice, encomienda):
        if indice == 0:#Nombre_articulo
            resultado = encomienda.validar_nombre(respuesta)
            if resultado[0] == True:
                encomienda.agregar_nombre(respuesta)
        elif  indice == 1:#destinatario
            resultado = self.datos.verificar_usuario_existe(respuesta)
            if resultado[0] == True:
                encomienda.agregar_receptor(respuesta)            
        elif indice == 2:#peso
            resultado = encomienda.validar_peso(respuesta)
            if resultado[0] == True:
                encomienda.agregar_peso(respuesta)
        elif indice == 3:#destino
            resultado = encomienda.validar_destino(respuesta)
            if resultado[0] == True:
                encomienda.agregar_destino(respuesta)
        
        if resultado[1] != '':
            print(resultado[1])
        
        if resultado[0] == True and indice < 3:
            prox = self.menus[1].enviar_datos(indice+1)
            return self.validar_datos_encomienda(prox[1], prox[2], encomienda)
        elif resultado[0] == True and indice == 3:
            dia = datetime.now()
            fecha = dia.strftime('%Y/%m/%d %H:%M:%S')
            encomienda.agregar_fecha(fecha)
            encomienda.agregar_estado('Emitida')
            encomienda = self.datos.crear_encomienda(encomienda, None)
            self.menus[1].usuario.encomiendas_realizadas.append(encomienda)
            print(f' ** {encomienda.nombre} fue registrada exitosamente **')
        elif resultado[0] == False:
            opcion = ContinuarSalir()
            print('\n-Desea:')
            decision = opcion.desplegar_menu()

            if decision[0] == 1:
                return self.validar_datos_encomienda(decision[1], indice, encomienda)

    def flujo_menu_admin(self):
        opcion = [0]
        while opcion[0] != 3:
            opcion = self.menus[2].desplegar_menu()

            if opcion[0] == 1:
                menu_encomiendas = MenuEncomiendas()
                menu_encomiendas.cargar_encomiendas(self.datos.encomiendas)
                encomiendas_actualizadas = menu_encomiendas.desplegar_menu()
                if encomiendas_actualizadas != None:
                    self.datos.encomiendas = encomiendas_actualizadas
                    self.datos.actualizar_encomiendas(encomiendas_actualizadas)

            elif opcion[0] == 2:
                reclamos = opcion[1]
                reclamos.cargar_reclamos(self.datos.reclamos)
                self.recurrencia_comentario(reclamos)
                
    def recurrencia_comentario(self, reclamos):
        print('\n-Seleccione un comentario para ver mas detalles:')
        resultado = reclamos.desplegar_menu()
                
        if resultado == True:
            return self.recurrencia_comentario(reclamos)
        

if __name__ == "__main__":
    dccorreos = DCCorreos()
    dccorreos.iniciar()