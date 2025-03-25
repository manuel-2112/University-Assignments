# Definición del compilador y las banderas de compilación
CC = gcc
CFLAGS = -Wall -Wextra -std=c99

# Archivo ejecutable
TARGET = find_sequences

# Archivos fuente
SRC = main.c

# Regla por defecto
all: $(TARGET)

# Regla para compilar el archivo ejecutable
$(TARGET): $(SRC)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRC)

# Regla para limpiar los archivos generados
clean:
	rm -f $(TARGET)
