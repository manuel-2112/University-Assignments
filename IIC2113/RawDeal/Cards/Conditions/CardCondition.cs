using RawDeal.Players;

namespace RawDeal.Cards.Conditions;

public class CardCondition
{
    public virtual bool ConditionAreFulfilled(Player player, Play.Play play) { return false; }
}