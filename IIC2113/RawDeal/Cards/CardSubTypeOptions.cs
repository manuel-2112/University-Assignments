namespace RawDeal.Cards;

public class CardSubTypeOptions
{
    private const string HighRisk = "HighRisk";
    private const string HHH = "HHH";
    private const string Jericho = "Jericho";
    private const string Grapple = "Grapple";
    private const string Mankind = "Mankind";
    private const string ReversalStrikeSpecial = "ReversalStrikeSpecial";  
    private const string Kane = "Kane";
    private const string TheRock = "TheRock";
    private const string ReversalGrappleSpecial = "ReversalGrappleSpecial";
    private const string SetUp = "SetUp";
    private const string ForeignObject = "ForeignObject";
    private const string TrademarkFinisher = "TrademarkFinisher";
    private const string ReversalGrapple = "ReversalGrapple";
    private const string ReversalSpecial = "ReversalSpecial";
    private const string Submission = "Submission";
    private const string ReversalAction = "ReversalAction";
    private const string ReversalStrike = "ReversalStrike";
    private const string StoneCold = "StoneCold";
    private const string Face = "Face";
    private const string ReversalSubmission = "ReversalSubmission";
    private const string Strike = "Strike";
    private const string Heel = "Heel";
    private const string Undertaker = "Undertaker";
    private const string Unique = "Unique";

    public List<CardSubtype> GetCardSubTypeFromListOfStrings(List<string> listOfCardSubTypes)
    {
        List<CardSubtype> cardSubTypes = new List<CardSubtype>();
        foreach (string cardSubTypeString in listOfCardSubTypes)
        {
            CardSubtype cardSubType;
            if ((cardSubTypeString) == ReversalStrike)
                cardSubType = CardSubtype.ReversalStrike;
            else if ((cardSubTypeString) == ForeignObject)
                cardSubType = CardSubtype.ForeignObject;
            else if ((cardSubTypeString) == HHH)
                cardSubType = CardSubtype.HHH;
            else if ((cardSubTypeString) == Grapple)
                cardSubType = CardSubtype.Grapple;
            else if ((cardSubTypeString) == ReversalStrikeSpecial) 
                cardSubType = CardSubtype.ReversalStrikeSpecial;   
            else if ((cardSubTypeString) == Kane)
                cardSubType = CardSubtype.Kane;
            else if ((cardSubTypeString) == Heel)
                cardSubType = CardSubtype.Heel;
            else if ((cardSubTypeString) == Jericho)
                cardSubType = CardSubtype.Jericho;
            else if ((cardSubTypeString) == ReversalGrappleSpecial)
                cardSubType = CardSubtype.ReversalGrappleSpecial;  
            else if ((cardSubTypeString) == Mankind)
                cardSubType = CardSubtype.Mankind;
            else if ((cardSubTypeString) == Undertaker)
                cardSubType = CardSubtype.Undertaker;
            else if ((cardSubTypeString) == Strike)
                cardSubType = CardSubtype.Strike;
            else if ((cardSubTypeString) == Submission)
                cardSubType = CardSubtype.Submission;
            else if ((cardSubTypeString) == TrademarkFinisher)     
                cardSubType = CardSubtype.TrademarkFinisher;       
            else if ((cardSubTypeString) == ReversalAction)        
                cardSubType = CardSubtype.ReversalAction;
            else if ((cardSubTypeString) == Unique)
                cardSubType = CardSubtype.Unique;
            else if ((cardSubTypeString) == ReversalGrapple)       
                cardSubType = CardSubtype.ReversalGrapple;
            else if ((cardSubTypeString) == Face)
                cardSubType = CardSubtype.Face;
            else if ((cardSubTypeString) == StoneCold)
                cardSubType = CardSubtype.StoneCold;
            else if ((cardSubTypeString) == ReversalSpecial)       
                cardSubType = CardSubtype.ReversalSpecial;
            else if ((cardSubTypeString) == ReversalSubmission)
                cardSubType = CardSubtype.ReversalSubmission;
            else if ((cardSubTypeString) == HighRisk)
                cardSubType = CardSubtype.HighRisk;
            else if ((cardSubTypeString) == TheRock)
                cardSubType = CardSubtype.TheRock;
            else if ((cardSubTypeString) == SetUp)
                cardSubType = CardSubtype.SetUp;
            else
                throw new ArgumentException("No existe el subtipo de carta dado.");
            cardSubTypes.Add(cardSubType);
        }
        return cardSubTypes;
    }
    
    public List<string> GetCardSubTypeFromListOfSubTypes(List<CardSubtype> listOfCardSubTypes)
    {
        return listOfCardSubTypes.Select(GetCardSubTypeFromSubType).ToList();
    }

    private string GetCardSubTypeFromSubType(CardSubtype cardSubType)
    {
        if (cardSubType == CardSubtype.ReversalSpecial)
            return ReversalSpecial;
        if (cardSubType == CardSubtype.ReversalSubmission)    
            return ReversalSubmission;
        if (cardSubType == CardSubtype.ReversalStrike)        
            return ReversalStrike;
        if (cardSubType == CardSubtype.SetUp)
            return SetUp;
        if (cardSubType == CardSubtype.HHH)
            return HHH;
        if (cardSubType == CardSubtype.HighRisk)
            return HighRisk;
        if (cardSubType == CardSubtype.ReversalAction)        
            return ReversalAction;
        if (cardSubType == CardSubtype.Undertaker)
            return Undertaker;
        if (cardSubType == CardSubtype.Heel)
            return Heel;
        if (cardSubType == CardSubtype.TrademarkFinisher)     
            return TrademarkFinisher;
        if (cardSubType == CardSubtype.ForeignObject)
            return ForeignObject;
        if (cardSubType == CardSubtype.Submission)
            return Submission;
        if (cardSubType == CardSubtype.Face)
            return Face;
        if (cardSubType == CardSubtype.Unique)
            return Unique;
        if (cardSubType == CardSubtype.Mankind)
            return Mankind;
        if (cardSubType == CardSubtype.ReversalGrappleSpecial)
            return ReversalGrappleSpecial;
        if (cardSubType == CardSubtype.Jericho)
            return Jericho;
        if (cardSubType == CardSubtype.Kane)
            return Kane;
        if (cardSubType == CardSubtype.Grapple)
            return Grapple;
        if (cardSubType == CardSubtype.ReversalGrapple)       
            return ReversalGrapple;
        if (cardSubType == CardSubtype.TheRock)
            return TheRock;
        if (cardSubType == CardSubtype.StoneCold)
            return StoneCold;
        if (cardSubType == CardSubtype.Strike)
            return Strike;
        if (cardSubType == CardSubtype.ReversalStrikeSpecial)
            return ReversalStrikeSpecial;
        throw new ArgumentException("No existe el tipo de carta dado.");
    }
}