using RawDeal.Cards;
using RawDeal.Players;

namespace RawDeal.Reversals;

public class DrawTwoCards : ReversalEffect
{
    public override void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard)
    {
        playerWhoMadeReversal.DrawACard(numberOfCardsToDraw: 2, notifyThatPlayerWillDrawCards: true);
        playerWhoMadeReversal.SumFortitude(reversalCard.Damage);
        playerWhoGotReversed.ApplyDamageToPlayer(damage: reversalCard.Damage,
        damageCover: playerWhoGotReversed.PlayerDeck.Superstar.SuperstarAbility.GetDamageCover());
    }
}