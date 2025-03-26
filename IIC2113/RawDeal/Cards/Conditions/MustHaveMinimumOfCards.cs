using RawDeal.Players;

namespace RawDeal.Cards.Conditions;

public class MustHaveMinimumOfCards : CardCondition
{
    private readonly int _minimumOfCards;
    
    public MustHaveMinimumOfCards(int minimumOfCards)
    {
        _minimumOfCards = minimumOfCards;
    }

    public override bool ConditionAreFulfilled(Player player, Play.Play play)
    {
        return player.HandCards.Count >= _minimumOfCards;
    }
}