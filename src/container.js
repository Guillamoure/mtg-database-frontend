import React from "react";

const Container = ({ container, setViewContainer }) => {
  console.log(container);

  return (
    <div id="modal-box">
      <div id="modal-content">
        <h4>{container.name}</h4>
        <p>{container.cards?.length} Cards</p>
        <button onClick={() => setViewContainer(null)}>Close</button>
      </div>
    </div>
  );
};

export default Container;
