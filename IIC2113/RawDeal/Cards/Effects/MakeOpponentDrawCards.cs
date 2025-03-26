using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class MakeOpponentDrawCards : CardEffect
{
    private readonly int _numberOfCards;
    
    public MakeOpponentDrawCards(int numberOfCards)
    {
        _numberOfCards = numberOfCards;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        MakeOpponentDrawACard(opponent: game.Opponent,  numberOfCards: _numberOfCards);
    }
}