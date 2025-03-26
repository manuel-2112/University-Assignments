using RawDeal.Abilities;
using RawDeal.GameUtils;

namespace RawDeal.Superstars;

public class Superstar
{
    public string Name { get; }
    public int HandSize { get; }
    public SuperstarLogo Logo { get; }
    public int SuperstarValue { get; }
    public Ability SuperstarAbility { get; }
    public string SuperstarAbilityDescription { get; }
    
    public Superstar(JsonSuperstarModel jsonSuperstarInfo, Game game)
    {
        var superstarLogoUtils = new SuperstarLogosOptions();
        var superstarAbilityUtils = new AbilityController(game);
        Name = jsonSuperstarInfo.Name;
        HandSize = jsonSuperstarInfo.HandSize;
        Logo = SuperstarLogosOptions.GetSuperstarLogoFromText(jsonSuperstarInfo.Logo);
        SuperstarValue = jsonSuperstarInfo.SuperstarValue;
        SuperstarAbilityDescription = jsonSuperstarInfo.SuperstarAbility;
        SuperstarAbility = superstarAbilityUtils.FindAbilityWithLogo(Logo);
    }

}