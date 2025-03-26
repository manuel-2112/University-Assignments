using RawDeal.Cards;

namespace RawDeal.Reversals.Conditions;

public class OnlySpecificCard : ReversalCondition
{
    private readonly CardTittle _onlyCardThatCanReverse;

    public OnlySpecificCard(CardTittle onlyCardThatCanReverse)
    {
        _onlyCardThatCanReverse = onlyCardThatCanReverse;
    }

    public override bool ConditionAreFulfilled(Play.Play play)
    {
        return play.Card.Title == _onlyCardThatCanReverse;
    }
}