using RawDeal.Cards;
using RawDeal.Players;

namespace RawDeal.Reversals;

public class ReverseDamage : ReversalEffect
{
    public override void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard)
    {
        playerWhoGotReversed.ApplyDamageToPlayer(damage: 2,
            damageCover: playerWhoGotReversed.PlayerDeck.Superstar.SuperstarAbility.GetDamageCover());
        playerWhoMadeReversal.SumFortitude(2);
    }
}