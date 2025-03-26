namespace RawDeal.Cards.Effects;

public class TakeArsenalCardToRingsideAndDrawCards : CardEffect
{
    private readonly int _numberOfCardsToDiscard;
    
    public TakeArsenalCardToRingsideAndDrawCards(int numberOfCardsToDiscard)
    {
        _numberOfCardsToDiscard = numberOfCardsToDiscard;
    }

    public override void DoCardEffect(Game game, Play.Play play)
    {
        TakeTopOfArsenalCardToRingSide(player: game.Player);
        DrawCardsOfYourChoice(game.Player, _numberOfCardsToDiscard);
    }
}