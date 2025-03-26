namespace RawDeal.GameUtils;

public class TurnMustEnd : Exception
{
    public TurnMustEnd() : base("El turno debe terminar") { }

}