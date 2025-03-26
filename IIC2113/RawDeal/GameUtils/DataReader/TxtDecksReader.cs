namespace RawDeal.GameUtils;

public class TxtDecksReader : FileReader
{
    public List<string> ReadTxtFileOfDeck(string deckRoute)
    {
        string txtFileContent = ReadFile(deckRoute);
        List<string> txtFileContentInList = new List<string>(txtFileContent.Split('\n'));
        return txtFileContentInList;
    }
}