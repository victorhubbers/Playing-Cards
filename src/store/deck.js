import cards from "./cards-init";

let deck = shuffleFisherYates(arrayCopyOf(cards));

export function drawCards(amount, newDeck) {
  if (newDeck) {
    deck = shuffleFisherYates(arrayCopyOf(cards));
  }
  if (amount <= deck.length) {
    return deck.splice(-amount);
  } else {
    return false;
  }
}

//return cards to the deck & reshuffle the cards
export function putBackInDeck(cards) {
  deck = shuffleFisherYates(deck.concat(cards));
}

function shuffleFisherYates(deck) {
  let i = deck.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[ri]] = [deck[ri], deck[i]];
  }
  return deck;
}

function arrayCopyOf(array) {
  return [...array];
}
