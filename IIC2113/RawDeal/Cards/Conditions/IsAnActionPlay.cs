using RawDeal.Players;

namespace RawDeal.Cards.Conditions;

public class IsAnActionPlay : CardCondition
{
    public override bool ConditionAreFulfilled(Player player, Play.Play play)
    {
        return play.PlayType == CardType.Action;
    }
}