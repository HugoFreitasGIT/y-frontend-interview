import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "http://numbersapi.com/random/year?json";

function App() {
  const [currentFact, setCurrentFact] = useState(null);
  const [facts, setFacts] = useState([]);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [currentTimelinePos, setTimelinePos] = useState(0);
  const [countFacts, setCountFacts] = useState(0);

  console.log("posicao atual", currentTimelinePos);

  let colors = ["#939C9A", "#8EB3A3", "#c7a18d", "#A9DB96"];
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const yearStep = 50;

  const stepsBetween = Math.ceil((endYear - startYear) / yearStep) + 1;
  const spaceBetweenYears = 180; // space in px between years

  const getFact = async () => {
    const response = await axios.get(`${API_URL}`);
    const newFact = {
      id: countFacts,
      color: randomColor(colors),
      ...response.data,
    };

    const nearYear = Math.floor(newFact.number / yearStep) * yearStep;
    if (!startYear || nearYear < startYear) setStartYear(nearYear);

    const nearNextYear = Math.ceil(newFact.number / yearStep) * yearStep;
    if (!endYear || nearNextYear > endYear) {
      setEndYear(nearNextYear);
    }

    setCurrentFact(newFact);
    setFacts([...facts, newFact]);
    setCountFacts(countFacts + 1);

    if (startYear !== null) {
      const yearShift = Math.abs(Math.floor((nearYear - startYear) / yearStep));
      console.log(yearShift, nearYear, startYear);
      const newPosTimeline = Math.round(spaceBetweenYears * yearShift);
      setTimelinePos(-newPosTimeline);
    }
  };

  console.log("conta", Math.abs(Math.floor((endYear - startYear) / yearStep)) * 150 * -1);

  const removeFact = (id) => {
    const newFacts = facts.filter((f) => f.id !== id);
    setFacts(newFacts);
    setCurrentFact(null);
  };

  const leftArrowClick = () => {
    if (currentTimelinePos === 0) {
    } else {
      setTimelinePos(currentTimelinePos + spaceBetweenYears);
    }
  };

  const rightArrowClick = () => {
    if (Math.abs(Math.floor((endYear - startYear) / yearStep)) * 150 * -1 > currentTimelinePos) {
    } else {
      setTimelinePos(currentTimelinePos - spaceBetweenYears);
    }
  };

  return (
    <>
      <div className="split left">
        <div className="container">
          <h1 className="heading-title">
            Random <br />
            Year
            <br />
            Facts
          </h1>
          <h4 className="heading-subtitle">
            Generate random facts,
            <br /> from random years
          </h4>
        </div>
        {currentFact && (
          <div className="overlay-fact">
            <div className="container">
              <div className="float-right">
                <button className="btn-close" onClick={() => setCurrentFact(null)}></button>
              </div>
              <h1 className="fact-date">
                {currentFact.number.toString().length < 4 ? (
                  <>{currentFact.number}</>
                ) : (
                  <>
                    {currentFact.number.toString().substring(0, 2)}
                    <br />
                    {currentFact.number.toString().substring(2, 4)}
                  </>
                )}
              </h1>
              <p>{currentFact.text}</p>
              <div className="float-right-bottom">
                <button className="btn-trash" onClick={() => removeFact(currentFact.id)}></button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="split right" style={{ backgroundColor: currentFact ? currentFact.color : "#fff" }}>
        <div className="centered">
          <button
            type="button"
            onClick={getFact}
            style={{
              color: currentFact ? "#fff" : "#000",
              borderColor: currentFact ? "#fff" : "#000",
            }}
          >
            Gerenate Random Year Fact
          </button>
        </div>
        <div className="timeline-container">
          <div className="timeline-arrows">
            <div
              className={"left-arrow" + (countFacts > 1 && currentTimelinePos === 0 ? " left-arrow-disabled" : "")}
              onClick={leftArrowClick}
            ></div>
            <div
              className={
                "right-arrow" +
                (countFacts > 1 &&
                Math.abs(Math.floor((endYear - startYear) / yearStep)) * 150 * -1 > currentTimelinePos
                  ? " right-arrow-disabled"
                  : "")
              }
              onClick={rightArrowClick}
            ></div>
          </div>
          {startYear !== null && endYear !== null && (
            <div className="timeline">
              <div className="years" style={{ left: currentTimelinePos }}>
                {[...Array(stepsBetween)].map((y, i) => {
                  const currentYear = startYear + yearStep * i;

                  return (
                    <span key={"year-" + i} className="year" style={{ width: spaceBetweenYears + "px" }}>
                      <span>{currentYear}</span>
                    </span>
                  );
                })}
                {facts &&
                  facts.map((fact, i) => {
                    const nearYear = Math.floor(fact.number / yearStep) * yearStep;
                    const yearShift = Math.floor((nearYear - startYear) / yearStep);
                    return (
                      <span
                        key={"fact" + i}
                        className={"bookmark" + (currentFact && fact.id === currentFact.id ? " bookmark-white" : "")}
                        onClick={() => setCurrentFact(fact)}
                        style={{
                          left:
                            Math.round(spaceBetweenYears * yearShift) +
                            ((fact.number - nearYear) / yearStep) * spaceBetweenYears,
                        }}
                      ></span>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
