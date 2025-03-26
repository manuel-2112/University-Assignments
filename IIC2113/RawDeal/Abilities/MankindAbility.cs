using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class MankindAbility : Ability
{
    private const int DamageCover = 1;
    
    public MankindAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }
    
    public override void UseAbility()
    {
        Game.GameTurnController.DrawSegment.LetPlayerDrawACard();
    }

    public override int GetDamageCover()
    {
        return -DamageCover;
    }
}