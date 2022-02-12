import React from "react";
import { deleteFetch } from "./fetches";

const Card = ({ card, setViewCard, filterOutCardFromCards }) => {
  const deleteCard = () => {
    deleteFetch(`cards/${card.id}`).then((data) => {
      setViewCard(null);
      filterOutCardFromCards(card.id);
    });
  };

  const content = () => {
    return (
      <div id="modal-content">
        <h4>{card.name}</h4>
        <button onClick={() => setViewCard(null)}>Close</button>
        <br />
        <br />
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={deleteCard}
        >
          Remove Card
        </button>
      </div>
    );
  };

  return (
    <div id="modal-box">
      <img
        src={card.img}
        alt={card.img}
        style={{
          height: "100%",
        }}
      />
      {content()}
    </div>
  );
};

export default Card;
