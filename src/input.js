import React from "react";

import { getFetch, postFetch } from "./fetches";

const Input = () => {
  const [foundCards, setFoundCards] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [notFound, toggleNotFound] = React.useState(false);
  const [selectedCardIndex, setSelectedCardindex] = React.useState(null);

  const [containers, setContainers] = React.useState([]);
  const [chosenContainer, setChosenContainer] = React.useState(0);
  const [newContainerName, setNewContainerName] = React.useState("");

  const searchRef = React.useRef(null);
  const submitRef = React.useRef(null);

  React.useEffect(() => {
    getFetch("containers").then((data) => {
      setContainers(data);
    });
  }, []);

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
          setFoundCards(data.cards.filter((c) => c.imageUrl));
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
          id="search-mtg"
          name="search-mtg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={searchRef}
        />
        <input type="submit" value="search" />
      </form>
    );
  };

  const newContainerForm = () => {
    const submit = (e) => {
      e.preventDefault();
      if (newContainerName === "") {
        return;
      }
      postFetch("containers", { name: newContainerName }).then((data) => {
        setContainers([...containers, data]);
        setChosenContainer(data.id);
        setNewContainerName("");
      });
    };

    return (
      <span>
        <form onSubmit={submit}>
          <input
            type="text"
            value={newContainerName}
            onChange={(e) => setNewContainerName(e.target.value)}
          />
          <input type="submit" value="Create New Container" />
        </form>
      </span>
    );
  };

  const renderContainers = () => {
    let array = containers.map((c) => {
      return <option value={c.id}>{c.name}</option>;
    });
    return (
      <span>
        <select
          name="containers"
          id="containers"
          value={chosenContainer}
          onChange={(e) => setChosenContainer(e.target.value)}
        >
          <option value="0">Please Select/Create a Container</option>
          {array}
        </select>
      </span>
    );
  };

  const addCard = () => {
    const renderClick = () => {
      if (selectedCardIndex === null) {
        return;
      }
      let card = foundCards[selectedCardIndex];
      postFetch("cards", {
        img: card.imageUrl,
        container_id: chosenContainer,
        name: card.name,
        text: card.text,
        color_identity: card.colorIdentity?.join("") ?? "A",
      }).then((data) => {
        setFoundCards(null);
        setInput("");
        setSelectedCardindex(null);
        searchRef.current.focus();
      });
    };

    return (
      <span>
        <button onClick={renderClick} ref={submitRef}>
          Add Card
        </button>
      </span>
    );
  };

  const display = () => {
    const wideSearch = () => {
      search(apiWide(input));
    };

    if (foundCards) {
      return [...foundCards].map((c, i) => {
        let style = {
          width: "200px",
          height: "280px",
          boxSizing: "border-box",
        };
        if (selectedCardIndex === i) {
          style.border = "4px solid lawngreen";
        }
        const onClickImage = () => {
          setSelectedCardindex(i);
          submitRef.current.focus();
        };
        return (
          <img
            src={c.imageUrl}
            alt={c.name}
            style={style}
            onClick={onClickImage}
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
      {form()}
      {renderContainers()}
      {parseInt(chosenContainer) === 0 && newContainerForm()}
      {parseInt(chosenContainer) !== 0 && addCard()}
      <div style={{ display: "flex", flexWrap: "wrap" }}>{display()}</div>
    </section>
  );
};

export default Input;
