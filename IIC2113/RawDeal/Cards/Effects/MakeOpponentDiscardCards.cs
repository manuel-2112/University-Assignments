namespace RawDeal.Cards.Effects;

public class MakeOpponentDiscardCards : CardEffect
{
    private readonly int _numberOfCards;
    public MakeOpponentDiscardCards(int numberOfCards)
    {
        _numberOfCards = numberOfCards;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        DiscardCardsOfYourOwn(player: game.Opponent,  numberOfCards: _numberOfCards);
    }
}