using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class AnyManeuverCondition : ReversalCondition
{
    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return play.PlayType == CardType.Maneuver;
    }
}