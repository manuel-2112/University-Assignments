# Variables to define the compiler and compiler flags
CC = gcc
CFLAGS = -Wall -g

# Define the executable file 
TARGET = market

# Define objects
OBJECTS = main.o heap_utilities.o market_operations.o

# Default target
all: $(TARGET)

# Link the program
$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJECTS)

# Compile main.c to main.o
main.o: main.c order_struct.h market_operations.h heap_utilities.h
	$(CC) $(CFLAGS) -c main.c

# Compile heap_utilities.c to heap_utilities.o
heap_utilities.o: heap_utilities.c heap_utilities.h order_struct.h
	$(CC) $(CFLAGS) -c heap_utilities.c

# Compile market_operations.c to market_operations.o
market_operations.o: market_operations.c market_operations.h heap_utilities.h order_struct.h
	$(CC) $(CFLAGS) -c market_operations.c

# Clean the build directory
clean:
	rm -f $(TARGET) $(OBJECTS)

# Declare phony targets
.PHONY: all clean
