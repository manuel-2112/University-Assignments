using RawDeal.GameUtils;
using RawDeal.Superstars;

namespace RawDeal.Abilities;

public class AbilityController
{
    private readonly Game _game;
    
    public AbilityController(Game game)
    {
        _game = game;
    }

    public Ability FindAbilityWithLogo(SuperstarLogo superstarLogo)
    {
        if (superstarLogo == SuperstarLogo.Kane)
            return new KaneAbility(
                game: _game,
                turnSegment: _game.GameTurnController.StartOfTurn);
        if (superstarLogo == SuperstarLogo.TheRock)
            return new TheRockAbility(
                game: _game,
                turnSegment: _game.GameTurnController.StartOfTurn,
                youHaveToChooseToUseTheAbility: true);
        if (superstarLogo == SuperstarLogo.Undertaker)
            return new UndertakerAbility(
                game: _game,
                turnSegment: _game.GameTurnController.MainSegment,
                youHaveToChooseToUseTheAbility: true);
        if (superstarLogo == SuperstarLogo.Jericho)
            return new JerichoAbility(
                game: _game,
                turnSegment: _game.GameTurnController.MainSegment,
                youHaveToChooseToUseTheAbility: true);
        if (superstarLogo == SuperstarLogo.Mankind)
            return new MankindAbility(
                game: _game,
                turnSegment: _game.GameTurnController.DrawSegment);
        if (superstarLogo == SuperstarLogo.StoneCold)
            return new StoneColdAbility(
                game: _game,
                turnSegment: _game.GameTurnController.MainSegment,
                youHaveToChooseToUseTheAbility: true);
        return new NoAbility(game: _game);
    }
}