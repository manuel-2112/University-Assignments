using RawDeal.Superstars;

namespace RawDeal.GameUtils;

public class DrawSegment : TurnSegment
{
    public DrawSegment(Game game, GameTurnController gameTurnController) : base(game, gameTurnController) { }
    
    public override void PlaySegment()
    {
        LetPlayerDrawACard();
        CheckIfSuperstarWillUseAbility();
    }

    public void LetPlayerDrawACard()
    {
        Game.Player.DrawACard();
    }
    
    private void CheckIfSuperstarWillUseAbility()
    {
        var superstar = Game.Player.PlayerDeck.Superstar;
        if (superstar.SuperstarAbility.CanThePlayerUseHisAbility(this))
            UseSuperstarAbility(superstar);
    }
    
    private void UseSuperstarAbility(Superstar superstar)
    {
        superstar.SuperstarAbility.UseAbility();
    }
}