import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

//import the deck, which is not shuffled yet.
import cards from "./cards-init.js";
let deck = shuffleFisherYates(cards);

//(re)shuffle the deck

//draw card(s) from the deck
app.get("deck/card", function(req, res) {
  res.status(200);
  res.json();
});

//return cards to the deck
app.post("deck/cards", function(req, res) {
  deck = shuffleFisherYates(deck);
});

function shuffleFisherYates(deck) {
  let i = deck.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[ri]] = [deck[ri], deck[i]];
  }
  return deck;
}

export default app;
