import os
import pygame
from checkers.constants import WIDTH, HEIGHT, SQUARE_SIZE, WHITE, BLACK, MONTECARLO, MINIMAX, HUMAN
from checkers.game import Game
from AI.minimax import minimax
from AI.mcts import MCTS
import time
import csv
FPS = 60

CURRENT_DIR = os.path.dirname(__file__)

def get_row_col_from_mouse(pos):
    x, y = pos
    row = y // SQUARE_SIZE
    col = x // SQUARE_SIZE
    return row, col

def main(white, black, white_depth, black_depth, alphabeta=False):
    pygame.init()
    WIN = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption('Checkers')

    run = True
    clock = pygame.time.Clock()
    
    # Puedes determinar si los jugadores son controlados por la IA o por humanos, 
    # asignándoles MONTECARLO, MINIMAX o HUMAN.
    white_algorithm = white
    black_algorithm = black
    
    # Puedes elegir si quieres que MINIMAX muestre los movimientos
    # que evalua en cada jugada cambiando la siguiente variable a True
    show_moves_minimax = False

    # Profundidad de busqueda para Minimax en las fichas blancas y negras
    white_depth = white_depth
    black_depth = black_depth

    # Puedes cambiar la velocidad de la animación cambiando el valor de wait_time (milisegundos)
    wait_time = 0

    # Activar alphabeta pruning 
    # (Cambia esta variable a True cuando lo hayas implementado)
    alphabeta = alphabeta

    game = Game(WIN, show_moves_minimax, wait_time)
    new_board = game.board

    # Variables para calcular el tiempo promedio de búsqueda
    total_white_search_time = 0
    total_black_search_time = 0
    num_white_searches = 0
    num_black_searches = 0


    MONTE_CARLO_THINK_TIME = 2

    while run:
        clock.tick(FPS)
        
        if game.turn == WHITE and white_algorithm != HUMAN:
            start_time = time.time()

            if white_algorithm == MINIMAX:
                value, new_board = minimax(game.get_board(), white_depth, WHITE, BLACK, game, alphabeta)

            elif white_algorithm == MONTECARLO: 
                over = True if game.winner() else False
                MonteCarlo = MCTS(game.get_board(), WHITE, over)
                MonteCarlo.search(MONTE_CARLO_THINK_TIME)
                num_rollouts, run_time = MonteCarlo.statistics()
                print("Statistics: ", num_rollouts, "rollouts in", run_time, "seconds")
                move = MonteCarlo.best_move()
                new_board = move

            if new_board is not None:
                game.ai_move(new_board)
                total_white_search_time += time.time() - start_time
                num_white_searches += 1
        
        elif game.turn == BLACK and black_algorithm != HUMAN:
            start_time = time.time()

            if black_algorithm == MINIMAX:
                value, new_board = minimax(game.get_board(), black_depth, BLACK, WHITE, game, alphabeta)

            elif black_algorithm == MONTECARLO: 
                over = True if game.winner() else False
                MonteCarlo = MCTS(game.get_board(), BLACK, over)
                MonteCarlo.search(MONTE_CARLO_THINK_TIME)
                num_rollouts, run_time = MonteCarlo.statistics()
                print("Statistics: ", num_rollouts, "rollouts in", run_time, "seconds")
                move = MonteCarlo.best_move()
                new_board = move



            if new_board is not None:
                game.ai_move(new_board)
                total_black_search_time += time.time() - start_time
                num_black_searches += 1
            

        if game.winner() is not None:
            if game.winner() == BLACK:
                print(f"BLACK {black_algorithm} WINS")
            else:
                print(f"WHITE {white_algorithm} WINS")
            run = False


        if new_board is None:
            if game.turn == BLACK:
                print(f"WHITE {white_algorithm} WINS")
            elif game.turn == WHITE:
                print(f"BLACK {black_algorithm} WINS")

            run = False

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            
            if event.type == pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()
                row, col = get_row_col_from_mouse(pos)
                game.select(row, col)
                # piece = game.piece_selected()

                # if not game.select(row, col):
                #   move = (row, col)
                #   print(piece.piece_coordinates(), move)

        game.update()
    
    pygame.quit()

    average_white_search_time = total_white_search_time / num_white_searches if num_white_searches > 0 else 0
    average_black_search_time = total_black_search_time / num_black_searches if num_black_searches > 0 else 0
    
    return game.winner(), average_white_search_time, average_black_search_time

def run_experiment_A(depths, num_games=10):
    results = []
    try:
        for depth in depths:
            white_wins = 0
            black_wins = 0
            tie = 0
            total_white_time = 0
            total_black_time = 0

            for _ in range(num_games):
                winner, avg_white_time, avg_black_time = main(MINIMAX, MONTECARLO, depth, depth)
                total_white_time += avg_white_time
                total_black_time += avg_black_time
                
                if winner == WHITE:
                    white_wins += 1
                elif winner == BLACK:
                    black_wins += 1
                elif winner is None:
                    tie += 1

            average_white_time = total_white_time / num_games
            average_black_time = total_black_time / num_games
            
            results.append((depth, white_wins, black_wins, tie, average_white_time, average_black_time))
    except Exception as e:
        print(e)
    finally:
        with open('results.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Depth", "Minimax Wins", "MCTS Wins", "Ties", "Avg White Time", "Avg Black Time"])
            for result in results:
                writer.writerow(result)
    
    return results

def run_experiment_B(depths, file_name, alphabeta, num_games=3):
    results = []
    try:
        for white_depth, black_depth in depths:
            white_wins = 0
            black_wins = 0
            ties = 0
            total_white_time = 0
            total_black_time = 0

            for _ in range(num_games):
                winner, avg_white_time, avg_black_time = main(MINIMAX, MINIMAX, white_depth, black_depth, alphabeta)
                total_white_time += avg_white_time
                total_black_time += avg_black_time
                
                if winner == WHITE:
                    white_wins += 1
                elif winner == BLACK:
                    black_wins += 1
                elif winner is None:
                    ties += 1

            average_white_time = total_white_time / num_games
            average_black_time = total_black_time / num_games
            
            results.append((white_depth, black_depth, white_wins, black_wins, ties, average_white_time, average_black_time))
    except Exception as e:
        print(e)
    finally:
        with open(f'{file_name}.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["White Depth", "Black Depth", "White Wins", "Black Wins", "Ties", "Avg White Time", "Avg Black Time"])
            for result in results:
                writer.writerow(result)
    
    return results

if __name__ == "__main__":
    #Actividad 1
    #depths = [1, 2, 3]
    #results = run_experiment_A(depths)

    #Actividad 2
    depths = [(1, 3), (3, 5), (5, 1)]
    #results = run_experiment_B(depths=depths, file_name= "minimax_vs_minimax_results", alphabeta=False)
    
    #Actividad 3
    results = run_experiment_B(depths=depths, file_name="alpha_beta_results", alphabeta=True)
    
    print(results)