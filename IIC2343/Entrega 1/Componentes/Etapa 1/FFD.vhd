library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity FFD is
    Port ( D : in STD_LOGIC;
           C : in STD_LOGIC;
           L : in STD_LOGIC;
           R : in STD_LOGIC;
           Q : out STD_LOGIC);
end FFD;


architecture Behavioral of FFD is

component D_Latch
      Port (
          D : in STD_LOGIC;
          C : in STD_LOGIC;
          Q : out STD_LOGIC
      );
end component;

signal not_c1 : std_logic ;
signal not_c2 : std_logic ;
signal q1 : std_logic ;
signal q2 : std_logic ;
signal mux : std_logic ;
signal sand : std_logic ;

begin
not_c1 <= not C;
not_c2 <= not not_c1;

with L select
    mux <= D when '1',
           q2 when '0';

sand <= (not R) and mux;
 
inst_LD1: D_Latch port map(

    D => sand,
    C => not_c1,
    Q => q1
);

inst_LD2: D_Latch port map(

    D => q1,
    C => not_c2,
    Q => q2
);

Q <= q2;

end Behavioral;
