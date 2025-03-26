library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.all;

entity PC is
    Port ( 
        clock    : in  std_logic;
        clear    : in  std_logic;
        load   : in  std_logic;
        up       : in  std_logic;
        down     : in  std_logic;
        datain   : in  std_logic_vector (11 downto 0);
        dataout  : out std_logic_vector (11 downto 0)
    );
end PC;

architecture Behavioral of PC is

component FFD is
    Port ( c : in STD_LOGIC;
           d : in STD_LOGIC;
           q : out STD_LOGIC);
end component;

component Adder16
    Port(a  : in  std_logic_vector (15 downto 0);
         b  : in  std_logic_vector (15 downto 0);
         ci : in  std_logic;
         s  : out std_logic_vector (15 downto 0);
         co : out std_logic
         );
end component;

signal flags : std_logic_vector(1 downto 0);
signal sum_input : std_logic_vector(15 downto 0);
signal sum_result : std_logic_vector(15 downto 0);
signal carry : std_logic;
signal after_flags : std_logic_vector(11 downto 0);
signal after_load : std_logic_vector(11 downto 0);
signal reg_input : std_logic_vector(11 downto 0);
signal reg_output : std_logic_vector(11 downto 0);

begin

sum_input <= "0000"&reg_output;

nst_Add : Adder16 port map(
    a => sum_input,
    b => "0000000000000001",
    ci => '0',
    s => sum_result,
    co => carry
    );

flags <= up & down;

with flags select 
    after_flags <= sum_result(11 downto 0) when "10",
                   reg_output when others;
                  
with load select
    after_load <= datain when '1',
                  after_flags when '0';
           
with clear select
    reg_input <= after_load when '0',
                 "000000000000" when '1';

nst_FF0: FFD port map(
        c => clock,
        d => reg_input(0),
        q => reg_output(0)
    );

inst_FF1: FFD port map(
        c => clock,
        d => reg_input(1),
        q => reg_output(1)
    );

inst_FF2: FFD port map(
        c => clock,
        d => reg_input(2),
        q => reg_output(2)
    );

inst_FF3: FFD port map(
        c => clock,
        d => reg_input(3),
        q => reg_output(3)
    );
    
inst_FF4: FFD port map(
        c => clock,
        d => reg_input(4),
        q => reg_output(4)
    );

inst_FF5: FFD port map(
        c => clock,
        d => reg_input(5),
        q => reg_output(5)
    );

inst_FF6: FFD port map(
        c => clock,
        d => reg_input(6),
        q => reg_output(6)
    );

inst_FF7: FFD port map(
        c => clock,
        d => reg_input(7),
        q => reg_output(7)
    );
    
inst_FF8: FFD port map(
        c => clock,
        d => reg_input(8),
        q => reg_output(8)
    );

inst_FF9: FFD port map(
        c => clock,
        d => reg_input(9),
        q => reg_output(9)
    );

inst_FF10: FFD port map(
        c => clock,
        d => reg_input(10),
        q => reg_output(10)
    );

inst_FF11: FFD port map(
        c => clock,
        d => reg_input(11),
        q => reg_output(11)
    );

dataout <= reg_output;

end Behavioral;