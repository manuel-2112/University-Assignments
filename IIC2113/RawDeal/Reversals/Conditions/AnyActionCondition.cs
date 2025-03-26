using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class AnyActionCondition : ReversalCondition
{
    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return play.PlayType == CardType.Action;
    }
}