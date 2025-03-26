using RawDeal.Players;

namespace RawDeal.Cards.Conditions;

public class NoCondition : CardCondition
{
    public override bool ConditionAreFulfilled(Player player, Play.Play play) { return false; }
}