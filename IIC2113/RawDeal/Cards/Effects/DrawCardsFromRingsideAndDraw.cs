namespace RawDeal.Cards.Effects;

public class DrawCardsFromRingsideAndDraw : CardEffect
{
    private readonly int _numberOfCardsToRecover;
    private readonly int _numberOfCardsToDraw;
    
    public DrawCardsFromRingsideAndDraw(int numberOfCardsToRecover, int numberOfCardsToDraw)
    {
        _numberOfCardsToRecover = numberOfCardsToRecover;
        _numberOfCardsToDraw = numberOfCardsToDraw;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DrawCardsFromRingside(player: game.Player,  numberOfCards: _numberOfCardsToRecover);
        DrawCardsOfYourChoice(player: game.Player,  numberOfCards: _numberOfCardsToDraw);
    }
}