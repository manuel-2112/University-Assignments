# CONTIENE LOS ALGORITMOS DE BÚSQUEDA
import time
import heapq
import math

class PrioritizedItem:
    def __init__(self, priority, item):
        self.priority = priority
        self.item = item

    def __lt__(self, other):
        return self.priority < other.priority

# ----- DFS
def dfs(s_init, s_goal):
    """
    s_init y s_goal son objetos de clase cell. Retorna el nodo objetivo
    de clase cell en caso de encontrarlo.
    """
    t_start = time.perf_counter()

    open = [s_init]
    expansions = 1
    closed = []

    while len(open) != 0:
        u = open.pop()
        expansions += 1
        closed.append(u)

        # Obtenemos las posibles acciones:
        moves = u.get_moves()
        succ = [move[1] for move in moves]

        # Para cada sucesor...
        for v in succ:
            if v not in open and v not in closed:
                v.parent = u
                if v.cell_type == "G":
                    t_end = time.perf_counter()
                    t_total = (t_end - t_start ) * 1000
                    print(f"Tiempo de ejecución: {t_total:.10f} ms")
                    print("Número de expansiones: {}".format(expansions))
                    print("Largo del camino encontrado: {}".format(len(get_parents(s_goal))))
                    print("Costo total del camino: {}".format(get_cost(s_goal)))
                    return (v, get_parents(s_goal))
                open.append(v)
    return [], []


# ----------------------- Actividad 2.1 -----------------------------
def bfs(s_init, s_goal):
    """
    Implementación del algoritmo BFS (Breadth-First Search)
    """
    t_start = time.perf_counter()
    
    open = [s_init]  # Lista de nodos por explorar
    expansions = 1
    closed = []  # Lista de nodos ya explorados

    while len(open) != 0:
        u = open.pop(0)  # Extraer el primer nodo de la lista
        expansions += 1
        closed.append(u)

        # Obtener posibles movimientos
        moves = u.get_moves()
        succ = [move[1] for move in moves]

        # Evaluar cada sucesor
        for v in succ:
            if v not in open and v not in closed:
                v.parent = u
                if v.cell_type == "G":  # Verificar si es el objetivo
                    t_end = time.perf_counter()
                    t_total = (t_end - t_start ) * 1000
                    print(f"Tiempo de ejecución: {t_total:.10f} ms")
                    print("Número de expansiones: {}".format(expansions))
                    print("Largo del camino encontrado: {}".format(len(get_parents(s_goal))))
                    print("Costo total del camino: {}".format(get_cost(s_goal)))
                    return (v, get_parents(s_goal))
                open.append(v)
    return [], []  # Retornar vacío si no se encuentra solución

def inverted_dfs(s_init, s_goal):
    """
    Implementación del algoritmo DFS invertido (Depth-First Search)
    """
    t_start = time.perf_counter()
    
    open = [s_init]  # Lista de nodos por explorar
    expansions = 1
    closed = []  # Lista de nodos ya explorados

    while len(open) != 0:
        u = open.pop()  # Extraer el último nodo de la lista
        expansions += 1
        closed.append(u)

        # Obtener posibles movimientos
        moves = u.get_moves()
        succ = list(reversed([move[1] for move in moves]))

        # Evaluar cada sucesor
        for v in succ:
            if v not in open and v not in closed:
                v.parent = u
                if v.cell_type == "G":  # Verificar si es el objetivo
                    t_end = time.perf_counter()
                    t_total = (t_end - t_start ) * 1000
                    print(f"Tiempo de ejecución: {t_total:.10f} ms")
                    print("Número de expansiones: {}".format(expansions))
                    print("Largo del camino encontrado: {}".format(len(get_parents(s_goal))))
                    print("Costo total del camino: {}".format(get_cost(s_goal)))
                    return (v, get_parents(s_goal))
                open.append(v)
    return [], []  # Retornar vacío si no se encuentra solución

# ----------------------- Actividad 2.2 -----------------------------
def a_star(s_init, s_goal):
    """
    Implementación del algoritmo A* (A-star)
    """
    t_start = time.perf_counter()
    open_list = []
    heapq.heappush(open_list, PrioritizedItem(0, s_init))  # Cola de prioridad para nodos por explorar
    g_costs = {s_init: 0}  # Costos de los nodos desde el inicio
    expansions = 1
    closed_list = set()  # Conjunto de nodos ya explorados

    while open_list:
        current = heapq.heappop(open_list)  # Extraer el nodo con menor costo f
        current_node = current.item
        expansions += 1

        if current_node in closed_list:
            continue

        closed_list.add(current_node)

        if current_node.cell_type == "G":  # Verificar si es el objetivo
            t_end = time.perf_counter()
            t_total = (t_end - t_start) * 1000
            print(f"Tiempo de ejecución: {t_total:.10f} ms")
            print(f"Número de expansiones: {expansions}")
            print(f"Largo del camino encontrado: {len(get_parents(current_node))}")
            print(f"Costo total del camino: {get_cost(current_node)}")
            return (current_node, get_parents(current_node))

        for move in current_node.get_moves():
            direction, neighbor = move
            tentative_g_cost = g_costs[current_node] + neighbor.cost

            if neighbor not in g_costs or tentative_g_cost < g_costs[neighbor]:
                g_costs[neighbor] = tentative_g_cost
                f_cost = tentative_g_cost + heuristic_euclidian(neighbor, s_goal)
                heapq.heappush(open_list, PrioritizedItem(f_cost, neighbor))
                neighbor.parent = current_node

    return [], []  # Retornar vacío si no se encuentra solución

def heuristic_manhattan(cell, goal):
    """
    Heurística de distancia Manhattan dividida en 2
    """
    return abs(cell.pos_x - goal.pos_x) / 2 + abs(cell.pos_y - goal.pos_y) / 2

def heuristic_euclidian(cell, goal):
    """
    Heurística de distancia Euclidiana dividida en 2
    """
    return math.sqrt((cell.pos_x - goal.pos_x)**2 + (cell.pos_y - goal.pos_y)**2) / 2

# ----------------------- Actividad 2.3 -----------------------------
def rbfs(node, f_limit, s_goal, visited):
    """
    Implementación del algoritmo de búsqueda recursiva mejorada (RBFS)
    """
    if node.cell_type == "G":  # Verificar si es el objetivo
        return node, 0

    successors = []
    moves = node.get_moves()
    for move in moves:
        direction, child = move
        if child not in visited:  # Evitar ciclos
            child.parent = node
            cost = get_cost(child)
            manhattan = heuristic_manhattan(child, s_goal)
            child.f_value = max(cost + manhattan, node.f_value)
            successors.append(child)

    if not successors:
        return None, float('inf')

    while True:
        # Ordenar los sucesores por valor f
        successors.sort(key=lambda x: x.f_value)
        best = successors[0]

        if best.f_value > f_limit:
            return None, best.f_value

        alternative = successors[1].f_value if len(successors) > 1 else float('inf')

        visited.add(best)
        result, best.f_value = rbfs(best, min(f_limit, alternative), s_goal, visited)
        if result is not None:
            return result, best.f_value
        else:
            if best in visited:
                visited.remove(best)

def recursive_best_first_search(s_init, s_goal):
    """
    Implementación del algoritmo RBFS (Recursive Best-First Search)
    """
    t_start = time.perf_counter()
    s_init.f_value = get_cost(s_init) + heuristic_manhattan(s_init, s_goal)
    visited = set()
    visited.add(s_init)
    result, _ = rbfs(s_init, float('inf'), s_goal, visited)
    t_end = time.perf_counter()
    t_total = (t_end - t_start) * 1000
    
    if result:
        print(f"Tiempo de ejecución: {t_total:.10f} ms")
        print(f"Número de expansiones: {len(visited)}")
        print(f"Largo del camino encontrado: {len(get_parents(result))}")
        print(f"Costo total del camino: {get_cost(result)}")
        return result, get_parents(result)
    return [], []  # Retornar vacío si no se encuentra solución

# Funciones útiles para usar en algoritmos de búsqueda (ver implementación de dfs)
def get_parents(cell):
    """
    Recibe una celda y retorna la cadena de parents hasta la celda de inicio.
    """
    nodo_actual = cell
    parents = [[nodo_actual.pos_x, nodo_actual.pos_y]]
    while nodo_actual.parent is not None:
        parents.append([nodo_actual.parent.pos_x, nodo_actual.parent.pos_y])
        nodo_actual = nodo_actual.parent

    return parents

def get_cost(cell):
    nodo_actual = cell
    total_cost = nodo_actual.cost
    while nodo_actual.parent is not None:
        nodo_actual = nodo_actual.parent
        total_cost += nodo_actual.cost
    return total_cost