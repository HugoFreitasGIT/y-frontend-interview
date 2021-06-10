import React from "react";
import "../App.css";

function OverlayFact(props) {
  return (
    <div className="overlay-fact">
      <div className="container">
        <div className="float-right">
          <button className="btn-close" onClick={() => props.setCurrentFact(null)}></button>
        </div>
        <h1 className="fact-date">
          {props.currentFact.number.toString().length < 4 ? (
            <>{props.currentFact.number}</>
          ) : (
            <>
              {props.currentFact.number.toString().substring(0, 2)}
              <br />
              {props.currentFact.number.toString().substring(2, 4)}
            </>
          )}
        </h1>
        <p>{props.currentFact.text}</p>
        <div className="float-right-bottom">
          <button className="btn-trash" onClick={() => props.removeFact(props.currentFact.id)}></button>
        </div>
      </div>
    </div>
  );
}

export default OverlayFact;