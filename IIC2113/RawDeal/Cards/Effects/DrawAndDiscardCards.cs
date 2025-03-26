using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class DrawAndDiscardCards : CardEffect
{
    private readonly int _numberOfCardsToDraw;
    private readonly int _numberOfCardsToDiscard;
    
    public DrawAndDiscardCards(int numberOfCardsToDraw, int numberOfCardsToDiscard)
    {
        _numberOfCardsToDraw = numberOfCardsToDraw;
        _numberOfCardsToDiscard = numberOfCardsToDiscard;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DrawCardsOfYourChoice(player: game.Player,  numberOfCards: _numberOfCardsToDraw);
        DiscardCardsOfYourOwn(player: game.Player, numberOfCards: _numberOfCardsToDiscard);
    }
}