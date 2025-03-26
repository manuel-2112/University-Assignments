using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class KaneAbility : Ability
{
    private const int AbilityDamage = 1;
    
    public KaneAbility(Game game, TurnSegment? turnSegment = null, bool youHaveToChooseToUseTheAbility = false)
        : base(game, turnSegment, youHaveToChooseToUseTheAbility)
    {
    }

    public override void UseAbility()
    {
        var superstar = Game.Player.PlayerDeck.Superstar;
        Game.View.SayThatPlayerIsGoingToUseHisAbility(Game.Player.ObtainSuperstarName(),
            superstar.SuperstarAbilityDescription);
        Game.Opponent.ApplyDamageToPlayer(AbilityDamage);
    }
}