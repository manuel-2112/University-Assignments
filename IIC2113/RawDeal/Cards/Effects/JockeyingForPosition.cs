using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class JockeyingForPosition : CardEffect
{
    public override void DoCardEffect(Game game, Play.Play play)
    {
        TheEffectOccursInTheNextMove = true;
        EffectInNextMove = game.Player.AskPlayerToChooseJockingEffectForNextPlay();
    }

    public override void DoCardEffectInNextMove(Game game, Play.Play play)
    {
        if (EffectInNextMove == SelectedEffect.NextGrappleIsPlus4D && PlayIsAGrappleManeuver(play))
            play.PlayDamage += 4;
        else if (EffectInNextMove == SelectedEffect.NextGrapplesReversalIsPlus8F)
        {
            if (play.PlayType == CardType.Maneuver && play.Card.Subtypes.Contains(CardSubtype.Grapple))
                play.FortitudeCoverForReversal = 8;
        }
    }

    private static bool PlayIsAGrappleManeuver(Play.Play play)
    {
        return play.PlayType == CardType.Maneuver && play.Card.Subtypes.Contains(CardSubtype.Grapple);
    }
}