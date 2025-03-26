library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Reg is
    Port ( clock    : in  std_logic;                        -- Señal del clock (reducido).
           clear    : in  std_logic;                        -- Señal de reset.
           load     : in  std_logic;                        -- Señal de carga.
           up       : in  std_logic;                        -- Señal de subida.
           down     : in  std_logic;                        -- Señal de bajada.
           datain   : in  std_logic_vector (15 downto 0);   -- Señales de entrada de datos.
           dataout  : out std_logic_vector (15 downto 0));  -- Señales de salida de datos.
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