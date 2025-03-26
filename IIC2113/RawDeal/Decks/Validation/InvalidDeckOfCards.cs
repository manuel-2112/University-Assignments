namespace RawDeal.Decks.Validation;

public class InvalidDeckOfCards : Exception
{
    public InvalidDeckOfCards(string reasonOfInvalidation) : base("El mazo es inválido: " + reasonOfInvalidation) { }
}
