using System.Text.Json;
namespace RawDeal.GameUtils;

public class JsonSuperstarReader : FileReader
{
    private readonly string _superstarPath = Path.Combine("data", "superstar2.json");
    
    public List<JsonSuperstarModel> ReadSuperstarData()
    {
        string jsonSuperstarsContent = ReadFile(_superstarPath);
        List<JsonSuperstarModel> superstarDeserialize = JsonSerializer.Deserialize<List<JsonSuperstarModel>>(jsonSuperstarsContent);
        return superstarDeserialize;
    }
}