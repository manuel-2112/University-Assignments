using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class AnyManeuver7DCondition : ReversalCondition
{
    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return play is { PlayType: CardType.Maneuver, PlayDamage: <= 7 };
    }
}