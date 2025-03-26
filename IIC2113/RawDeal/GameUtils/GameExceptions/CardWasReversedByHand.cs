namespace RawDeal.GameUtils;

public class CardWasReversedByHand : Exception
{
    public int PlayIndexChosen { get; }

    public CardWasReversedByHand(int playIndex) : base("La carta fue revertida")
    {
        PlayIndexChosen = playIndex;
    }
}