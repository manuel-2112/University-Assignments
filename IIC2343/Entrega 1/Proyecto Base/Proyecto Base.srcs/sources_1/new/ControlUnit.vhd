library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.all;
USE IEEE.NUMERIC_STD.ALL;

entity ControlUnit is
    port(
        opcode : in std_logic_vector(19 downto 0);
        Z: in std_logic;
        N: in std_logic;
        C: in std_logic;
        enableA: out std_logic;
        enableB: out std_logic;
        selA: out std_logic_vector(1 downto 0);
        selB: out std_logic_vector(1 downto 0);
        loadPC: out std_logic;
        sop: out std_logic_vector(2 downto 0);
        w: out std_logic
        );
        
end entity ControlUnit;


architecture Behavioral of ControlUnit is

signal op : std_logic_vector(10 downto 0);
signal jeq : std_logic_vector(16 downto 0);
signal jne : std_logic_vector(16 downto 0);
signal NZ : std_logic_vector(1 downto 0);
signal CU_result : std_logic_vector(16 downto 0);


begin

NZ <= N & Z;

with Z select

    jeq <= "10000000000001000" when '1',
            "00000000000000000" when '0';
    
with Z select

    jne <= "10000000000001000" when '0',
            "00000000000000000" when '1';


with opcode select
 CU_result <=   "01001000000000000" when "00000000000000000000", -- MOV A, B
                "00100010000000000" when "00000000000000000001", -- MOV B, A
                "01001100000000000" when "00000000000000000010", -- MOV A, LIT
                "00101100000000000" when "00000000000000000011", -- MOV B, LIT
                "01001110000000000" when "00000000000000000100", -- MOV A, DIR
                "00101110000000000" when "00000000000000000101", -- MOV B, DIR
                "00000010000010100" when "00000000000000000110", -- MOV DIR, A
                "00001000000010100" when "00000000000000000111", -- MOV DIR, B
                "01000000000000000" when "00000000000000001000", -- ADD A, B
                "00100000000000000" when "00000000000000001001", -- ADD B, A
                "01000100000000000" when "00000000000000001010", -- ADD A, LIT
                "01000110000000000" when "00000000000000001011", -- ADD A, DIR
                "00000000000010100" when "00000000000000001100", -- ADD DIR
                "01000000010000000" when "00000000000000001101", -- SUB A, B
                "00100000010000000" when "00000000000000001110", -- SUB B, A
                "01000100010000000" when "00000000000000001111", -- SUB A, LIT
                "01000110010000000" when "00000000000000010000", -- SUB A, DIR
                "00000000010010100" when "00000000000000010001", -- SUB DIR
                "01000000100000000" when "00000000000000010010", -- AND A, B
                "00100000100000000" when "00000000000000010011", -- AND B, A
                "01000100100000000" when "00000000000000010100", -- AND A, LIT
                "01000110100000000" when "00000000000000010101", -- AND A, DIR
                "00000000100010100" when "00000000000000010110", -- AND DIR
                "01000000110000000" when "00000000000000010111", -- OR A, B
                "00100000110000000" when "00000000000000011000", -- OR B, A
                "01000100110000000" when "00000000000000011001", -- OR A, LIT
                "01000110110000000" when "00000000000000011010", -- OR A, DIR
                "00000000110010100" when "00000000000000011011", -- OR DIR
                "01000001000000000" when "00000000000000011100", -- XOR A, B
                "00100001000000000" when "00000000000000011101", -- XOR B, A
                "01000101000000000" when "00000000000000011110", -- XOR A, LIT
                "01000111000000000" when "00000000000000011111", -- XOR A, DIR
                "00000001000010100" when "00000000000000101000", -- XOR DIR
                "01000001010000000" when "00000000000000101001", -- NOT A
                "00100001010000000" when "00000000000000101010", -- NOT B, A
                "00000001010010100" when "00000000000000101011", -- NOT DIR, A
                "01000001110000000" when "00000000000000101100", -- SHL A
                "00100001110000000" when "00000000000000101101", -- SHL B, A
                "00000001110010100" when "00000000000000101110", -- SHL DIR, A
                "01000001100000000" when "00000000000000101111", -- SHR A
                "00100001100000000" when "00000000000000110000", -- SHR B, A
                "00000001100010100" when "00000000000000110001", -- SHR DIR, A
                "01000100000000000" when "00000000000000110010", -- INC A 
                "00110000000000000" when "00000000000000110011", -- INC B
                "00010110000010100" when "00000000000000110100", -- INC DIR
                "01010000010000000" when "00000000000000110101", -- DEC A
                "00000000010000000" when "00000000000000110110", -- CMP A, B
                "00000100010000000" when "00000000000000110111", -- CMP A, LIT
                "00000110010000000" when "00000000000000111000", -- CMP A, DIR
                "10000000000001000" when "00000000000000111001", -- JMP
                jeq           when "00000000000000111010", -- JEQ
                jne           when "00000000000000111011", -- JNE
                "00000000000000000" when others; -- NOP**


loadPC <= CU_result(16);
enableA <= CU_result(15);
enableB <= CU_result(14);
selA <= CU_result(13 downto 12);
selB <= CU_result(11 downto 10);
sop <= CU_result(9 downto 7);
w <= CU_result(2);

end Behavioral;