using RawDeal.Cards;
using RawDeal.Players;

namespace RawDeal.Reversals;

public class DrawACard : ReversalEffect
{
    public override void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard)
    {
        playerWhoMadeReversal.DrawACard(numberOfCardsToDraw: 1, notifyThatPlayerWillDrawCards: true);
        playerWhoGotReversed.ApplyDamageToPlayer(damage: reversalCard.Damage,
            damageCover: playerWhoGotReversed.PlayerDeck.Superstar.SuperstarAbility.GetDamageCover());
        playerWhoMadeReversal.SumFortitude(reversalCard.Damage);
    }
}