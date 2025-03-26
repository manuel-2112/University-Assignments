using RawDeal.Players;
using RawDeal.GameUtils;
using RawDeal.Cards;
using RawDeal.Superstars;
using RawDealView;

namespace RawDeal;

public class Game
{
    
    private string _deckFolder;
    private GameResourcesInitializer _gameResources;
    public View View;
    public Player Player;
    public Player Opponent;
    public GameCardSet<Card> GameCardSet { get; }
    public GameSuperstarSet<Superstar> GameSuperstarSet { get; }
    public GameTurnController GameTurnController { get; set; }


    public Game(View view, string deckFolder)
    {
        View = view;
        _deckFolder = deckFolder;
        GameCardSet = new GameCardSet<Card>(GameCardSetOption.Game);
        GameSuperstarSet = new GameSuperstarSet<Superstar>();
        _gameResources = new GameResourcesInitializer();
        Player = new Player(this);
        Opponent = new Player(this);

        CreateGameResources();
    }

    public void Play()
    {
        if (!LetPlayersChooseADeckOfCardsAndValidateIt()) return;
        CheckWhichPlayerStart();
        while (true)
        {
            try
            {
                GameTurnController.StartATurn();
                GameTurnController.ExchangePlayersRoles();
                CanAPlayerKeepPlaying();
            }
            catch (GameMustEnd)
            {
                View.CongratulateWinner(CheckWhichPlayerWonAndReturnHisName());
                break;
            }
        }
    }

    private void CreateGameResources()
    {
        GameTurnController = new GameTurnController(this);
        GameSuperstarSet.AddManySuperstarsToSuperstarSet(_gameResources.InitializeAllSuperstars(this));
        GameCardSet.AddManyCardsToCardSet(_gameResources.InitializeAllCards());
    }

    private bool LetPlayersChooseADeckOfCardsAndValidateIt()
    {
        if (!Player.ChooseDeckOfCardsAndValidateIt(_deckFolder))
            return false;
        if (!Opponent.ChooseDeckOfCardsAndValidateIt(_deckFolder))
            return false;
        return true;
    }

    private void CheckWhichPlayerStart()
    {
        int playerSuperstarValue = Player.PlayerDeck.Superstar.SuperstarValue;
        int opponentSuperstarValue = Opponent.PlayerDeck.Superstar.SuperstarValue;
        if (opponentSuperstarValue > playerSuperstarValue)
            GameTurnController.ExchangePlayersRoles();
    }

    private void CanAPlayerKeepPlaying()
    {
        if (Player.ArsenalCards.IsCardSetEmpty())
        {
            Opponent.PlayerWonTheGame();
            throw new GameMustEnd();
        }
        if (Opponent.ArsenalCards.IsCardSetEmpty())
        {
            Player.PlayerWonTheGame();
            throw new GameMustEnd();
        }
    }

    private string CheckWhichPlayerWonAndReturnHisName()
    {
        return Player.WonTheGame ? Player.PlayerDeck.Superstar.Name : Opponent.PlayerDeck.Superstar.Name;
    }

}