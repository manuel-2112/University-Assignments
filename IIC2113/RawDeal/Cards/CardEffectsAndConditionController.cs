using RawDeal.Cards.Conditions;
using RawDeal.Cards.Effects;
using RawDeal.Reversals;
using RawDeal.Reversals.Conditions;

namespace RawDeal.Cards;

public class CardEffectAndConditionController : Dictionary<CardTittle, (CardCondition Condition, CardEffect Effect)>
{
    public static ReversalCondition SetUpReversalCardCondition(CardTittle cardTittle)
    {
        if(cardTittle == CardTittle.StepAside)
            return new AnyStrikeManeuverCondition();
        if(cardTittle == CardTittle.EscapeMove)
            return new AnyGrappleManeuverCondition(); 
        if(cardTittle == CardTittle.BreakTheHold)
            return new AnySubmissionManeuverCondition();
        if(cardTittle == CardTittle.NoChanceInHell)
            return new AnyActionCondition();
        if(cardTittle == CardTittle.RollingTakedown)
            return new AnyGrappleManeuver7DCondition();
        if(cardTittle == CardTittle.ElbowToTheFace)
            return new AnyManeuver7DCondition();
        if(cardTittle == CardTittle.KneeToTheGut)
            return new AnyStrikeManeuver7DCondition();
        if(cardTittle == CardTittle.ManagerInterferes)
            return new AnyManeuverCondition();
        if(cardTittle == CardTittle.CleanBreak)
            return new OnlySpecificCard(CardTittle.JockeyingForPosition);
        if(cardTittle == CardTittle.JockeyingForPosition)
            return new OnlySpecificCard(CardTittle.JockeyingForPosition);
        if(cardTittle == CardTittle.BellyToBellySuplex)
            return new OnlySpecificCard(CardTittle.BellyToBellySuplex);
        if(cardTittle == CardTittle.VerticalSuplex)
            return new OnlySpecificCard(CardTittle.VerticalSuplex);
        if(cardTittle == CardTittle.BellyToBackSuplex)
            return new OnlySpecificCard(CardTittle.BellyToBackSuplex);
        if(cardTittle == CardTittle.Ensugiri)
            return new OnlySpecificCard(CardTittle.Ensugiri);
        if(cardTittle == CardTittle.DropKick)
            return new OnlySpecificCard(CardTittle.DropKick);
        if(cardTittle == CardTittle.DoubleArmDdt)
            return new OnlySpecificCard(CardTittle.BackBodyDrop);
        if(cardTittle == CardTittle.IrishWhip)
            return new OnlySpecificCard(CardTittle.IrishWhip);
        if(cardTittle == CardTittle.ChynaInterferes)
            return new AnyManeuverCondition();
        return new NoReversalCondition();
    }

    public static ReversalEffect SetUpReversalCardEffect(CardTittle cardTittle)
    {
        if(cardTittle == CardTittle.RollingTakedown)
            return new ReturnHashSymbolDamage();
        if(cardTittle == CardTittle.ElbowToTheFace)
            return new ReverseDamage();
        if(cardTittle == CardTittle.KneeToTheGut)
            return new ReturnHashSymbolDamage();
        if(cardTittle == CardTittle.ManagerInterferes)
            return new DrawACard();
        if(cardTittle == CardTittle.CleanBreak)
            return new Discard4CardsAndDrawACard();
        if(cardTittle == CardTittle.JockeyingForPosition)
            return new AskEffectForJockeyForPosition();
        if(cardTittle == CardTittle.ChynaInterferes)
            return new DrawTwoCards();
        return new NoReversalEffect();
    }
    
    public CardEffectAndConditionController()
    {
        Add(CardTittle.JockeyingForPosition, (new IsAnActionPlay(), new JockeyingForPosition()));
        
        //Discard 1 card of your choice
        Add(CardTittle.HeadButt, (new AlwaysTrueCondition(), new DiscardCards(1)));
        Add(CardTittle.ArmDrag, (new AlwaysTrueCondition(), new DiscardCards(1)));
        Add(CardTittle.ArmBar, (new AlwaysTrueCondition(), new DiscardCards(1)));
        
        //Make Opponent discard 1 card
        Add(CardTittle.BearHug, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.ChokeHold, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.AnkleLock, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.SpinningHeelKick, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.SamoanDrop, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.PowerSlam, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.BostonCrab, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.TortureRack, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        Add(CardTittle.FigureFourLegLock, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(1)));
        
        //Make Opponent discard 2 cards
        Add(CardTittle.PumpHandleSlam, (new AlwaysTrueCondition(), new MakeOpponentDiscardCards(2)));
        
        //Discard 1 card of your opponent and yours
        Add(CardTittle.Bulldog, (new AlwaysTrueCondition(), new DiscardCardsOfBothPlayers(
            numberOfCardsOfYou: 1, numberOfCardsOfYourOpponent: 1)));
        
        //Take the top card of your Arsenal and put it into your Ringside pile
        Add(CardTittle.Kick, (new AlwaysTrueCondition(), new TakeArsenalCardToRingside()));
        Add(CardTittle.RunningElbowSmash, (new AlwaysTrueCondition(), new TakeArsenalCardToRingside()));
        
        //Draw a card
        Add(CardTittle.DoubleLegTakedown, (new AlwaysTrueCondition(), new DrawCards(1)));
        Add(CardTittle.ReverseDdt, (new AlwaysTrueCondition(), new DrawCards(1)));
        
        //Make your opponent draw a card
        Add(CardTittle.HeadlockTakedown, (new AlwaysTrueCondition(), new MakeOpponentDrawCards(1)));
        Add(CardTittle.StandingSideHeadlock, (new AlwaysTrueCondition(), new MakeOpponentDrawCards(1)));
        
        //Take the top card of your Arsenal and put it into your Ringside pile and discard 2 cards
        Add(CardTittle.PressSlam, (new AlwaysTrueCondition(), new TakeArsenalCardToRingsideAndDiscardCards(2)));
        Add(CardTittle.Ddt, (new AlwaysTrueCondition(), new TakeArsenalCardToRingsideAndDiscardCards(2)));
        
        //Take the top card of your Arsenal and put it into your Ringside pile and draw 1 card
        Add(CardTittle.FishermansSuplex, (new AlwaysTrueCondition(), new TakeArsenalCardToRingsideAndDrawCards(1)));
        
        //Draw 3 cards and discard 1
        Add(CardTittle.OfferHandshake, (new AlwaysTrueCondition(), new DrawAndDiscardCards(
            numberOfCardsToDraw: 3, numberOfCardsToDiscard: 1)));
        
        //Opponent must discard 1 card, Player draw 1
        Add(CardTittle.GuillotineStretch, (new AlwaysTrueCondition(), new OpponentDiscardAndDrawCards(
            numberOfCardsToDraw: 1, numberOfCardsToDiscard: 1)));
        
        //Discard 1, and opponent 4 cards. Must have 2+ in hand
        Add(CardTittle.SpitAtOpponent, (new MustHaveMinimumOfCards(2), new DiscardCardsOfBothPlayers(
            numberOfCardsOfYou: 2, numberOfCardsOfYourOpponent: 4)));
        
        //Shuffle 2 cards from your Ringside into the Arsenal
        Add(CardTittle.ChickenWing, (new NoCondition(), new DrawCardsFromRingside(2)));
        
        //Shuffle cards from your Ringside into the Arsenal and then Draw Cards 
        Add(CardTittle.PuppiesPuppies, (new NoCondition(), new DrawCardsFromRingsideAndDraw(
            numberOfCardsToRecover: 5, numberOfCardsToDraw: 2)));
        Add(CardTittle.Recovery, (new NoCondition(), new DrawCardsFromRingsideAndDraw(
            numberOfCardsToRecover: 5, numberOfCardsToDraw: 1)));
        
        
        
    }

    public (CardCondition Condition, CardEffect Effect) FindConditionAndEffect(CardTittle cardTittle)
    {
        return ContainsKey(cardTittle) ? this[cardTittle] : (new NoCondition(), new NoEffect());
    }
}