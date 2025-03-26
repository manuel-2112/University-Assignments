using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class AnyStrikeManeuverCondition : ReversalCondition
{
    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return (play.PlayType == CardType.Maneuver && play.Card.Subtypes.Contains(CardSubtype.Strike));
    }
}