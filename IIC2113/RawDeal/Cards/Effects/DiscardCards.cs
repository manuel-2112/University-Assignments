using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class DiscardCards : CardEffect
{
    private readonly int _numberOfCards;
    
    public DiscardCards(int numberOfCards)
    {
        _numberOfCards = numberOfCards;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DiscardCardsOfYourOwn(player: game.Player,  numberOfCards: _numberOfCards);
    }
}