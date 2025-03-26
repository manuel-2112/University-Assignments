using RawDeal.Cards;
using RawDeal.Play;
using RawDeal.Players;
using RawDeal.Superstars;

namespace RawDeal.GameUtils;

public class ReversalController
{
    private readonly Game _game;

    private readonly List<CardTittle> _cardMayNotBeReversed = new()
    {
        CardTittle.TreeOfWoe,
        CardTittle.AustinElbowSmash
    };

    public ReversalController(Game game)
    {
        _game = game;
    }

    public void CheckIfOpponentWillReverseCardFromHand(Play.Play play)
    {
        GamePlaySet<Play.Play> reversePlaySet = _game.GameTurnController.MainSegment.ReversePlaySet;
        Superstar opponentSuperstar = _game.Opponent.PlayerDeck.Superstar;
        AddReversalPlaysFromOpponentHand(play, reversePlaySet);
        if (CanThePlayerReverseFromHand(reversePlaySet))
        {
            int playIndex = ObtainWhichPlayIndexPlayerChose(opponentSuperstar, reversePlaySet);
            if (playIndex == -1) return;
            throw new CardWasReversedByHand(playIndex);
        }
    }
    
    public void DoReversalByHand(Play.Play play, Player opponent, Player player,
        GamePlaySet<Play.Play> reversePlaySet, int playIndex)
    {
        var reversalPlay = reversePlaySet.FindPlayByIndex(playIndex);
        var reversalCard = _game.Opponent.HandCards.GetAndRemoveCardWithIndex(reversalPlay.IndexOfCardInHand);
        var cardToPlay = _game.Player.HandCards.GetAndRemoveCardWithIndex(play.IndexOfCardInHand);
        _game.Opponent.RingAreaCards.AddCardToCardSet(reversalCard);
        _game.Player.RingSideCards.AddCardToCardSet(cardToPlay);
        _game.View.SayThatPlayerReversedTheCard(opponent.ObtainSuperstarName(), reversalPlay.FormatPlayToString());
        reversalCard.ReversalEffect.DoReversalEffect(
            playerWhoMadeReversal: opponent,playerWhoGotReversed: player,
            playReversed: play, reversalCard: reversalCard);
    }
    
    public void DoReversalByDeck(Play.Play play, Player opponent, bool playerCanUseSV,
        Player player)
    {
        _game.View.SayThatCardWasReversedByDeck(opponent.ObtainSuperstarName());
        if (playerCanUseSV && play.Card.StunValue > 0)
            GetCardsBecauseOfSV(stunValue: play.Card.StunValue, player: player);
    }
    
    public bool CheckIfCardMayNotBeReversed(CardTittle cardTittle)
    {
        return _cardMayNotBeReversed.Contains(cardTittle);
    }

    private void GetCardsBecauseOfSV(int stunValue, Player player)
    {
        int amountOfCardsToDraw = _game.View.AskHowManyCardsToDrawBecauseOfStunValue(
            player.ObtainSuperstarName(), stunValue);
        if (amountOfCardsToDraw == 0) return;
        _game.Player.DrawACard(numberOfCardsToDraw: amountOfCardsToDraw, notifyThatPlayerWillDrawCards: true);
    }

    private bool CanThePlayerReverseFromHand(GamePlaySet<Play.Play> reversePlaySet)
    {
        return !reversePlaySet.IsPlaySetEmpty();
    }

    private int ObtainWhichPlayIndexPlayerChose(Superstar opponentSuperstar, GamePlaySet<Play.Play> reversePlaySet)
    {
        List<string> applicableReversals = reversePlaySet.FormatPlaySetToAListOfStrings();
        return _game.View.AskUserToSelectAReversal(opponentSuperstar.Name, applicableReversals);
    }

    private void AddReversalPlaysFromOpponentHand(Play.Play play, GamePlaySet<Play.Play> reversePlaySet)
    {
        var reversalPlays = _game.Opponent.CanThePlayerReversePlayFromHand(play, _cardMayNotBeReversed);
        reversePlaySet.AddManyReversalPlaysToPlaySetFromListOfCards(reversalPlays);
    }
}