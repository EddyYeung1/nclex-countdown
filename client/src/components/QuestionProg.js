import React, {useContext} from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GlobalContext } from "../context/GlobalState";


export default function QuestionProg() {
  const {questionCounter} = useContext(GlobalContext)
  const percentage = ((questionCounter/2184)*100).toFixed(2);

  return (
    <div className="question-container question-container-small"><div className="center">
        <div className="center-text remaining">
          <h1 className="pink">Questions Remaining</h1>
          <h2 className="green">{questionCounter} / 2184</h2>
        </div>
      </div>
      <CircularProgressbar
        counterClockwise={true}
        value={percentage}
        text={`${percentage}%`}
        styles={{
          path: {
            // Path color
            stroke: "#66cf8c"
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#d6d6d6",
          },
          text: {
              fill: "#66cf8c"
          }
        }}
      />
      ;
      
    </div>
  );
}
