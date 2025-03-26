using RawDealView;

namespace RawDeal.GameUtils;

public class GameTurnController
{
    private readonly Game _game;
    public StartOfTurn StartOfTurn;
    public DrawSegment DrawSegment;
    public MainSegment MainSegment;
    public readonly ReversalController ReversalController;
    public bool IsAEffectInNextMove;
    public bool IsAReversalEffectInNextMove;
    public Play.Play LastPlay;

    public GameTurnController(Game game)
    {
        _game = game;
        ReversalController = new ReversalController(game);
        InitializeTurnSegments();
    }

    private void InitializeTurnSegments()
    {
        StartOfTurn = new StartOfTurn(_game, this);
        DrawSegment = new DrawSegment(_game, this);
        MainSegment = new MainSegment(_game, this);
    }

    private void ResetEffects()
    {
        IsAEffectInNextMove = false;
        IsAReversalEffectInNextMove = false;
        
    }

    public void StartATurn()
    {
        var superstar = _game.Player.PlayerDeck.Superstar;
        _game.View.SayThatATurnBegins(_game.Player.ObtainSuperstarName());
        try
        {
            StartOfTurn.PlaySegment();
            DrawSegment.PlaySegment();
            MainSegment.PlaySegment();
            ResetEffects();
        }
        catch (TurnMustEnd) { }
        finally
        {
            superstar.SuperstarAbility.ResetAbilityUsage();
        }
    }
    
    public void ExchangePlayersRoles()
    {
        (_game.Player, _game.Opponent) = (_game.Opponent, _game.Player);
    }

    public void AnnouncePlayersStats()
    {
        _game.View.ShowGameInfo(
            new PlayerInfo(
                _game.Player.ObtainSuperstarName(),
                _game.Player.Fortitude,
                _game.Player.HandCards.Count,
                _game.Player.ArsenalCards.Count
            ),
            new PlayerInfo(
                _game.Opponent.ObtainSuperstarName(),
                _game.Opponent.Fortitude,
                _game.Opponent.HandCards.Count,
                _game.Opponent.ArsenalCards.Count
            )
        );
    }
}