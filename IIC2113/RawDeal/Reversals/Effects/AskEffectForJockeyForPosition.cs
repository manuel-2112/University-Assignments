using RawDeal.Cards;
using RawDeal.Players;
using RawDeal.Reversals.Conditions;
using RawDealView.Options;

namespace RawDeal.Reversals;

public class AskEffectForJockeyForPosition : ReversalEffect
{
    public override void DoReversalEffect(Player playerWhoMadeReversal, Player playerWhoGotReversed,
        Play.Play playReversed, Card reversalCard)
    {
        TheEffectOccursInTheNextMove = true;
        EffectInNextMove = playerWhoMadeReversal.AskPlayerToChooseJockingEffectForNextPlay();
    }

    public override void DoReversalEffectInNextMove(Play.Play play)
    {
        if (EffectInNextMove == SelectedEffect.NextGrappleIsPlus4D && PlayIsAGrappleManeuver(play))
            play.PlayDamage += 4;
        else if (EffectInNextMove == SelectedEffect.NextGrapplesReversalIsPlus8F)
        {
            if (play.PlayType == CardType.Maneuver && play.Card.Subtypes.Contains(CardSubtype.Grapple))
                play.FortitudeCoverForReversal = 8;
        }
    }

    public override void ResetEffectIfNecessary()
    {
        TheEffectOccursInTheNextMove = false;
    }
    
    private static bool PlayIsAGrappleManeuver(Play.Play play)
    {
        return play.PlayType == CardType.Maneuver && play.Card.Subtypes.Contains(CardSubtype.Grapple);
    }
}