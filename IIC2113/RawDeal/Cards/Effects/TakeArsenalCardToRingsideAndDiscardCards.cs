using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class TakeArsenalCardToRingsideAndDiscardCards : CardEffect
{
    private readonly int _numberOfCardsToDiscard;
    
    public TakeArsenalCardToRingsideAndDiscardCards(int numberOfCardsToDiscard)
    {
        _numberOfCardsToDiscard = numberOfCardsToDiscard;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        TakeTopOfArsenalCardToRingSide(player: game.Player);
        DiscardCardsOfYourOpponent(game.Opponent, _numberOfCardsToDiscard);
    }
}