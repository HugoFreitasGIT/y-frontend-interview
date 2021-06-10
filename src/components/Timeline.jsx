import React from "react";
import "../App.css";

function Timeline(props) {
  return (
    <div className="timeline">
      <div className="years" style={{ left: props.currentTimelinePos }}>
        {[...Array(props.stepsBetween)].map((y, i) => {
          const currentYear = props.startYear + props.yearStep * i;

          return (
            <span key={"year-" + i} className="year" style={{ width: props.spaceBetweenYears + "px" }}>
              <span>{currentYear}</span>
            </span>
          );
        })}
        {props.facts &&
          props.facts.map((fact, i) => {
            const nearYear = Math.floor(fact.number / props.yearStep) * props.yearStep;
            const yearShift = Math.floor((nearYear - props.startYear) / props.yearStep);
            return (
              <span
                key={"fact" + i}
                className={
                  "bookmark" + (props.currentFact && fact.id === props.currentFact.id ? " bookmark-white" : "")
                }
                onClick={() => props.setCurrentFact(fact)}
                style={{
                  left:
                    Math.round(props.spaceBetweenYears * yearShift) +
                    ((fact.number - nearYear) / props.yearStep) * props.spaceBetweenYears,
                }}
              ></span>
            );
          })}
      </div>
    </div>
  );
}

export default Timeline;
