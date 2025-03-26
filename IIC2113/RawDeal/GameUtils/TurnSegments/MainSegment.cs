using RawDeal.Play;
using RawDealView.Options;

namespace RawDeal.GameUtils;

public class MainSegment : TurnSegment
{
    private GamePlaySet<Play.Play> GamePlaySet { get; }
    public GamePlaySet<Play.Play> ReversePlaySet { get; }

    public MainSegment(Game game, GameTurnController gameTurnController) : base(game, gameTurnController)
    {
        GamePlaySet = new GamePlaySet<Play.Play>();
        ReversePlaySet = new GamePlaySet<Play.Play>();
    }
    
    public override void PlaySegment()
    {
        NextPlay choiceOfNextPlay;
        do
        {
            GameTurnController.AnnouncePlayersStats();
            choiceOfNextPlay = DisplayGameChoicesAndReturnOne();
            if (choiceOfNextPlay == NextPlay.ShowCards)
                ShowCardsOfPlayer();
            else if (choiceOfNextPlay == NextPlay.PlayCard)
                ManagePlayCard();
            else if (choiceOfNextPlay == NextPlay.UseAbility)
                UseSuperstarAbility();
            else if (choiceOfNextPlay == NextPlay.GiveUp)
                GiveUp();
        } while (choiceOfNextPlay != NextPlay.EndTurn);
    }

    private NextPlay DisplayGameChoicesAndReturnOne()
    {
        var superstar = Game.Player.PlayerDeck.Superstar;
        if (superstar.SuperstarAbility.HaveToChooseToUseTheAbility && 
            superstar.SuperstarAbility.CanThePlayerUseHisAbility(this))
            return Game.View.AskUserWhatToDoWhenUsingHisAbilityIsPossible();
        return Game.View.AskUserWhatToDoWhenHeCannotUseHisAbility();
    }

    private void ShowCardsOfPlayer()
    {
        CardSet cardsChoice = Game.View.AskUserWhatSetOfCardsHeWantsToSee();
        if (cardsChoice == CardSet.Hand)
            Game.View.ShowCards(
                Game.Player.HandCards.FormatCardSetToAListOfStrings());
        else if (cardsChoice == CardSet.RingArea)
            Game.View.ShowCards(
                Game.Player.RingAreaCards.FormatCardSetToAListOfStrings());
        else if (cardsChoice == CardSet.RingsidePile)
            Game.View.ShowCards(
                Game.Player.RingSideCards.FormatCardSetToAListOfStrings());
        else if (cardsChoice == CardSet.OpponentsRingArea)
            Game.View.ShowCards(
                Game.Opponent.RingAreaCards.FormatCardSetToAListOfStrings());
        else if (cardsChoice == CardSet.OpponentsRingsidePile)
            Game.View.ShowCards(
                Game.Opponent.RingSideCards.FormatCardSetToAListOfStrings());
    }

    private void ManagePlayCard()
    {
        int numberOfPlayChosen = SelectCardToPlay(GetAvailablePlaysFormatted());
        if (numberOfPlayChosen == -1)
        {
            GamePlaySet.EmptyPlaySet();
            return;
        }
        Play.Play playChosen = GamePlaySet.FindPlayByIndex(numberOfPlayChosen);
        TryToPlayACard(playChosen);
    }

    private int SelectCardToPlay(List<string> availablePlays)
    {
        return Game.View.AskUserToSelectAPlay(availablePlays);
    }

    private List<string> GetAvailablePlaysFormatted()
    {
        var listOfCardsEnumerated = Game.Player.ObtainCardsAvailableToPlay();
        GamePlaySet.AddManyPlaysToPlaySetFromListOfCards(listOfCardsEnumerated);
        return GamePlaySet.FormatPlaySetToAListOfStrings();
    }

    private void TryToPlayACard(Play.Play playChosen)
    {
        Game.View.SayThatPlayerIsTryingToPlayThisCard(
            Game.Player.ObtainSuperstarName(),
            playChosen.FormatPlayToString());
        try
        {
            if (GameTurnController.IsAReversalEffectInNextMove)
            {
                GameTurnController.LastPlay.Card.ReversalEffect.DoReversalEffectInNextMove(playChosen);
                GameTurnController.LastPlay.Card.ReversalEffect.ResetEffectIfNecessary();
            }
            else if (GameTurnController.IsAEffectInNextMove)
            {
                GameTurnController.LastPlay.Card.Effect.Effect.DoCardEffectInNextMove(Game,playChosen);
            }
            GameTurnController.ReversalController.CheckIfOpponentWillReverseCardFromHand(playChosen);
            Game.Player.PlayACard(playChosen);
            GameTurnController.IsAEffectInNextMove = playChosen.Card.Effect.Effect.TheEffectOccursInTheNextMove;
        }
        catch (PlayerCantTakeMoreDamage)
        {
            Game.Player.PlayerWonTheGame();
            throw new GameMustEnd();
        }
        catch (CardWasReversedByHand reversedCard)
        {
            try
            {
                GameTurnController.ReversalController.DoReversalByHand(
                    play: playChosen,
                    opponent: Game.Opponent,
                    player: Game.Player,
                    reversePlaySet: ReversePlaySet,
                    playIndex: reversedCard.PlayIndexChosen);
                GameTurnController.IsAReversalEffectInNextMove = playChosen.Card.ReversalEffect.TheEffectOccursInTheNextMove;
                throw new TurnMustEnd();
            }
            catch (PlayerCantTakeMoreDamage)
            {
                Game.Opponent.PlayerWonTheGame();
                throw new GameMustEnd();
            }
            
        }
        catch (CardWasReversedByDeck reversedCard)
        {
            GameTurnController.ReversalController.DoReversalByDeck(
                play: playChosen,
                playerCanUseSV: reversedCard.PlayerCanUseSV,
                player: Game.Player,
                opponent: Game.Opponent);
            throw new TurnMustEnd();
        }
        finally
        {
            GameTurnController.LastPlay = playChosen;
            GamePlaySet.EmptyPlaySet();
            ReversePlaySet.EmptyPlaySet();
        }
    }

    private void UseSuperstarAbility()
    {
        Game.Player.PlayerDeck.Superstar.SuperstarAbility.UseAbility();
    }

    private void GiveUp()
    {
        Game.Opponent.PlayerWonTheGame();
        throw new GameMustEnd();
    }
}