import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import GenerateFact from "./components/GenerateFact";
import Timeline from "./components/Timeline";
import HeadingTitle from "./components/HeadingTitle";
import HeadingSubtitle from "./components/HeadingSubtitle";
import TimelineArrows from "./components/TimelineArrows";
import OverlayFact from "./components/OverlayFact";

const API_URL = "http://numbersapi.com/random/year?json";

const spaceBetweenYears = 180; // space in px between years
const yearStep = 50;

const calcNearYear = (year) => {
  return Math.floor(year / yearStep) * yearStep;
};

const calcNearNextYear = (year) => {
  return Math.ceil(year / yearStep) * yearStep;
};

const calcYearShift = (year, startYear) => {
  return Math.abs(Math.floor((calcNearYear(year) - startYear) / yearStep));
};

function App() {
  const [currentFact, setCurrentFact] = useState(null);
  const [facts, setFacts] = useState([]);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [currentTimelinePos, setTimelinePos] = useState(0);
  const [countFacts, setCountFacts] = useState(0);

  useEffect(() => {
    if (currentFact) {
      const newPosTimeline = Math.round(spaceBetweenYears * calcYearShift(currentFact.number, startYear));
      const isLastYear = endYear <= calcNearYear(currentFact.number) + yearStep;

      setTimelinePos(isLastYear ? -newPosTimeline + spaceBetweenYears * 3 : -newPosTimeline);

      const diffYearStep = (endYear - startYear) / yearStep;
      if (diffYearStep < 4) {
        setEndYear(endYear + yearStep * (4 - diffYearStep));
      }
    }
  }, [currentFact, startYear, endYear]);

  let colors = ["#939C9A", "#8EB3A3", "#c7a18d", "#A9DB96"];
  const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const stepsBetween = Math.ceil((endYear - startYear) / yearStep) + 1;

  const getFact = async () => {
    const response = await axios.get(`${API_URL}`);
    const newFact = {
      id: countFacts,
      color: randomColor(colors),
      ...response.data,
    };

    const nearYear = calcNearYear(newFact.number);
    if (!startYear || nearYear < startYear) setStartYear(nearYear);

    const nearNextYear = calcNearNextYear(newFact.number);
    if (!endYear || nearNextYear > endYear) setEndYear(nearNextYear);

    setCurrentFact(newFact);
    setFacts([...facts, newFact]);
    setCountFacts(countFacts + 1);
  };

  const removeFact = (id) => {
    const newFacts = facts.filter((f) => f.id !== id);
    setFacts(newFacts);
    setCurrentFact(null);
  };

  const leftArrowClick = () => {
    if (currentTimelinePos !== 0) setTimelinePos(currentTimelinePos + spaceBetweenYears);
  };

  const rightArrowClick = () => {
    const endTimelinePos = Math.floor((endYear - startYear) / yearStep) * 180 * -1 + spaceBetweenYears * 4;
    if (endTimelinePos < currentTimelinePos) setTimelinePos(currentTimelinePos - spaceBetweenYears);
  };

  return (
    <>
      <div className="split left">
        <div className="container">
          <HeadingTitle />
          <HeadingSubtitle />
        </div>
      </div>

      <div className="split right" style={{ backgroundColor: currentFact ? currentFact.color : "#fff" }}>
        <GenerateFact getFact={getFact} currentFact={currentFact} />
        <div className="timeline-container">
          <TimelineArrows
            countFacts={countFacts}
            currentTimelinePos={currentTimelinePos}
            leftArrowClick={leftArrowClick}
            endYear={endYear}
            startYear={startYear}
            yearStep={yearStep}
            rightArrowClick={rightArrowClick}
          />
          {startYear !== null && endYear !== null && (
            <Timeline
              currentTimelinePos={currentTimelinePos}
              stepsBetween={stepsBetween}
              startYear={startYear}
              yearStep={yearStep}
              spaceBetweenYears={spaceBetweenYears}
              facts={facts}
              currentFact={currentFact}
              setCurrentFact={setCurrentFact}
            />
          )}
        </div>
      </div>
      {currentFact && <OverlayFact setCurrentFact={setCurrentFact} currentFact={currentFact} removeFact={removeFact} />}
    </>
  );
}

export default App;
