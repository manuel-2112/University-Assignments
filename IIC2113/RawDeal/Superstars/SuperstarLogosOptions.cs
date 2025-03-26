namespace RawDeal.Superstars;

public class SuperstarLogosOptions
{
    private const string StoneCold = "StoneCold";
    private const string Undertaker = "Undertaker";
    private const string Mankind = "Mankind";
    private const string HHH = "HHH";
    private const string TheRock = "TheRock";
    private const string Kane = "Kane";
    private const string Jericho = "Jericho";

    public static SuperstarLogo GetSuperstarLogoFromText(string superstarLogo)
    {
        if (superstarLogo == StoneCold)
            return SuperstarLogo.StoneCold;
        if (superstarLogo == Undertaker)
            return SuperstarLogo.Undertaker;
        if (superstarLogo == Mankind)
            return SuperstarLogo.Mankind;
        if (superstarLogo == HHH)
            return SuperstarLogo.HHH;
        if (superstarLogo == TheRock)
            return SuperstarLogo.TheRock;
        if (superstarLogo == Kane)
            return SuperstarLogo.Kane;
        if (superstarLogo == Jericho)
            return SuperstarLogo.Jericho;
        throw new ArgumentException("No existe el Superstar Logo dado.");
    }

    public static List<SuperstarLogo> GetAllSuperstarLogosInAList()
    {
        return new List<SuperstarLogo>
            {
                SuperstarLogo.StoneCold,
                SuperstarLogo.Undertaker,
                SuperstarLogo.Mankind,
                SuperstarLogo.HHH,
                SuperstarLogo.TheRock,
                SuperstarLogo.Kane,
                SuperstarLogo.Jericho
            };
    }
}