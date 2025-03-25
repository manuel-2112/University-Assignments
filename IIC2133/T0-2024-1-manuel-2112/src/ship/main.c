#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "planet.h"
#include "ship.h"
#include "order.h"

/* Parte 1 */
#define COMMAND_REGISTER "REGISTRAR-PEDIDO"
#define COMMAND_REPORT_SHIP "REPORTE-NAVE"
#define COMMAND_REPORT_ORDERS "REPORTE-PEDIDOS"

/* Parte 2 */
#define COMMAND_CONTAMINATED_ORDER "PEDIDO-CONTAMINADO"
#define COMMAND_DELIVER_ORDERS "ENTREGAR-PEDIDOS"
#define COMMAND_REPORT_PLANETS "REPORTE-PLANETAS"
#define COMMAND_AFTER_MAX "TOMAR-DESPUES-MAX"

/* Parte 3 */
#define COMMAND_INVERSE "INVERSO"
#define COMMAND_COORDINATE_ORDERS "COORDINAR-PEDIDOS"

void registerOrder(int orderID, int shipID, int planetID, Ship* ships, FILE* output_file);
void reportShip(int shipID, Ship* ships, FILE* output_file);
void reportOrders(Ship* ships, int N_NAVES, FILE* output_file);
void freeMemory(Ship* ships, int N_NAVES);
void processEvent(char* command, FILE* input_file, Ship* ships, int N_NAVES, Planet* planets, int N_PLANETAS, FILE* output_file);
void processRegisterOrder(FILE* input_file, Ship* ships, FILE* output_file);
void processReportShip(FILE* input_file, Ship* ships, int N_NAVES, FILE* output_file);
void removeContaminatedOrder(int shipID, int orderID, Ship* ships, FILE* output_file);
void processContaminatedOrder(FILE* input_file, Ship* ships, FILE* output_file);
void deliverOrders(Ship* ships, int N_NAVES, Planet* planets, int N_PLANETAS, FILE* output_file);
void deliverOrderForShip(Ship* ship, Planet* planets, int N_PLANETAS, FILE* output_file, bool* hasDeliveredAnyOrder);
void reportPlanetOrders(Ship* ships, int N_PLANETAS, Planet* planets, FILE* output_file);
void reverseOrdersForShip(int shipID, Ship* ships);
void processInverseCommand(FILE* input_file, Ship* ships, int N_NAVES, FILE* output_file);
void transferOrdersBetweenShips(Ship* ships, int ship1ID, int ship2ID, int planetID, FILE* output_file);
int countOrdersForPlanet(Order* head, int planetID);
void processCoordinateOrdersCommand(FILE* input_file, Ship* ships, int N_NAVES, FILE* output_file);

/* Retorna true si ambos strings son iguales */
static bool string_equals(char *string1, char *string2) {
    return !strcmp(string1, string2);
}

static bool check_arguments(int argc, char **argv) {
    if (argc != 3) {
        printf("Modo de uso: %s INPUT OUTPUT\n", argv[0]);
        printf("Donde:\n");
        printf("\tINPUT es la ruta del archivo de input\n");
        printf("\tOUTPUT es la ruta del archivo de output\n");
        exit(1);
    }
    return true;
}

void registerOrder(int orderID, int shipID, int planetID, Ship* ships, FILE* output_file) {
    Order* newOrder = (Order*)malloc(sizeof(Order));
    newOrder->id = orderID;
    newOrder->planet_id = planetID;
    newOrder->next = NULL;

    if (shipID >= 0) {
        Order** lastOrder = &(ships[shipID].orders_head);
        while (*lastOrder != NULL) {
            lastOrder = &((*lastOrder)->next);
        }
        *lastOrder = newOrder;
        fprintf(output_file, "REGISTRADO PEDIDO %d\n", orderID);
    } else {
        free(newOrder);
    }
}

void reportShip(int shipID, Ship* ships, FILE* output_file) {
    Order* order = ships[shipID].orders_head;
    int count = 0;
    while (order) {
        count++;
        order = order->next;
    }
    if (count > 0) {
        fprintf(output_file, "PEDIDOS %d PENDIENTES: %d\n", shipID, count);
    } else {
        fprintf(output_file, "LA NAVE %d NO TIENE PEDIDOS PENDIENTES\n", shipID);
    }
}

void reportOrders(Ship* ships, int N_NAVES, FILE* output_file) {
    fprintf(output_file, "REPORTE-PEDIDOS\n");
    int totalOrders = 0;
    for (int i = 0; i < N_NAVES; i++) {
        Order* order = ships[i].orders_head;
        if (order != NULL) {
            fprintf(output_file, "    NAVE %d\n", i);
            while (order) {
                fprintf(output_file, "        PEDIDO %d CON PLANETA %d\n", order->id, order->planet_id);
                order = order->next;
                totalOrders++;
            }
        }
    }
    fprintf(output_file, "TOTAL DE PEDIDOS: %d\n", totalOrders);
}

void processRegisterOrder(FILE* input_file, Ship* ships, FILE* output_file) {
    int orderID, shipID, planetID;
    fscanf(input_file, "%d %d %d", &orderID, &shipID, &planetID);
    registerOrder(orderID, shipID, planetID, ships, output_file);
}

void processReportShip(FILE* input_file, Ship* ships, int N_NAVES, FILE* output_file) {
    int shipID;
    fscanf(input_file, "%d", &shipID);
    if (shipID < N_NAVES) {
        reportShip(shipID, ships, output_file);
    } else {
        fprintf(output_file, "Error: Nave %d no existe.\n", shipID);
    }
}

void removeContaminatedOrder(int shipID, int orderID, Ship* ships, FILE* output_file) {
    Order **current = &ships[shipID].orders_head, *temp;
    while (*current != NULL) {
        if ((*current)->id == orderID) {
            temp = *current;
            *current = (*current)->next;
            free(temp);
            fprintf(output_file, "PEDIDO %d HA SIDO ELIMINADO\n", orderID);
            return;
        }
        current = &(*current)->next;
    }
    fprintf(output_file, "PEDIDO %d NO ENCONTRADO EN NAVE %d\n", orderID, shipID);
}

void processContaminatedOrder(FILE* input_file, Ship* ships, FILE* output_file) {
    int shipID, orderID;
    fscanf(input_file, "%d %d", &shipID, &orderID);
    removeContaminatedOrder(shipID, orderID, ships, output_file);
}

void deliverOrders(Ship* ships, int N_NAVES, Planet* planets, int N_PLANETAS, FILE* output_file) {
    bool hasDeliveredAnyOrder = false;
    for (int i = 0; i < N_NAVES; i++) {
        deliverOrderForShip(&ships[i], planets, N_PLANETAS, output_file, &hasDeliveredAnyOrder);
    }
    if (!hasDeliveredAnyOrder) {
        fprintf(output_file, "NO HAY PEDIDOS POR ENTREGAR\n");
    }
}

void deliverOrderForShip(Ship* ship, Planet* planets, int N_PLANETAS, FILE* output_file, bool* hasDeliveredAnyOrder) {
    if (ship->orders_head == NULL) {
        return;
    }
    int targetPlanetID = ship->orders_head->planet_id;
    Order** orderPointer = &(ship->orders_head);

    while (*orderPointer != NULL) {
        if ((*orderPointer)->planet_id != targetPlanetID) {
            orderPointer = &((*orderPointer)->next);
            continue;
        }
        Order* toDeliver = *orderPointer;

        for (int i = 0; i < N_PLANETAS; i++) {
            if (planets[i].id == targetPlanetID) {
                planets[i].succesfull_deliveries += 1;
                break;
            }
        }

        fprintf(output_file, "PEDIDO %d ENTREGADO EN PLANETA %d\n", toDeliver->id, targetPlanetID);
        *orderPointer = toDeliver->next;
        free(toDeliver);
        *hasDeliveredAnyOrder = true;
    }
}

int comparePlanets(const void* a, const void* b) {
    const Planet* planetA = (const Planet*)a;
    const Planet* planetB = (const Planet*)b;
    
    if (planetB->succesfull_deliveries != planetA->succesfull_deliveries) {
        return planetB->succesfull_deliveries - planetA->succesfull_deliveries;
    }
    
    return planetA->id - planetB->id;
}

void reportPlanetOrders(Ship* ships, int N_PLANETAS, Planet* planets, FILE* output_file) {
    qsort(planets, N_PLANETAS, sizeof(Planet), comparePlanets);
    
    fprintf(output_file, "PLANETAS-ORDENADOS\n");
    int totalDeliveries = 0;
    for (int i = 0; i < N_PLANETAS; i++) {
        fprintf(output_file, "    PLANETA %d: %d pedidos\n", planets[i].id, planets[i].succesfull_deliveries);
        totalDeliveries += planets[i].succesfull_deliveries;
    }
    fprintf(output_file, "TOTAL-PEDIDOS-ENTREGADOS: %d\n", totalDeliveries);
}

void takeOrderAfterMax(int orderID, int shipID, int planetID, Ship* ships, FILE* output_file) {
    Order* newOrder = (Order*)malloc(sizeof(Order));
    newOrder->id = orderID;
    newOrder->planet_id = planetID;
    newOrder->next = NULL;

    if (shipID >= 0) {
        Order** targetOrder = &(ships[shipID].orders_head);
        Order* maxOrder = NULL;

        while (*targetOrder != NULL) {
            if (maxOrder == NULL || (*targetOrder)->id > maxOrder->id) {
                maxOrder = *targetOrder;
            }
            targetOrder = &((*targetOrder)->next);
        }

        if (maxOrder != NULL) {
            newOrder->next = maxOrder->next;
            maxOrder->next = newOrder;
        } else {
            ships[shipID].orders_head = newOrder;
        }
        fprintf(output_file, "REGISTRADO PEDIDO %d\n", orderID);
    } else {
        free(newOrder);
    }
}

void processTakeOrderAfterMax(FILE* input_file, Ship* ships, FILE* output_file) {
    int orderID, shipID, planetID;
    fscanf(input_file, "%d %d %d", &orderID, &shipID, &planetID);
    takeOrderAfterMax(orderID, shipID, planetID, ships, output_file);
}

void processInverseCommand(FILE* input_file, Ship* ships, int N_NAVES, FILE* output_file) {
    int shipID;
    fscanf(input_file, "%d", &shipID);
    if (shipID < N_NAVES) {
        reverseOrdersForShip(shipID, ships);
    }
}

void reverseOrdersForShip(int shipID, Ship* ships) {
    Order* current = ships[shipID].orders_head;
    Order* prev = NULL;
    Order* next = NULL;

    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    ships[shipID].orders_head = prev;
}

int countOrdersForPlanet(Order* head, int planetID) {
    int count = 0;
    while (head) {
        if (head->planet_id == planetID ) {
            count++;
        }
        head = head->next;
    }
    return count;
}

int countOrders(Order* head) {
    int count = 0;
    while (head) {
        count++;
        head = head->next;
    }
    return count;
}

void transferOrdersBetweenShips(Ship* ships, int ship1ID, int ship2ID, int planetID, FILE* output_file) {
    int count1 = countOrdersForPlanet(ships[ship1ID].orders_head, planetID);
    int count2 = countOrdersForPlanet(ships[ship2ID].orders_head, planetID);
    
    Ship *sourceShip, *targetShip;
    int transferredOrders = 0;

    if (count1 > count2 || count1 == count2) {
        sourceShip = &ships[ship2ID];
        targetShip = &ships[ship1ID];
    } else {
        sourceShip = &ships[ship1ID];
        targetShip = &ships[ship2ID];
    }

    
    Order **lastOrderPtr = &targetShip->orders_head;
    while (*lastOrderPtr != NULL) {
        lastOrderPtr = &((*lastOrderPtr)->next);
    }

    
    Order **orderPtr = &sourceShip->orders_head;
    while (*orderPtr != NULL) {
        if ((*orderPtr)->planet_id == planetID) {
            
            Order *toTransfer = *orderPtr;
            *orderPtr = (*orderPtr)->next;

            toTransfer->next = NULL;
            *lastOrderPtr = toTransfer;
            lastOrderPtr = &toTransfer->next;

            transferredOrders++;
        } else {
            orderPtr = &(*orderPtr)->next;
        }
    }
    
    int totalOrdersShip1 = countOrders(ships[ship1ID].orders_head);
    int totalOrdersShip2 = countOrders(ships[ship2ID].orders_head);

    fprintf(output_file, "PAQUETES TRANSFERIDOS: %d\n", transferredOrders);
    fprintf(output_file, "    NAVE %d: %d PEDIDOS\n", ship1ID, totalOrdersShip1);
    fprintf(output_file, "    NAVE %d: %d PEDIDOS\n", ship2ID, totalOrdersShip2);
}

void processCoordinateOrdersCommand(FILE* input_file, Ship* ships, int N_NAVES, FILE* output_file) {
    int ship1ID, ship2ID, planetID;
    fscanf(input_file, "%d %d %d", &ship1ID, &ship2ID, &planetID);
    transferOrdersBetweenShips(ships, ship1ID, ship2ID, planetID, output_file);
}

void freeMemory(Ship* ships, int N_NAVES) {
    for (int i = 0; i < N_NAVES; i++) {
        Order* current = ships[i].orders_head;
        while (current) {
            Order* temp = current;
            current = current->next;
            free(temp);
        }
    }
    free(ships);
}

void freePlanetMemory(Planet* planets) {
    free(planets);
}

void processEvent(char* command, FILE* input_file, Ship* ships, int N_NAVES, Planet* planets, int N_PLANETAS, FILE* output_file) {
    if (string_equals(command, COMMAND_REGISTER)) {
        processRegisterOrder(input_file, ships, output_file);
    } else if (string_equals(command, COMMAND_REPORT_SHIP)) {
        processReportShip(input_file, ships, N_NAVES, output_file);
    } else if (string_equals(command, COMMAND_REPORT_ORDERS)) {
        reportOrders(ships, N_NAVES, output_file);
    } else if (string_equals(command, COMMAND_CONTAMINATED_ORDER)) {
        processContaminatedOrder(input_file, ships, output_file);
    } else if (string_equals(command, COMMAND_DELIVER_ORDERS)) {
        deliverOrders(ships, N_NAVES, planets, N_PLANETAS, output_file);
    } else if (string_equals(command, COMMAND_REPORT_PLANETS)) {
        reportPlanetOrders(ships, N_PLANETAS, planets, output_file);
    } else if (string_equals(command, COMMAND_AFTER_MAX)) {
        processTakeOrderAfterMax(input_file, ships, output_file);
    } else if (string_equals(command, COMMAND_INVERSE)) {
        processInverseCommand(input_file, ships, N_NAVES, output_file);
    } else if (string_equals(command, COMMAND_COORDINATE_ORDERS)) {
        processCoordinateOrdersCommand(input_file, ships, N_NAVES, output_file);
    }
}

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    if (!input_file) {
        fprintf(stderr, "Error al abrir el archivo de input %s\n", argv[1]);
        return 1;
    }
    FILE *output_file = fopen(argv[2], "w");
    if (!output_file) {
        fprintf(stderr, "Error al abrir el archivo de output %s\n", argv[2]);
        fclose(input_file);
        return 1;
    }

    int N_PLANETAS, N_NAVES, N_EVENTOS;
    fscanf(input_file, "%d %d %d", &N_PLANETAS, &N_NAVES, &N_EVENTOS);

    Ship* ships = (Ship*)malloc(N_NAVES * sizeof(Ship));
    if (!ships) {
        fprintf(stderr, "Error al asignar memoria para las naves\n");
        fclose(input_file);
        fclose(output_file);
        return 1;
    }

    for (int i = 0; i < N_NAVES; i++) {
        ships[i].id = i;
        ships[i].orders_head = NULL;
    }

    Planet* planets = (Planet*)malloc(N_PLANETAS * sizeof(Planet));
    if (!planets) {
        fprintf(stderr, "Error al asignar memoria para los planetas\n");
        fclose(input_file);
        fclose(output_file);
        return 1;
    }
    
    for (int i = 0; i < N_PLANETAS; i++) {
        planets[i].id = i;
    }

    char command[32];
    for (int i = 0; i < N_EVENTOS; i++) {
        fscanf(input_file, "%s", command);
        processEvent(command, input_file, ships, N_NAVES, planets, N_PLANETAS, output_file);
    }

    fclose(input_file);
    fclose(output_file);

    freeMemory(ships, N_NAVES);
    freePlanetMemory(planets);

    return 0;
}