using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class AnyStrikeManeuver7DCondition : ReversalCondition
{
    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return play.PlayType == CardType.Maneuver
               && play.Card.Subtypes.Contains(CardSubtype.Strike)
               && play.PlayDamage <= 7;
    }
}