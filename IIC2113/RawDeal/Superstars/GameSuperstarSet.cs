namespace RawDeal.Superstars;

public class GameSuperstarSet<TSuperstar> : List<TSuperstar> where TSuperstar : Superstar
{
    public void AddManySuperstarsToSuperstarSet(List<TSuperstar> superstarsToAdd, bool addToTheBeginningOfTheSuperstarSet = false)
    {
        foreach (var superstar in superstarsToAdd)
        {
            AddCardToSuperstarSet(superstar, addToTheBeginningOfTheSuperstarSet);
        }
    }

    public Superstar? FindSuperstarByName(string superstarName)
    {
        return this.FirstOrDefault(superstar => superstar.Name == superstarName);
    }
    
    private void AddCardToSuperstarSet(TSuperstar superstarToAdd, bool addToTheBeginningOfTheSuperstarSet = false)
    {
        if (addToTheBeginningOfTheSuperstarSet)
            Insert(0, superstarToAdd);
        else
            Add(superstarToAdd);
    }
}