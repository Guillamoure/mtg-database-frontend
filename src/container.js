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

    let sorted = [];
    for (let set in obj) {
      sorted.push([set, obj[set]]);
    }
    sorted = sorted.sort((a, b) => {
      return b[1] - a[1];
    });

    let stringArray = [];
    sorted.forEach((el) => {
      let set = el[0];
      let numOfCards = el[1];

      let percent = Math.round((numOfCards / count) * 100);
      if (percent === 0) {
        percent = ">1";
      }
      stringArray.push(`${percent}% ${set} (${numOfCards})`);
    });
    return (
      <ul style={{ columnCount: "4" }}>
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
        <div>{percentageSets()}</div>
        <button onClick={() => setViewContainer(null)}>Close</button>
      </div>
    </div>
  );
};

export default Container;
