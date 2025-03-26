namespace RawDeal.GameUtils;

public abstract class TurnSegment
{
    protected readonly Game Game;
    protected readonly GameTurnController GameTurnController;

    protected TurnSegment(Game game, GameTurnController gameTurnController)
    {
        Game = game;
        GameTurnController = gameTurnController;
    }

    public abstract void PlaySegment();
}