namespace RawDeal.GameUtils;

public class FileReader
{
    protected static string ReadFile(string jsonPath)
    {
        return File.ReadAllText(jsonPath);
    }
}