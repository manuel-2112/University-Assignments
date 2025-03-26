namespace RawDeal.GameUtils;

public class GameMustEnd : Exception
{
    public GameMustEnd() : base("El juego debe terminar") { }
}