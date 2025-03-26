using RawDeal.Players;
using RawDealView.Options;

namespace RawDeal.Cards.Effects;

public class CardEffect
{
    public bool TheEffectOccursInTheNextMove = false;
    protected static SelectedEffect EffectInNextMove { get; set; }
    public virtual void DoCardEffect(Game game, Play.Play play)
    { }
    
    public virtual void DoCardEffectInNextMove(Game game, Play.Play play)
    { }

    protected static void DiscardCardsOfYourOwn(Player player, int numberOfCards)
    {
        player.DiscardCards(numberOfCardsToDiscard: numberOfCards);
    }

    protected static void DiscardCardsOfYourOpponent(Player opponent, int numberOfCards)
    {
        opponent.DiscardCards(numberOfCardsToDiscard: numberOfCards, doesTheOpponentDecides: true);
    }
    
    protected static void MakeOpponentDrawACard(Player opponent, int numberOfCards)
    {
        opponent.DrawACard(numberOfCardsToDraw: numberOfCards,
            notifyThatPlayerWillDrawCards:true);
    }

    protected static void DrawCardsOfYourChoice(Player player, int numberOfCards)
    {
        int cardsToDraw = player.AskPlayerHowManyCardsToDraw(numberOfCards);
        player.DrawACard(numberOfCardsToDraw: cardsToDraw,
            notifyThatPlayerWillDrawCards:true);
    }

    protected static void TakeTopOfArsenalCardToRingSide(Player player)
    {
        var card = player.ArsenalCards.GetAndRemoveFirstCard();
        if (card != null)
            player.RingSideCards.AddCardToCardSet(card);
    }
    
    protected static void DrawCardsFromRingside(Player player, int numberOfCards)
    {
        player.RecoverCards(numberOfCardsToRecover: numberOfCards);
    }

}