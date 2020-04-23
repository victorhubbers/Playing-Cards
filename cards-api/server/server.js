import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

//import the deck, which is not shuffled yet.
import cards from "./cards-init.js";
let deck = shuffleFisherYates(arrayCopyOf(cards));

//(re)shuffle the deck

//draw card(s) from the deck
app.get("/deck/cards", function(req, res) {
  const amount = req.query.amount;
  if (req.query.new === "true") {
    deck = shuffleFisherYates(arrayCopyOf(cards));
  }
  if (amount === undefined) {
    res.status(400).json("Must specify amount");
  } else {
    if (amount <= deck.length) {
      const data = deck.splice(-amount);
      res.status(200).json(data);
    } else {
      res.status(406).json("Deck ran out");
    }
  }
});

//return cards to the deck & reshuffle the cards
app.post("/deck/cards", function(req, res) {
  console.log(deck.length);

  const returnedCards = req.body;
  deck = shuffleFisherYates(deck.concat(returnedCards));
  console.log(deck.length);
  console.log(deck);

  res.status(200);
});

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

export default app;
