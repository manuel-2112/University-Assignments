import sys, os, curses
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from data import delete_data


def animate(i):
    data = pd.read_csv('data.csv')
    tiempo = data['TIEMPO']
    calidad_1 = data['CALIDAD AIRE 1']
    calidad_2 = data['CALIDAD AIRE 2']

    plt.cla()

    plt.plot(tiempo, calidad_1, label='Calidad Sensor MQ135- Entrada')
    plt.plot(tiempo, calidad_2, label='Calidad Sensor MQ135- Salida')

    plt.legend(loc='upper left')
    plt.ylim([0, 350])
    plt.ylabel('Concentracion CO2 [ppm]')
    plt.xlabel('Tiempo [s]')
    
def show_plot(n):
    fig = plt.figure()
    plt.style.use('fivethirtyeight')
    ani = FuncAnimation(plt.gcf(), animate, interval=100)

    #plt.tight_layout()
    manager = plt.get_current_fig_manager()
    manager.window.showMaximized()
    plt.show()

    stdscr = curses.initscr()
    stdscr.clear() 
    stdscr.border(0)
    stdscr.addstr(3, 5, 'CARBFILTROX'.center(100), curses.A_BOLD)
    stdscr.addstr(5, 5, '[1]'+'Presione [ESPACIO] para guardar el grafico como imagen'.center(100), curses.A_BOLD)
    stdscr.addstr(6, 5, '[2]'+'Presione [ENTER] para NO guardar el grafico como imagen'.center(100), curses.A_BOLD)
    stdscr.addstr(7, 5, '[3]'+'Presione [ESC] para salir'.center(100), curses.A_NORMAL)
    guardar = stdscr.getkey()

    if guardar == chr(32):
        os.makedirs('Graficos', exist_ok=True)
        fig.savefig(os.path.join('Graficos', f'Grafico_n{n}.png'), dpi=300)

        stdscr.addstr(10, 5, f'[Se ha guardado: Grafico_n{n}.png]'.center(100), curses.A_BOLD)
        stdscr.refresh()
        curses.napms(3000)
    
    elif guardar == chr(27):
            curses.endwin()
            delete_data('data.csv')
            sys.exit()
    