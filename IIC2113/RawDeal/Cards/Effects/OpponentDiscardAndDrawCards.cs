using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class OpponentDiscardAndDrawCards : CardEffect
{
    private readonly int _numberOfCardsToDraw;
    private readonly int _numberOfCardsToDiscard;
    
    public OpponentDiscardAndDrawCards(int numberOfCardsToDraw, int numberOfCardsToDiscard)
    {
        _numberOfCardsToDraw = numberOfCardsToDraw;
        _numberOfCardsToDiscard = numberOfCardsToDiscard;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DiscardCardsOfYourOpponent(opponent: game.Player, numberOfCards: _numberOfCardsToDiscard);
        DrawCardsOfYourChoice(player: game.Player,  numberOfCards: _numberOfCardsToDraw);
    }
}