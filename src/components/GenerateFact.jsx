import React from "react";
import "../App.css";

function GenerateFact(props) {
  return (
    <div className="centered">
      <button
        type="button"
        onClick={props.getFact}
        style={{
          color: props.currentFact ? "#fff" : "#000",
          borderColor: props.currentFact ? "#fff" : "#000",
        }}
      >
        Gerenate Random Year Fact
      </button>
    </div>
  );
}

export default GenerateFact;
