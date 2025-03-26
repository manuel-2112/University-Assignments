using System.Text.Json;
namespace RawDeal.GameUtils;

public class JsonCardsReader : FileReader
{
    private readonly string _cardsPath = Path.Combine("data", "cards.json");
    
    public List<JsonCardModel> ReadCardsData()
    {
        string jsonCardsContent = ReadFile(_cardsPath);
        List<JsonCardModel> cardsDeserialize = JsonSerializer.Deserialize<List<JsonCardModel>>(jsonCardsContent);
        return cardsDeserialize;
    }
}