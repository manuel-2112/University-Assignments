using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class NoAbility : Ability
{
    public NoAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }
    
    public override void UseAbility()
    {
    }
}