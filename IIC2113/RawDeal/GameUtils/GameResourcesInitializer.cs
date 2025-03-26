using RawDeal.Cards;
using RawDeal.Superstars;

namespace RawDeal.GameUtils;

public class GameResourcesInitializer
{
    private readonly JsonCardsReader _jsonCardsReader = new();
    private readonly JsonSuperstarReader _jsonSuperstarReader = new();
    
    public List<Card> InitializeAllCards()
    {
        List<JsonCardModel> listOfCardsInformation = _jsonCardsReader.ReadCardsData();
        return listOfCardsInformation.Select(jsonCardInfo => new Card(jsonCardInfo)).ToList();
    }

    public List<Superstar> InitializeAllSuperstars(Game game)
    {
        List<JsonSuperstarModel> listOfSuperstarsInformation = _jsonSuperstarReader.ReadSuperstarData();
        return listOfSuperstarsInformation.Select(jsonSuperstarInfo => new Superstar(jsonSuperstarInfo, game)).ToList();
    }
}