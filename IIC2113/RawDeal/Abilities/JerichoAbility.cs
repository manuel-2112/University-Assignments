using RawDeal.Cards;
using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class JerichoAbility : Ability
{
    private const int AmountOfCardsToDiscard = 1;
    private const int MinimumOfCardsInHand = 1;

    public JerichoAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }
    
    public override void UseAbility()
    {
        AlreadyUsedHisAbility = true;
        var superstar = Game.Player.PlayerDeck.Superstar;
        Game.View.SayThatPlayerIsGoingToUseHisAbility(Game.Player.ObtainSuperstarName(), superstar.SuperstarAbilityDescription);
        DiscardCards();
    }

    private void DiscardCards()
    {
        var playerCardToDiscard = SelectCardToDiscard(Game.Player.HandCards, Game.Player.ObtainSuperstarName());
        var opponentCardToDiscard = SelectCardToDiscard(Game.Opponent.HandCards, Game.Opponent.ObtainSuperstarName());
        DiscardCard(Game.Player.RingSideCards, playerCardToDiscard);
        DiscardCard(Game.Opponent.RingSideCards, opponentCardToDiscard);
    }

    private int AskPlayerToSelectCardToDiscard(GameCardSet<Card> cardSet, string playerName)
    {
        return Game.View.AskPlayerToSelectACardToDiscard(
            cardSet.FormatCardSetToAListOfStrings(),
            playerName,
            playerName,
            AmountOfCardsToDiscard
        );
    }

    private Card SelectCardToDiscard(GameCardSet<Card> handCards, string playerName)
    {
        int indexOfCard = AskPlayerToSelectCardToDiscard(handCards, playerName);
        return handCards.GetAndRemoveCardWithIndex(indexOfCard);
    }

    private void DiscardCard(GameCardSet<Card> ringSideCards, Card card)
    {
        ringSideCards.AddCardToCardSet(card);
    }

    protected override bool ConditionAreFulfilled()
    {
        return Game.Player.HandCards.HasAtLeastAAmountOfCards(MinimumOfCardsInHand)
               && !AlreadyUsedHisAbility;
    }
}