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
           l : in STD_LOGIC;
           r : in STD_LOGIC;
           q : out STD_LOGIC);
end component;

begin

nst_FF0: FFD port map(
        c => clock,
        d => datain(0),
        l => load,
        r => clear,
        q => dataout(0)
    );

inst_FF1: FFD port map(
        c => clock,
        d => datain(1),
        l => load,
        r => clear,
        q => dataout(1)
    );

inst_FF2: FFD port map(
        c => clock,
        d => datain(2),
        l => load,
        r => clear,
        q => dataout(2)
    );

inst_FF3: FFD port map(
        c => clock,
        d => datain(3),
        l => load,
        r => clear,
        q => dataout(3)
    );
    
inst_FF4: FFD port map(
        c => clock,
        d => datain(4),
        l => load,
        r => clear,
        q => dataout(4)
    );

inst_FF5: FFD port map(
        c => clock,
        d => datain(5),
        l => load,
        r => clear,
        q => dataout(5)
    );

inst_FF6: FFD port map(
        c => clock,
        d => datain(6),
        l => load,
        r => clear,
        q => dataout(6)
    );

inst_FF7: FFD port map(
        c => clock,
        d => datain(7),
        l => load,
        r => clear,
        q => dataout(7)
    );
    
inst_FF8: FFD port map(
        c => clock,
        d => datain(8),
        l => load,
        r => clear,
        q => dataout(8)
    );

inst_FF9: FFD port map(
        c => clock,
        d => datain(9),
        l => load,
        r => clear,
        q => dataout(9)
    );

inst_FF10: FFD port map(
        c => clock,
        d => datain(10),
        l => load,
        r => clear,
        q => dataout(10)
    );

inst_FF11: FFD port map(
        c => clock,
        d => datain(11),
        l => load,
        r => clear,
        q => dataout(11)
    );

inst_FF12: FFD port map(
        c => clock,
        d => datain(12),
        l => load,
        r => clear,
        q => dataout(12)
    );

inst_FF13: FFD port map(
        c => clock,
        d => datain(13),
        l => load,
        r => clear,
        q => dataout(13)
    );

inst_FF14: FFD port map(
        c => clock,
        d => datain(14),
        l => load,
        r => clear,
        q => dataout(14)
    );

inst_FF15: FFD port map(
        c => clock,
        d => datain(15),
        l => load,
        r => clear,
        q => dataout(15)
    );

end Behavioral;
