namespace RawDeal.GameUtils;

public class PlayerCantTakeMoreDamage : Exception
{
    public PlayerCantTakeMoreDamage() : base("El juego debe terminar") { }
}