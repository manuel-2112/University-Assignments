using RawDeal.GameUtils;

namespace RawDeal.Abilities;

public class Ability
{
    public readonly bool HaveToChooseToUseTheAbility;
    protected readonly Game Game;
    private readonly TurnSegment? _turnSegment;
    protected bool AlreadyUsedHisAbility { set; get; }

    protected Ability(Game game,TurnSegment? turnSegment = null, bool haveToChooseToUseTheAbility = false)
    {
        Game = game;
        _turnSegment = turnSegment;
        HaveToChooseToUseTheAbility = haveToChooseToUseTheAbility;
        AlreadyUsedHisAbility = false;
    }

    public bool CanThePlayerUseHisAbility(TurnSegment turnSegment)
    {
        return turnSegment == _turnSegment && ConditionAreFulfilled();
    }

    public void ResetAbilityUsage()
    {
        AlreadyUsedHisAbility = false;
    }

    public virtual void UseAbility() { }

    public virtual int GetDamageBonus()
    {
        return 0;
    }
    
    public virtual int GetDamageCover()
    {
        return 0;
    }

    protected virtual bool ConditionAreFulfilled()
    {
        return true;
    }
}