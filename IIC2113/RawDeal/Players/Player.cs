using RawDeal.Cards;
using RawDeal.Decks;
using RawDeal.GameUtils;
using RawDealView.Options;

namespace RawDeal.Players;

public class Player
{
    private readonly Game _game;
    public readonly GameCardSet<Card> ArsenalCards;
    public readonly GameCardSet<Card> HandCards;
    public readonly GameCardSet<Card> RingSideCards;
    public readonly GameCardSet<Card> RingAreaCards;
    private readonly GameCardSet<Card> _temporaryDiscardedCards;
    public DeckOfCards PlayerDeck { get; private set; }
    public int Fortitude;
    public bool WonTheGame { get; private set; }

    public Player(Game game)
    {
        _game = game;
        Fortitude = 0;
        WonTheGame = false;
        ArsenalCards = new GameCardSet<Card>(GameCardSetOption.Arsenal);
        HandCards = new GameCardSet<Card>(GameCardSetOption.Hand);
        RingSideCards = new GameCardSet<Card>(GameCardSetOption.RingsidePile);
        RingAreaCards = new GameCardSet<Card>(GameCardSetOption.RingArea);
        _temporaryDiscardedCards = new GameCardSet<Card>(GameCardSetOption.TemporaryDiscard);
    }

    public bool ChooseDeckOfCardsAndValidateIt(string deckFolder)
    {
        string playerDeckOfCardsRoute = _game.View.AskUserToSelectDeck(deckFolder);
        PlayerDeck = new DeckOfCards(_game, playerDeckOfCardsRoute);
        return CheckIfDeckIsValidAndNotifyIt();
    }

    private bool CheckIfDeckIsValidAndNotifyIt()
    {
        if (!PlayerDeck.IsValid)
            _game.View.SayThatDeckIsInvalid();
        if (PlayerDeck.IsValid)
            BuildCardCollectionsAtTheBeginningOfTheGame();
        return PlayerDeck.IsValid;
    }

    private void BuildCardCollectionsAtTheBeginningOfTheGame()
    {
        int numberOfCardsToDraw = PlayerDeck.Superstar.HandSize;
        HandCards.AddManyCardsToCardSet(
            PlayerDeck.Cards.GetRange(0, numberOfCardsToDraw));
        ArsenalCards.AddManyCardsToCardSet(
            PlayerDeck.Cards.GetRange(numberOfCardsToDraw, PlayerDeck.Cards.Count - numberOfCardsToDraw));
    }

    public IEnumerable<(Card Card, int Index)> ObtainCardsAvailableToPlay()
    {
        return HandCards.ObtainCardsWithLowerFortitudeValue(Fortitude);
    }

    public void DrawACard(int numberOfCardsToDraw = 1, bool notifyThatPlayerWillDrawCards = false)
    {
        if (notifyThatPlayerWillDrawCards)
            _game.View.SayThatPlayerDrawCards(ObtainSuperstarName(), numberOfCardsToDraw);
        for (int i = 0; i < numberOfCardsToDraw; i++)
        {
            var drawnCard = ArsenalCards.GetAndRemoveFirstCard();
            if (drawnCard == null) continue;
            HandCards.AddCardToCardSet(drawnCard);
        }
    }

    public void PlayACard(Play.Play play)
    {
        _game.View.SayThatPlayerSuccessfullyPlayedACard();
        if (play.PlayType == CardType.Maneuver)
            ManageManeuverPlay(play);
        if (play.PlayType == CardType.Action)
            ManageActionPlay(play);
    }

    public void ApplyDamageToPlayer(int damage, int damageBonus = 0, int damageCover = 0, Play.Play? attackPlay = null)
    {
        int finalDamage = damage + damageBonus + damageCover;
        if (finalDamage == 0) return;
        (bool gotReverse, Card? reversalCard) = (false, null);
        _game.View.SayThatSuperstarWillTakeSomeDamage(ObtainSuperstarName(), finalDamage);
        for (int i = 0; i < finalDamage; i++)
        {
            var cardToDiscard = ArsenalCards.GetAndRemoveFirstCard();
            if (cardToDiscard == null) continue;
            _temporaryDiscardedCards.AddCardToCardSet(cardToDiscard);
            if (attackPlay == null) continue;
            if (!cardToDiscard.ReversalCondition.ConditionAreFulfilled(attackPlay)) continue;
            if (_game.GameTurnController.ReversalController.CheckIfCardMayNotBeReversed(attackPlay.Card.Title)) continue;
            if (cardToDiscard.Fortitude + attackPlay.FortitudeCoverForReversal > Fortitude) continue;
            (gotReverse, reversalCard) = (true, cardToDiscard);
            break;
        }
        NotifyDiscardedCards(finalDamage);
        RingSideCards.AddManyCardsToCardSet(_temporaryDiscardedCards);
        CheckIfPlayerTakeAllDamage(finalDamage, gotReverse, reversalCard);
        _temporaryDiscardedCards.EmptyCardSet();
    }

    public void SumFortitude(int fortitude)
    {
        Fortitude += fortitude;
    }

    public void PlayerWonTheGame()
    {
        WonTheGame = true;
    }

    public IEnumerable<(Card, int)> CanThePlayerReversePlayFromHand(Play.Play play, List<CardTittle> cardsTanMayNotBeReversed)
    {
        if (cardsTanMayNotBeReversed.Contains(play.Card.Title)) return Array.Empty<(Card, int)>();
        return HandCards.ObtainReversalCardsWithLoweFortitude(play,
            Fortitude - play.FortitudeCoverForReversal);
    }

    public SelectedEffect AskPlayerToChooseJockingEffectForNextPlay()
    {
        return _game.View.AskUserToSelectAnEffectForJockeyForPosition(ObtainSuperstarName());
    }

    public int AskPlayerHowManyCardsToDraw(int maximumNumberOfCards)
    {
        return _game.View.AskHowManyCardsToDrawBecauseOfACardEffect(ObtainSuperstarName(), maximumNumberOfCards);
    }

    public void DiscardCards(int numberOfCardsToDiscard, bool doesTheOpponentDecides = false)
    {
        if (HandCards.IsCardSetEmpty()) return;
        string superstarThatDecides = ObtainSuperstarName();
        if (doesTheOpponentDecides)
            superstarThatDecides = _game.Opponent.ObtainSuperstarName();
        for (int numberOfCards = numberOfCardsToDiscard; numberOfCards >= 1; numberOfCards--)
        {
            int indexOfCard = AskPlayerToSelectCardToDiscard(
                HandCards.FormatCardSetToAListOfStrings(),
                ObtainSuperstarName(),
                superstarThatDecides,
                numberOfCards
            );
            var cardToDiscard = HandCards.GetAndRemoveCardWithIndex(indexOfCard);
            RingSideCards.AddCardToCardSet(cardToDiscard);
        }
    }
    
    public void RecoverCards(int numberOfCardsToRecover = 1)
    {
        for (int i = numberOfCardsToRecover; i > 0; i--)
        {
            int cardIndexToRecover = _game.View.AskPlayerToSelectCardsToRecover(
                ObtainSuperstarName(), numberOfCardsToRecover,
                RingSideCards.FormatCardSetToAListOfStrings());
            var recoveredCard = RingSideCards.GetAndRemoveCardWithIndex(cardIndexToRecover);
            if (recoveredCard == null) break;
            ArsenalCards.AddCardToCardSet(recoveredCard, addToTheBeginningOfTheCardSet: true);
        }
    }

    public string ObtainSuperstarName()
    {
        return PlayerDeck.Superstar.Name;
    }
    
    private void ManageActionPlay(Play.Play play)
    {
        Card cardToPlay = HandCards.GetAndRemoveCardWithIndex(play.IndexOfCardInHand);
        if (CheckAndDoCardEffect(play, cardToPlay)) return;
        RingSideCards.AddCardToCardSet(cardToPlay);
        _game.View.SayThatPlayerMustDiscardThisCard(ObtainSuperstarName(), cardToPlay.ViewableCardInfo.Title);
        DrawACard(numberOfCardsToDraw: 1, notifyThatPlayerWillDrawCards: true);
    }

    private void ManageManeuverPlay(Play.Play play)
    {
        Card cardToPlay = HandCards.GetAndRemoveCardWithIndex(play.IndexOfCardInHand);
        CheckAndDoCardEffect(play, cardToPlay);
        RingAreaCards.AddCardToCardSet(cardToPlay);
        SumFortitude(play.Card.Damage);
        _game.Opponent.ApplyDamageToPlayer(
            damage: play.PlayDamage,
            damageBonus: PlayerDeck.Superstar.SuperstarAbility.GetDamageBonus(),
            damageCover: _game.Opponent.PlayerDeck.Superstar.SuperstarAbility.GetDamageCover(),
            attackPlay: play);
    }
    
    private int AskPlayerToSelectCardToDiscard(List<string> cardsFormatted, string superstarWhoMustDiscard, 
        string superstarWhoDecidesWhatToDiscard, int totalCardsToDiscard)
    {
        return _game.View.AskPlayerToSelectACardToDiscard(
            cardsFormatted,
            superstarWhoMustDiscard,
            superstarWhoDecidesWhatToDiscard,
            totalCardsToDiscard);
    }

    private void CheckIfPlayerTakeAllDamage(int damage, bool gotReverse, Card reversalCard)
    {
        bool playerTookAllDamage = damage == _temporaryDiscardedCards.Count;
        if (gotReverse)
        {
            _temporaryDiscardedCards.EmptyCardSet();
            throw new CardWasReversedByDeck(playerCanUseSV: !playerTookAllDamage, reversalCard: reversalCard);
        }
        if (!playerTookAllDamage)
            throw new PlayerCantTakeMoreDamage();
    }
    
    private bool CheckAndDoCardEffect(Play.Play play, Card cardToPlay)
    {
        if (!cardToPlay.Effect.Condition.ConditionAreFulfilled(this, play)) return false;
        cardToPlay.Effect.Effect.DoCardEffect(_game, play);
        return true;
    }

    private void NotifyDiscardedCards(int numberOfCardDiscarded)
    {
        var enumeratedCards = _temporaryDiscardedCards.EnumerateTheCardSetCards(1);
        foreach (var enumeratedCard in enumeratedCards)
        {
            _game.View.ShowCardOverturnByTakingDamage(
                enumeratedCard.Card.FormatCardToString(),
                enumeratedCard.Index ,
                numberOfCardDiscarded);
        }
    }
}