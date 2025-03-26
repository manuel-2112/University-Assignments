using System.Text.RegularExpressions;
using RawDeal.Decks.Validation;
using RawDeal.Superstars;
using RawDeal.GameUtils;
using RawDeal.Cards;

namespace RawDeal.Decks;

public class DeckOfCards
{
    private const int SuperstarPositionInDeckOfCards = 1;
    private readonly Regex _regexToFormatSuperstarCard = new (@"\s*\(.*?\)$");
    private readonly TxtDecksReader _txtDeckOfCardsReader = new();
    private readonly Game _game;
    private DeckOfCardsValidator? _deckOfCardsValidator;
    public List<Card>? Cards { get; private set; }
    public Superstar? Superstar { get; private set; }
    public bool IsValid { get; private set; }
    

    public DeckOfCards(Game game, string playerDeckOfCardsRoute)
    {
        _game = game;
        List<string> cardsTitlesInSelectedDeck = ObtainCardsTitles(playerDeckOfCardsRoute);
        (List<Card> cards, Superstar superstar) =  AssignCardsAndSuperstar(cardsTitlesInSelectedDeck);
        ValidateDeckOfCards(cards, superstar);
    }

    private List<string> ObtainCardsTitles(string playerDeckOfCardsRoute)
    {
        return _txtDeckOfCardsReader.ReadTxtFileOfDeck(playerDeckOfCardsRoute);
    }

    private (List<Card>, Superstar) AssignCardsAndSuperstar(List<string> cardsTitlesInSelectedDeck)
    {
        (string superstarName, List<string> cardsTitles) = RemoveSuperstarFromListOfCards(cardsTitlesInSelectedDeck);
        Superstar = _game.GameSuperstarSet.FindSuperstarByName(superstarName);
        Cards = GetCardsFromDeckTitles(cardsTitles);
        return (Cards, Superstar);
    }

    private void ValidateDeckOfCards(List<Card> cards, Superstar superstar)
    {
        _deckOfCardsValidator = new DeckOfCardsValidator(cards, superstar);
        try
        {
            _deckOfCardsValidator.ValidateDeckOfCards();
            IsValid = true;
        }
        catch (InvalidDeckOfCards) { IsValid = false; }
    }

    private (string, List<string>) RemoveSuperstarFromListOfCards(List<string> listOfCardsTitles)
    {
        string superstarName = GetSuperstarNameFromFirstCardTitle(listOfCardsTitles[SuperstarPositionInDeckOfCards-1]);
        List<string> cardsTitles = listOfCardsTitles.Skip(SuperstarPositionInDeckOfCards).ToList();
        return (superstarName, cardsTitles);
    }
    
    private string GetSuperstarNameFromFirstCardTitle(string firstCardTitle)
    {
        return _regexToFormatSuperstarCard.Replace(firstCardTitle, "");
    }

    private List<Card?> GetCardsFromDeckTitles(List<string> cardsTitles)
    {
        return cardsTitles.Select(cardTitle => _game.GameCardSet.FindCardByTitle(cardTitle)).Reverse().ToList();
    }
}