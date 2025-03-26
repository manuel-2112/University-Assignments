using RawDeal.Cards;
using RawDeal.Superstars;

namespace RawDeal.Decks.Validation;

public class DeckOfCardsValidator
{
    private const int NumberOfCardsThatTheDeckMustHave = 60;
    private const int MaximumNumberOfCardsThatCanBeRepeated = 3;
    private const int MaximumNumberOfUniqueCardsThatCanBeRepeated = 1;
    private const int MaximumNumberOfSetupCardsThatCanBeRepeated = NumberOfCardsThatTheDeckMustHave;
    
    private readonly List<Card> _cardsToValidate;
    private readonly Superstar? _superstarCardToValidate;
    private readonly SuperstarLogosOptions _superstarLogoUtils;

    public DeckOfCardsValidator(List<Card> cardsToValidate, Superstar? superstarCardToValidate)
    {
        _cardsToValidate = cardsToValidate;
        _superstarCardToValidate = superstarCardToValidate;
        _superstarLogoUtils = new SuperstarLogosOptions();
    }

    public void ValidateDeckOfCards()
    {
        if (!IsTheDeckLongEnough())
            throw new InvalidDeckOfCards("El mazo no tiene la cantidad adecuada de cartas");
        if (!DoesTheDeckContainSuperstar())
            throw new InvalidDeckOfCards("El mazo no contiene una carta de tipo Superstar");
        if (!DoesTheDeckHaveRepeatedCards())
            throw new InvalidDeckOfCards("El mazo tiene cartas que no pueden estar repetidas");
        if (!DoesTheDeckHasHeelNandFaceCardsSimultaneously())
            throw new InvalidDeckOfCards("El mazo tiene cartas Heel y Face simultaneamente");
        if (!DoesTheCardsOfTheDeckMatchTheSuperstarLogo())
            throw new InvalidDeckOfCards("El mazo tiene cartas que no coinciden con el logo de su Superstar");
    }

    private bool IsTheDeckLongEnough()
    {
        return _cardsToValidate.Count == NumberOfCardsThatTheDeckMustHave;
    }

    private bool DoesTheDeckContainSuperstar()
    {
        return _superstarCardToValidate != null;
    }
    
    private bool DoesTheDeckHaveRepeatedCards()
    {
        Dictionary<string, int> enumerationOfCardTitles = EnumerateCardTitles(_cardsToValidate);
        foreach (var (cardTitle, numberOfTimesRepeated) in enumerationOfCardTitles)
        {
            if (DoesTheCardHaveCertainSubtype(cardTitle, CardSubtype.Unique) &&
                numberOfTimesRepeated > MaximumNumberOfUniqueCardsThatCanBeRepeated)
                return false;
            if (DoesTheCardHaveCertainSubtype(cardTitle, CardSubtype.SetUp) && 
                numberOfTimesRepeated > MaximumNumberOfSetupCardsThatCanBeRepeated)
                return false;
            if (!DoesTheCardHaveCertainSubtype(cardTitle, CardSubtype.SetUp) && 
                numberOfTimesRepeated > MaximumNumberOfCardsThatCanBeRepeated)
                return false;
        }
        return true;
    }
    
    private bool DoesTheDeckHasHeelNandFaceCardsSimultaneously()
    {
        bool DoesTheDeckHasHeelCard = CheckIfDeckHasAnyCardSubtype(CardSubtype.Heel);
        bool DoesTheDeckHasFaceCard = CheckIfDeckHasAnyCardSubtype(CardSubtype.Face);

        return !(DoesTheDeckHasHeelCard && DoesTheDeckHasFaceCard);
    }

    private bool DoesTheCardsOfTheDeckMatchTheSuperstarLogo()
    {
        var allSuperstarLogos = SuperstarLogosOptions.GetAllSuperstarLogosInAList();
        allSuperstarLogos.Remove(_superstarCardToValidate.Logo);

        return _cardsToValidate
            .SelectMany(card => card.Subtypes)
            .All(subtype => TryToValidateSubtypeAsSuperstarLogo(subtype, allSuperstarLogos));
    }
    
    private static Dictionary<string, int> EnumerateCardTitles(List<Card> cardsToEnumerate)
    {
        return cardsToEnumerate.GroupBy(card => card.ViewableCardInfo.Title)
            .ToDictionary(group => group.Key, group => group.Count());
    }
    
    private bool TryToValidateSubtypeAsSuperstarLogo(CardSubtype subtype, List<SuperstarLogo> allSuperstarLogos)
    {
        try
        {
            var superstarLogo = SuperstarLogosOptions.GetSuperstarLogoFromText(subtype.ToString());
            return !allSuperstarLogos.Contains(superstarLogo);
        }
        catch (ArgumentException)
        {
            return true;
        }
    }

    private bool DoesTheCardHaveCertainSubtype(string cardTitle, CardSubtype subtypeSearched)
    {
        return _cardsToValidate.Any(card => card.ViewableCardInfo.Title == cardTitle && card.Subtypes.Contains(subtypeSearched));
    }
    
    private bool CheckIfDeckHasAnyCardSubtype(CardSubtype subtypeSearched)
    {
        return _cardsToValidate.SelectMany(card => card.Subtypes).Any(s => s == subtypeSearched);
    }
}