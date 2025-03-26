namespace RawDeal.Cards;

public class CardTypeOptions
{
    private const string Action = "Action";
    private const string Maneuver = "Maneuver";
    private const string Reversal = "Reversal";

    public List<CardType> GetCardTypeFromListOfStrings(List<string> listOfCardTypes)
    {
        List<CardType> cardTypes = new List<CardType>();
        foreach (string cardTypeString in listOfCardTypes)
        {
            CardType cardType;
            if (cardTypeString == Action)
                cardType = CardType.Action;
            else if (cardTypeString == Maneuver)
                cardType = CardType.Maneuver;
            else if (cardTypeString == Reversal)
                cardType = CardType.Reversal;
            else
                throw new ArgumentException("No existe el tipo de carta dado.");
            cardTypes.Add(cardType);
        }
        return cardTypes;
    }
    
    public List<string> GetCardTypeFromListOfTypes(List<CardType> listOfCardTypes)
    {
        return listOfCardTypes.Select(GetCardTypeFromType).ToList();
    }

    public string GetFormattedCardType(CardType cardType)
    {
        return GetCardTypeFromType(cardType).ToUpper();
    }
    
    private string GetCardTypeFromType(CardType cardType)
    {
        if (cardType == CardType.Action)
            return Action;
        if (cardType == CardType.Maneuver)
            return Maneuver;
        if (cardType == CardType.Reversal)
            return Reversal;
        throw new ArgumentException("No existe el tipo de carta dado.");
    }
}