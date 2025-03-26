using RawDeal.Cards;

namespace RawDeal.GameUtils;

public class CardWasReversedByDeck : Exception
{
    public bool PlayerCanUseSV { get; }
    public Card ReversalCard { get; }

    protected internal CardWasReversedByDeck(bool playerCanUseSV, Card reversalCard) : base("La carta fue revertida")
    {
        PlayerCanUseSV = playerCanUseSV;
        ReversalCard = reversalCard;
    }
}