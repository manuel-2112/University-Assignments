using RawDeal.Cards;
using RawDeal.Reversals;
using RawDealView.Formatters;

namespace RawDeal.Play;

public class Play : IViewablePlayInfo
{
    private CardTypeOptions _cardTypeUtil = new();
    public readonly Card Card;
    public IViewableCardInfo CardInfo { get; }
    public string PlayedAs { get; }
    public readonly CardType PlayType;
    public readonly int IndexOfCardInHand;
    public int PlayDamage;
    public int FortitudeCoverForReversal = 0;

    public Play(Card cardOfPlay, CardType cardType, int indexOfCardInHand)
    {
        Card = cardOfPlay;
        CardInfo = cardOfPlay.ViewableCardInfo;
        PlayedAs = _cardTypeUtil.GetFormattedCardType(cardType);
        IndexOfCardInHand = indexOfCardInHand;
        PlayType = cardType;
        PlayDamage = cardOfPlay.Damage;
    }

    public string FormatPlayToString()
    {
        return Formatter.PlayToString(this);
    }
}