from threading import Thread
import sys, shelve, curses
from data import crear_data, clean_data, delete_data
from plot import show_plot

if __name__ == "__main__":
    port = "COM8"
    file_name = 'data.csv'
    tecla = chr(32)
    while True:
        if tecla == chr(32):
            t1 = Thread(target=crear_data, args=(file_name, port,), daemon=True)
            t1.start()

            s = shelve.open('count')
            if 'n' not in s.keys():
                s['n'] = 0

            n = s.get('n') + 1
            show_plot(n)
            s.update({'n': n})
            s.close()

        elif tecla == chr(27):
            t1.do_run = False
            clean_data(file_name)
            break

        stdscr = curses.initscr()
        stdscr.clear() 
        stdscr.border(0)
        stdscr.addstr(3, 5, 'CARBFILTROX'.center(100), curses.A_BOLD)
        stdscr.addstr(5, 5, '[1]'+'Presione [ESPACIO] para visualizar los datos otra vez'.center(100), curses.A_BOLD)
        stdscr.addstr(6, 5, '[2]'+'Presione [ESC] para salir'.center(100), curses.A_NORMAL)
        tecla = stdscr.getkey()
        curses.endwin()
        
        t1.do_run = False
        clean_data(file_name)
    
    delete_data(file_name)
    sys.exit()