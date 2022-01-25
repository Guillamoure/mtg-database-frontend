import React from "react";

const Input = () => {
  const [foundCards, setFoundCards] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [notFound, toggleNotFound] = React.useState(false);
  const [selectedCardIndex, setSelectedCardindex] = React.useState(null);

  let apiSpecific = (name) => {
    return `https://api.magicthegathering.io/v1/cards?name=%22${name}%22`;
  };
  let apiWide = (name) => {
    return `https://api.magicthegathering.io/v1/cards?name=${name}`;
  };

  let search = (api) => {
    fetch(api)
      .then((r) => r.json())
      .then((data) => {
        if (data.cards.length > 0) {
          setFoundCards(data.cards);
          setInput("");
          setSelectedCardindex(null);
          if (notFound) {
            toggleNotFound(false);
          }
        } else {
          setFoundCards(null);
          toggleNotFound(true);
          setSelectedCardindex(null);
        }
      });
  };

  const form = () => {
    const submit = (e) => {
      e.preventDefault();
      search(apiSpecific(input));
    };

    return (
      <form onSubmit={submit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    );
  };

  const selectCard = (index) => {
    let card = foundCards(index);
  };

  const display = () => {
    const wideSearch = () => {
      search(apiWide(input));
    };

    if (foundCards) {
      return foundCards
        .filter((c) => c.imageUrl)
        .map((c, i) => {
          let style = {
            width: "200px",
            height: "280px",
            boxSizing: "border-box",
          };
          if (selectedCardIndex === i) {
            style.border = "4px solid lawngreen";
          }
          return (
            <img
              src={c.imageUrl}
              alt={c.name}
              style={style}
              onClick={() => setSelectedCardindex(i)}
            />
          );
        });
    }
    if (notFound) {
      return (
        <p>
          Sorry, this is no card by the name of "{input}". Please try again.
          <br />
          <br />
          Maybe try a wider search:
          <br />
          <button onClick={wideSearch}>Wide Search</button>
        </p>
      );
    }
  };

  return (
    <section>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{display()}</div>
      {form()}
    </section>
  );
};

export default Input;
