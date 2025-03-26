using RawDeal.Cards;
using RawDeal.Players;

namespace RawDeal.Reversals;

public class ReturnHashSymbolDamage : ReversalEffect
{
    public override void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard)
    {
        int damageOfPlayReversed = playReversed.PlayDamage;
        playerWhoGotReversed.ApplyDamageToPlayer(damage: damageOfPlayReversed,
            damageCover: playerWhoGotReversed.PlayerDeck.Superstar.SuperstarAbility.GetDamageCover(),
            damageBonus: playerWhoMadeReversal.PlayerDeck.Superstar.SuperstarAbility.GetDamageCover());
    }
}