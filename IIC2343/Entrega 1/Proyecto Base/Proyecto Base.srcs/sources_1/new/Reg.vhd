library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Reg is
    Port ( clock    : in  std_logic;                        -- Se�al del clock (reducido).
           clear    : in  std_logic;                        -- Se�al de reset.
           load     : in  std_logic;                        -- Se�al de carga.
           up       : in  std_logic;                        -- Se�al de subida.
           down     : in  std_logic;                        -- Se�al de bajada.
           datain   : in  std_logic_vector (15 downto 0);   -- Se�ales de entrada de datos.
           dataout  : out std_logic_vector (15 downto 0));  -- Se�ales de salida de datos.
end Reg;

architecture Behavioral of Reg is

component FlipFlop is
    Port ( c : in STD_LOGIC;
           d : in STD_LOGIC;
           qout : out STD_LOGIC;
           nqout : out STD_LOGIC);
end component;

begin

end Behavioral;