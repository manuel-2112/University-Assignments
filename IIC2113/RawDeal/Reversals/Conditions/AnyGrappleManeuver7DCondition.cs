using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class AnyGrappleManeuver7DCondition : ReversalCondition
{
    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return play.PlayType == CardType.Maneuver
               && play.Card.Subtypes.Contains(CardSubtype.Grapple)
               && play.PlayDamage <= 7;
    }
}