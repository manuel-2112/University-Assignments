namespace RawDeal.Cards;

public class GameCardSet<TCard> : List<TCard> where TCard : Card
{
    private GameCardSetOption _cardSet;

    public GameCardSet(GameCardSetOption cardSetOption)
    {
        _cardSet = cardSetOption;
    }

    public Card? GetAndRemoveFirstCard()
    {
        return GetAndRemoveCardWithIndex(0);
    }

    public TCard? GetAndRemoveCardWithIndex(int indexOfWantedCard)
    {
        try
        {
            TCard? card = this[indexOfWantedCard];
            RemoveAt(indexOfWantedCard);
            return card;
        }
        catch (ArgumentOutOfRangeException)
        {
            return null;
        }
    }

    public void AddManyCardsToCardSet(List<TCard> cardsToAdd, bool addToTheBeginningOfTheCardSet = false)
    {
        foreach (var card in cardsToAdd)
        {
            AddCardToCardSet(card, addToTheBeginningOfTheCardSet);
        }
    }

    public void AddCardToCardSet(TCard cardToAdd, bool addToTheBeginningOfTheCardSet = false)
    {
        if (addToTheBeginningOfTheCardSet)
            Insert(0, cardToAdd);
        else
            Add(cardToAdd);
    }

    public TCard? FindCardByTitle(string cardTitle)
    {
        return this.FirstOrDefault(card => card.ViewableCardInfo.Title ==  cardTitle);
    }

    public List<string> FormatCardSetToAListOfStrings()
    {
        return this.Select(card => card.FormatCardToString()).ToList();
    }
    
    public IEnumerable<(TCard Card, int Index)> ObtainReversalCardsWithLoweFortitude(Play.Play play, int fortitudeValue)
    {
        var enumeratedCardSet = ObtainCardsWithLowerFortitudeValue(fortitudeValue);
        return enumeratedCardSet.Where(item => item.Card.Types.Contains(CardType.Reversal) && 
                                               item.Card.ReversalCondition.ConditionAreFulfilled(play));
    }

    public IEnumerable<(TCard Card, int Index)> ObtainCardsWithLowerFortitudeValue(int fortitudeValue)
    {
        var enumeratedCardSet = EnumerateTheCardSetCards();
        return enumeratedCardSet.Where(item => item.Card.Fortitude <= fortitudeValue);
    }

    public IEnumerable<(TCard Card, int Index)> EnumerateTheCardSetCards(int startingNumber = 0)
    {
        return this.Select((card, index) => (card, index + startingNumber));
    }

    public void EmptyCardSet()
    {
        Clear();
    }

    public bool IsCardSetEmpty()
    {
        return Count == 0;
    }

    public bool HasAtLeastAAmountOfCards(int amountOfCards)
    {
        return Count >= amountOfCards;
    }
}