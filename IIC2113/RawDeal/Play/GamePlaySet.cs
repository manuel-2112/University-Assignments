using RawDeal.Cards;

namespace RawDeal.Play;

public class GamePlaySet<TPlay> : List<TPlay> where TPlay : Play
{
    public Play FindPlayByIndex(int indexOfPlay)
    {
        return this[indexOfPlay];
    }

    public void AddManyPlaysToPlaySetFromListOfCards(IEnumerable<(Card Card, int Index)> enumeratedCardsToAdd,
        bool addToTheBeginningOfThePlaySet = false)
    {
        foreach (var enumeratedCard in enumeratedCardsToAdd)
        {
            foreach (var playToAdd in from cardType in enumeratedCard.Card.Types where
                         cardType != CardType.Reversal select new Play(enumeratedCard.Card, cardType, enumeratedCard.Index))
                AddPlayToPlaySet(playToAdd, addToTheBeginningOfThePlaySet);
        }
    }

    public void AddManyReversalPlaysToPlaySetFromListOfCards(IEnumerable<(Card Card, int Index)> enumeratedCardsToAdd,
        bool addToTheBeginningOfThePlaySet = false)
    {
        foreach (var enumeratedCard in enumeratedCardsToAdd)
        {
            foreach (var playToAdd in from cardType in enumeratedCard.Card.Types where
                         cardType == CardType.Reversal select new Play(enumeratedCard.Card, cardType, enumeratedCard.Index))
                AddPlayToPlaySet(playToAdd, addToTheBeginningOfThePlaySet);
        }
    }

    public List<string> FormatPlaySetToAListOfStrings()
    {
        return this.Select(play => play.FormatPlayToString()).ToList();
    }
    
    public void EmptyPlaySet()
    {
        Clear();
    }
    
    public bool IsPlaySetEmpty()
    {
        return Count == 0;
    }
    
    private void AddPlayToPlaySet(Play playToAdd, bool addToTheBeginningOfThePlaySet)
    {
        TPlay convertedPlay = (TPlay)(object)playToAdd;
        if (addToTheBeginningOfThePlaySet)
            Insert(0, convertedPlay);
        else
            Add(convertedPlay);
    }
}