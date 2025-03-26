using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class UndertakerAbility : Ability
{
    private const int AmountOfCardsToPutInHand = 1;
    private const int AmountOfCardsToDiscard = 2;
    private const int MinimumOfCardsToHave = 2;
    
    public UndertakerAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }
    
    public override void UseAbility()
    {
        AlreadyUsedHisAbility = true;
        var superstar = Game.Player.PlayerDeck.Superstar;
        Game.View.SayThatPlayerIsGoingToUseHisAbility(Game.Player.ObtainSuperstarName(),
            superstar.SuperstarAbilityDescription);
        DiscardCards(Game.Player.ObtainSuperstarName());
        PutRingSideCardInPlayerHand(Game.Player.ObtainSuperstarName());
    }

    private int AskPlayerToSelectCardToDiscard(List<string> cardsFormatted, string superstarWhoMustDiscard, 
        string superstarWhoDecidesWhatToDiscard, int totalCardsToDiscard)
    {
        return Game.View.AskPlayerToSelectACardToDiscard(
            cardsFormatted,
            superstarWhoMustDiscard,
            superstarWhoDecidesWhatToDiscard,
            totalCardsToDiscard);
    }

    private int AskPlayerToSelectACardToPutInHisHand(string superstarName, List<string> cardsFormatted)
    {
        return Game.View.AskPlayerToSelectCardsToPutInHisHand(
            superstarName,
            AmountOfCardsToPutInHand,
            cardsFormatted
        );
    }

    private void DiscardCards(string superstarName)
    {
        for (int numberOfCardsToDiscard = AmountOfCardsToDiscard; numberOfCardsToDiscard >= 1; numberOfCardsToDiscard--)
        {
            int indexOfCard = AskPlayerToSelectCardToDiscard(
                Game.Player.HandCards.FormatCardSetToAListOfStrings(),
                superstarName,
                superstarName,
                numberOfCardsToDiscard
            );
            var cardToDiscard = Game.Player.HandCards.GetAndRemoveCardWithIndex(indexOfCard);
            Game.Player.RingSideCards.AddCardToCardSet(cardToDiscard);
        }
    }

    private void PutRingSideCardInPlayerHand(string superstarName)
    {
        int indexOfCardToPutInHisHand = AskPlayerToSelectACardToPutInHisHand(
            superstarName, Game.Player.RingSideCards.FormatCardSetToAListOfStrings());
        var cardToPutInHisHand = Game.Player.RingSideCards.GetAndRemoveCardWithIndex(indexOfCardToPutInHisHand);
        Game.Player.HandCards.AddCardToCardSet(cardToPutInHisHand);
    }

    protected override bool ConditionAreFulfilled()
    {
        return Game.Player.HandCards.HasAtLeastAAmountOfCards(MinimumOfCardsToHave)
               && !AlreadyUsedHisAbility;
    }
}