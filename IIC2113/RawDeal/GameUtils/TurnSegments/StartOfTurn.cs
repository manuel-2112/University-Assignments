using RawDeal.Superstars;

namespace RawDeal.GameUtils;

public class StartOfTurn : TurnSegment
{
    public StartOfTurn(Game game, GameTurnController gameTurnController) : base(game, gameTurnController) { }

    public override void PlaySegment()
    {
        CheckIfSuperstarWillUseAbility();
    }

    private void CheckIfSuperstarWillUseAbility()
    {
        var superstar = Game.Player.PlayerDeck.Superstar;
        if (DetermineIfSuperstarWillUseAbility(superstar))
            UseSuperstarAbility(superstar);
    }

    private bool DetermineIfSuperstarWillUseAbility(Superstar superstar)
    {
        if (!superstar.SuperstarAbility.CanThePlayerUseHisAbility(this)) return false;
        if (superstar.SuperstarAbility.HaveToChooseToUseTheAbility)
            return Game.View.DoesPlayerWantToUseHisAbility(superstar.Name);
        return true;
    }

    private void UseSuperstarAbility(Superstar superstar)
    {
        superstar.SuperstarAbility.UseAbility();
    }

}