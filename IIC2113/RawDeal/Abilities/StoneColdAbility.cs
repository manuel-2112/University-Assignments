using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class StoneColdAbility : Ability
{
    private const int AmountOfCardsToDraw = 1;
    
    public StoneColdAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }
    
    public override void UseAbility()
    {
        AlreadyUsedHisAbility = true;
        var superstar = Game.Player.PlayerDeck.Superstar;
        Game.View.SayThatPlayerIsGoingToUseHisAbility(Game.Player.ObtainSuperstarName(),
            superstar.SuperstarAbilityDescription);
        DrawACard();
        ReturnHandCardToArsenal(Game.Player.ObtainSuperstarName(),
            Game.Player.HandCards.FormatCardSetToAListOfStrings());
    }

    private void DrawACard()
    {
        Game.Player.DrawACard(numberOfCardsToDraw: AmountOfCardsToDraw,
            notifyThatPlayerWillDrawCards: true);
    }

    private void ReturnHandCardToArsenal(string superstarName, List<string> cardFormatted)
    {
        int cardIndex = GetCardIndexOfHandToReturnToArsenal(superstarName, cardFormatted);
        var cardToReturn = Game.Player.HandCards.GetAndRemoveCardWithIndex(cardIndex);
        Game.Player.ArsenalCards.AddCardToCardSet(cardToReturn);
    }

    private int GetCardIndexOfHandToReturnToArsenal(string superstarName, List<string> cardFormatted)
    {
        return Game.View.AskPlayerToReturnOneCardFromHisHandToHisArsenal(superstarName, cardFormatted);
    }

    protected override bool ConditionAreFulfilled()
    {
        return !Game.Player.ArsenalCards.IsCardSetEmpty() && !AlreadyUsedHisAbility;
    }
}