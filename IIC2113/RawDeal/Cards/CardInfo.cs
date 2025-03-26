using RawDealView.Formatters;

namespace RawDeal.Cards;

public class CardInfo : IViewableCardInfo
{
    private readonly Card _card;
    private readonly CardTypeOptions _cardTypeUtil;
    private readonly CardSubTypeOptions _cardSubTypeUtil;
    private readonly CardTittleOptions _cardTittleUtil;
    public string Damage { get; }

    public CardInfo(Card card, string damageString)
    {
        _cardTypeUtil = new CardTypeOptions();
        _cardSubTypeUtil = new CardSubTypeOptions();
        _cardTittleUtil = new CardTittleOptions();
        _card = card;
        Damage = damageString;
    }

    public string Title => _cardTittleUtil.ObtainCardTittleString(_card.Title);
    public string Fortitude => _card.Fortitude.ToString();
    public string StunValue => _card.StunValue.ToString();
    public List<string> Types => _cardTypeUtil.GetCardTypeFromListOfTypes(_card.Types);
    public List<string> Subtypes => _cardSubTypeUtil.GetCardSubTypeFromListOfSubTypes(_card.Subtypes);
    public string CardEffect => _card.CardEffect;
    
}