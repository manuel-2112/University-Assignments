library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.all;
use IEEE.numeric_std.all;


entity CPU is
    Port (
           clock : in STD_LOGIC;
           clear : in STD_LOGIC;
           ram_address : out STD_LOGIC_VECTOR (11 downto 0);
           ram_datain : out STD_LOGIC_VECTOR (15 downto 0);
           ram_dataout : in STD_LOGIC_VECTOR (15 downto 0);
           ram_write : out STD_LOGIC;
           rom_address : out STD_LOGIC_VECTOR (11 downto 0);
           rom_dataout : in STD_LOGIC_VECTOR (35 downto 0);
           dis : out STD_LOGIC_VECTOR (15 downto 0));
end CPU;

architecture Behavioral of CPU is

-- Declaraci?n componentes
component Reg16
    Port (
        clock       : in    std_logic;
        clear       : in    std_logic;
        load        : in    std_logic;
        datain      : in    std_logic_vector (15 downto 0);
        dataout     : out   std_logic_vector (15 downto 0)
          );
    end component;

component ALU
    Port (
           a        : in  std_logic_vector (15 downto 0);   -- Primer operando.
           b        : in  std_logic_vector (15 downto 0);   -- Segundo operando.
           sop      : in  std_logic_vector (2 downto 0);   -- Selector de la operacion.
           c        : out std_logic;                       -- Senal de 'carry'.
           z        : out std_logic;                       -- Senal de 'zero'.
           n        : out std_logic;                       -- Senal de 'nagative'.
           result   : out std_logic_vector (15 downto 0)   -- Resultado de la operacion.
           );  
    end component;

component PC 
    Port ( 
        clock   :   in  std_logic;
        clear   :   in  std_logic;
        load    :   in  std_logic;
        up       : in  std_logic;
        down     : in  std_logic;
        datain  :   in  std_logic_vector (11 downto 0);
        dataout :   out std_logic_vector (11 downto 0));
    end component;

component ControlUnit is
    Port(
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
        w: out std_logic;
        incSP: out std_logic;
        decSP: out std_logic;
        selPC: out std_logic;
        selDin: out std_logic;
        selAdd: out std_logic_vector(1 downto 0)
        );
    end component;

component RegistroStatus is
    Port ( 
        clock   :  in  std_logic;
        clear   :  in  std_logic;
        c       :   in  std_logic;
        z       :   in  std_logic;
        n       :   in  std_logic;
        s       :   out std_logic_vector (2 downto 0)
        );
    end component;
    
component SP is
    Port(
        clock   :   in std_logic;
        clear   :   in std_logic;
        incSP   :   in std_logic;
        decSP   :   in std_logic;
        Dout    :   out std_logic_vector (11 downto 0)
        );
    end component;
    
component Adder12 is
    Port(
        a: in std_logic_vector (11 downto 0);
        b: in std_logic_vector (11 downto 0);
        ci: in std_logic;
        s: out std_logic_vector (11 downto 0);
        co: out std_logic
    );
    end component;

-- Senal Registro a MUX
signal A   :   std_logic_vector(15 downto 0);
signal B   :   std_logic_vector(15 downto 0);

-- ALU result
signal result       : std_logic_vector(15 downto 0);

-- Senal de control para Registros A y B
signal enableA      : std_logic;
signal enableB      : std_logic;


-- Senal de control para MUX
signal selA         : std_logic_vector(1 downto 0);
signal selB         : std_logic_vector(1 downto 0);

-- Senales de salida de MUX
signal muxAout  :   std_logic_vector(15 downto 0);
signal muxBout  :   std_logic_vector(15 downto 0);

-- Selector de operacion ALU
signal sop          : std_logic_vector(2 downto 0);

-- Load del PC
signal loadPC       : std_logic;

-- Flags ALU Status 
signal c_ALU_Status : std_logic;   
signal z_ALU_Status : std_logic;   
signal n_ALU_Status : std_logic;

-- Status
signal s            : std_logic_vector(2 downto 0);

-- Senales SP
signal incSP        : std_logic;
signal decSP        : std_logic;
signal sp_out       : std_logic_vector(11 downto 0);

-- Senales MUX PC
signal muxPCout     : std_logic_vector(11 downto 0);
signal selPC        : std_logic;

-- Senales MUX Din
signal selDin       : std_logic;
signal muxDinout    : std_logic_vector (15 downto 0);

-- Senales Adder12
signal pc_out       : std_logic_vector (11 downto 0);
signal result_adder12: std_logic_vector (11 downto 0);
signal c_out12      : std_logic;

-- Senales MUX S
signal selAdd       : std_logic_vector (1 downto 0);
signal muxSout      : std_logic_vector (11 downto 0);


begin

ram_address <= muxSout;
ram_datain <= muxDinout;
dis <= A;
-- result_adder12 <= "0000000000000000";

-- MUX A
with selA select
    muxAout <= A                       when "00",
               "0000000000000000"      when "01",
               "0000000000000001"      when "10",
               "0000000000000000"      when "11";

-- MUX B
with selB select
    muxBout <= B                         when "00",
               "0000000000000000"        when "01",
               rom_dataout(35 downto 20) when "10", -- Literal
               ram_dataout               when "11";
            
-- Mux PC
with selPC select
    muxPCout <= ram_dataout(11 downto 0)  when '0', --DOUT
                rom_dataout(31 downto 20) when '1'; --LIT
                
-- MUX Din
with selDin select
    muxDinout <= "0000" & result_adder12    when '0', --PC
                 result      when '1'; --ALU
                 
-- MUX S
with selAdd select
    muxSout <=  rom_dataout(31 downto 20) when "00", --LIT
                B(11 downto 0)            when "01", --B
                sp_out                     when "10", --SP
                "000000000000"            when "11";

inst_PC: PC port map(
    clock       => clock,
    clear       => clear,
    load       => loadPC,
    up       => '1',
    down     => '0',
    datain => muxPCout,
    dataout  => pc_out
    );
    
rom_address <= pc_out;
    
inst_SP: SP port map(
    clock   => clock,
    clear   => clear,
    incSP   => incSP,
    decSP   => decSP,
    Dout    => sp_out
    );

inst_ControlUnit: ControlUnit port map(
    opcode => rom_dataout(19 downto 0), --opcode
    Z => s(1),
    N => s(0),
    C => s(2),
    enableA => enableA,
    enableB => enableB,
    selA => selA,
    selB => selB,
    loadPC => loadPC,
    sop => sop,
    w => ram_write,
    incSP => incSP,
    decSP => decSP,
    selPC => selPC,
    selDin => selDin,
    selAdd => selAdd
    );

inst_RegA: Reg16 port map(
    clock       => clock,
    clear       => clear,
    load        => enableA,
    datain      => result,
    dataout     => A --MUXA
    );

inst_RegB: Reg16 port map(
    clock       => clock,
    clear       => clear,
    load        => enableB,
    datain      => result,
    dataout     => B --MUXB
    );

inst_ALU: ALU port map(
    a        => muxAout, --MUX RESULT
    b        => muxBout, --MUX RESULT
    sop      => sop,
    c        => c_ALU_Status,
    z        => z_ALU_Status,
    n        => n_ALU_Status,
    result   => result
    );

inst_Status: RegistroStatus port map(
    clock   => clock,
    clear   => clear,
    c       => c_ALU_Status,
    z       => z_ALU_Status,
    n       => n_ALU_Status,
    s       => s
    );
    
inst_Adder12: Adder12 port map (
    a => "000000000001",
    b => pc_out,
    ci => '0',
    s => result_adder12,
    co => c_out12
    );

end Behavioral;

