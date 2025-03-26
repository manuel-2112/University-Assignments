using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class DrawCardsFromRingside : CardEffect
{
    private readonly int _numberOfCards;
    
    public DrawCardsFromRingside(int numberOfCards)
    {
        _numberOfCards = numberOfCards;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DrawCardsFromRingside(player: game.Player,  numberOfCards: _numberOfCards);
    }
}