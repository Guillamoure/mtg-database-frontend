import React from "react";

const Container = ({ container, setViewContainer }) => {
  console.log(container);

  const percentageSets = () => {
    let obj = {};
    let count = 0.0;
    container.cards.forEach((c) => {
      if (c.set_name) {
        count++;
        if (!obj[c.set_name]) {
          obj[c.set_name] = 1;
        } else {
          obj[c.set_name] = obj[c.set_name] + 1;
        }
      }
    });
    let stringArray = [];
    for (let set in obj) {
      stringArray.push(`${Math.round((obj[set] / count) * 100)}% ${set}`);
    }
    return (
      <ul>
        {stringArray.map((s) => (
          <li>{s}</li>
        ))}
      </ul>
    );
  };

  return (
    <div id="modal-box">
      <div id="modal-content">
        <h4>{container.name}</h4>
        <p>{container.cards?.length} Cards</p>
        <p>{percentageSets()}</p>
        <button onClick={() => setViewContainer(null)}>Close</button>
      </div>
    </div>
  );
};

export default Container;
