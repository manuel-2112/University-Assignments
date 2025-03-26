library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Reg16 is
    Port ( datain : in STD_LOGIC_VECTOR (15 downto 0);
           dataout : out STD_LOGIC_VECTOR (15 downto 0);
           clock : in STD_LOGIC;
           load : in STD_LOGIC;
           clear : in STD_LOGIC);
end Reg16;

architecture Behavioral of Reg16 is

component FFD is
    Port ( c : in STD_LOGIC;
           d : in STD_LOGIC;
           q : out STD_LOGIC);
end component;

signal after_load : std_logic_vector(15 downto 0);
signal reg_input : std_logic_vector(15 downto 0);
signal reg_output : std_logic_vector(15 downto 0);

begin

with load select
    after_load <= datain when '1',
                  reg_output when '0';
           
with clear select
    reg_input <= after_load when '0',
                 "0000000000000000" when '1';

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

inst_FF12: FFD port map(
        c => clock,
        d => reg_input(12),
        q => reg_output(12)
    );

inst_FF13: FFD port map(
        c => clock,
        d => reg_input(13),
        q => reg_output(13)
    );

inst_FF14: FFD port map(
        c => clock,
        d => reg_input(14),
        q => reg_output(14)
    );

inst_FF15: FFD port map(
        c => clock,
        d => reg_input(15),
        q => reg_output(15)
    );
dataout <= reg_output;

end Behavioral;
