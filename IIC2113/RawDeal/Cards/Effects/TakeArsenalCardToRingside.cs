using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class TakeArsenalCardToRingside : CardEffect
{
    public override void DoCardEffect(Game game, Play.Play play)
    {
        TakeTopOfArsenalCardToRingSide(player: game.Player);
    }
}