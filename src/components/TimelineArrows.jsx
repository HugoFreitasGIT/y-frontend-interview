import React from "react";
import "../App.css";

function TimelineArrows(props) {
  return (
    <div className="timeline-arrows">
      <div
        className={
          "left-arrow" + (props.countFacts > 0 && props.currentTimelinePos === 0 ? " left-arrow-disabled" : "")
        }
        onClick={props.leftArrowClick}
      ></div>
      <div
        className={
          "right-arrow" +
          (props.countFacts > 0 &&
          Math.floor((props.endYear - props.startYear) / props.yearStep) * 180 * -1 + 180 * 4 >=
            props.currentTimelinePos
            ? " right-arrow-disabled"
            : "")
        }
        onClick={props.rightArrowClick}
      ></div>
    </div>
  );
}

export default TimelineArrows;
