using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class TheRockAbility : Ability
{
    private const int AmountOfCardsToRecover = 1;
    public TheRockAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }
    
    public override void UseAbility()
    {
        var superstarName = Game.Player.ObtainSuperstarName();
        var ringSideCards = Game.Player.RingSideCards;
        int indexOfCard = AskPlayerToSelectCardToRecover(superstarName,
            ringSideCards.FormatCardSetToAListOfStrings());
        var cardToRecover = ringSideCards.GetAndRemoveCardWithIndex(indexOfCard);
        Game.Player.ArsenalCards.AddCardToCardSet(cardToRecover);
    }

    private int AskPlayerToSelectCardToRecover(string superstarName, List<string> ringSideCardsFormatted)
    {
        return Game.View.AskPlayerToSelectCardsToRecover(
            superstarName,
            AmountOfCardsToRecover,
            ringSideCardsFormatted);
    }
    
    protected override bool ConditionAreFulfilled()
    {
        return !Game.Player.RingSideCards.IsCardSetEmpty();
    }
}