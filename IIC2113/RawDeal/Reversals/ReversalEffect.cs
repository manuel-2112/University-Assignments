using RawDeal.Cards;
using RawDeal.Players;
using RawDealView.Options;

namespace RawDeal.Reversals;

public class ReversalEffect
{
    public bool TheEffectOccursInTheNextMove = false;
    protected static SelectedEffect EffectInNextMove { get; set; }

    public virtual void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard) { return; }

    public virtual void DoReversalEffectInNextMove(Play.Play play) { return; }

    public virtual void ResetEffectIfNecessary() { }
}