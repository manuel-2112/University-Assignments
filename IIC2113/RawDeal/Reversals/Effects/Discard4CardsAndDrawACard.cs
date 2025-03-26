using RawDeal.Cards;
using RawDeal.Players;

namespace RawDeal.Reversals;

public class Discard4CardsAndDrawACard : ReversalEffect
{
    public override void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard)
    {
        playerWhoGotReversed.DiscardCards(numberOfCardsToDiscard: 4);
        playerWhoMadeReversal.DrawACard(numberOfCardsToDraw: 1, notifyThatPlayerWillDrawCards: true);
        playerWhoMadeReversal.SumFortitude(reversalCard.Damage);
    }
}