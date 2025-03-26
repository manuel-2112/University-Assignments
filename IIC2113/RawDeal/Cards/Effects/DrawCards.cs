using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class DrawCards : CardEffect
{
    private readonly int _numberOfCards;
    
    public DrawCards(int numberOfCards)
    {
        _numberOfCards = numberOfCards;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DrawCardsOfYourChoice(player: game.Player,  numberOfCards: _numberOfCards);
    }
}