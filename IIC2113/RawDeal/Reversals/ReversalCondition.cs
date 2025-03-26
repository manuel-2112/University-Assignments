using RawDeal.Cards;

namespace RawDeal.Reversals;

public abstract class ReversalCondition
{
    public virtual bool ConditionAreFulfilled(Play.Play play)
    {
        return false;
    }
}