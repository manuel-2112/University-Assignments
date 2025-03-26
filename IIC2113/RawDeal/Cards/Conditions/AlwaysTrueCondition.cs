using RawDeal.Players;

namespace RawDeal.Cards.Conditions;

public class AlwaysTrueCondition : CardCondition
{
    public override bool ConditionAreFulfilled(Player player, Play.Play play) { return true; }
}