using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class DiscardCardsOfBothPlayers : CardEffect
{
    private readonly int _numberOfCardsOfYou;
    private readonly int _numberOfCardsOfYourOpponent;
    
    public DiscardCardsOfBothPlayers(int numberOfCardsOfYou, int numberOfCardsOfYourOpponent)
    {
        _numberOfCardsOfYou = numberOfCardsOfYou;
        _numberOfCardsOfYourOpponent = numberOfCardsOfYourOpponent;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DiscardCardsOfYourOwn(player: game.Player,  numberOfCards: _numberOfCardsOfYou);
        DiscardCardsOfYourOpponent(opponent: game.Opponent,  numberOfCards: _numberOfCardsOfYourOpponent);
    }
}