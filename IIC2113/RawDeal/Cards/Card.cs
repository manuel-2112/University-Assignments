using RawDeal.Cards.Conditions;
using RawDeal.Cards.Effects;
using RawDeal.GameUtils;
using RawDeal.Reversals;
using RawDealView.Formatters;

namespace RawDeal.Cards;

public class Card
{
    private readonly CardTittleOptions _cardTittleUtil = new();
    private readonly CardTypeOptions _cardTypeUtil = new();
    private readonly CardSubTypeOptions _cardSubTypeUtil = new();
    private readonly CardEffectAndConditionController _cardEffectAndConditionController = new();
    public CardTittle Title { get; }
    public int Fortitude { get; }
    public int Damage { get; }
    public int StunValue { get; }
    public List<CardType> Types { get; }
    public List<CardSubtype> Subtypes { get; }
    public string CardEffect { get; }
    public CardInfo ViewableCardInfo { get; }
    public ReversalCondition ReversalCondition { get; }
    public ReversalEffect ReversalEffect { get; }
    public (CardCondition Condition, CardEffect Effect) Effect { get; }

    public Card(JsonCardModel jsonCardInfo)
    {
        Title = _cardTittleUtil.GetCardTypeFromString(jsonCardInfo.Title);
        Fortitude = int.Parse(jsonCardInfo.Fortitude);
        Damage = SetDamage(jsonCardInfo.Damage);
        StunValue = int.Parse(jsonCardInfo.StunValue);
        Types = _cardTypeUtil.GetCardTypeFromListOfStrings(jsonCardInfo.Types);
        Subtypes = _cardSubTypeUtil.GetCardSubTypeFromListOfStrings(jsonCardInfo.Subtypes);
        CardEffect = jsonCardInfo.CardEffect;
        ViewableCardInfo = new CardInfo(this, jsonCardInfo.Damage);
        Effect = _cardEffectAndConditionController.FindConditionAndEffect(Title);
        ReversalCondition = CardEffectAndConditionController.SetUpReversalCardCondition(Title);
        ReversalEffect = CardEffectAndConditionController.SetUpReversalCardEffect(Title);
    }
    
    private static int SetDamage(string damage)
    {
        return damage == "#" ? 0 : int.Parse(damage);
    }

    public string FormatCardToString()
    {
        return Formatter.CardToString(ViewableCardInfo);
    }
}

