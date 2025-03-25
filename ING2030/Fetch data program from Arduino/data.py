from threading import currentThread
from serial import Serial
from time import sleep
import csv, os

def crear_data(file_name, port):
    BPS = 9600
    UPDATE_TIME = 1
    FIELDNAMES = ["TIEMPO", "CALIDAD AIRE 1", "CALIDAD AIRE 2"]

    serial = Serial(port, BPS)

    with open(file_name, 'w') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=FIELDNAMES)
        csv_writer.writeheader()

    time_count = 0
    t1 = currentThread()
    while getattr(t1, "do_run", True):
        data = str(serial.readline()).strip()
        data = data.replace("b'", "")
        data = data.replace("\\r\\n'", "")
        data = data.split(",")
        #print(data)

        with open(file_name, 'a') as csv_file:
            csv_writer = csv.DictWriter(csv_file, fieldnames=FIELDNAMES)

            info = {
                "TIEMPO": time_count,
                "CALIDAD AIRE 1": int(data[1]),
                "CALIDAD AIRE 2": int(data[0])
            }

            csv_writer.writerow(info)
        sleep(UPDATE_TIME)
        time_count += UPDATE_TIME

def clean_data(file_name):
    with open(file_name, 'w') as csv_file:
        csv_file.truncate()

def delete_data(file_name):
    os.remove(file_name)