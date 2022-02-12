import { patchFetch } from "./fetches";

export const updateCardData = (cards) => {
  // find first card with any of the missing attributes
  let count = 0;
  let searchCards = [];
  let startingIndex = cards.every((c) => {
    if (count > 9) {
      return false;
    }
    if (!c.set_name || !c.artist || !c.card_type) {
      if (c.img.includes("multiverseid")) {
        searchCards.push(c);
        count++;
      }
    }
    return true;
  });
  // start a loop at 10
  searchCards.forEach((c, i) => {
    let startIndex = c.img.indexOf("?");
    let endIndex = c.img.indexOf("&");
    let mid = c.img.slice(startIndex + 1, endIndex);
    fetch(`https://api.magicthegathering.io/v1/cards?${mid}`)
      .then((r) => r.json())
      .then((data) => {
        let cardDupe = { ...c };
        cardDupe.set_name = data.cards[0].setName;
        cardDupe.artist = data.cards[0].artist;
        cardDupe.card_type = data.cards[0].type;

        // make a patch request
        patchFetch(`cards/${cardDupe.id}`, cardDupe).then((data) => {
          console.log(`updated ${i + 1}/10`, data);
        });
      });
  });
};
