import { useRef } from "react";
import html2canvas from "html2canvas";

const ChallengeResult = ({ resultArray , username = 'username'}) => {
  const userResult = useRef(null);

  const handleScreenshot = () => {
    if (userResult.current) {
      html2canvas(userResult.current).then((canvas) => {
        const imageURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageURL;
        link.download = "challenge-result.png";
        link.click();
      });
    }
  };

  return (
    <div className="centered">
      <div className="result-display" ref={userResult}>
        <b>You won!</b>
          Share your progress with others!
          <br />
          Challenge them to try better.
        <div className="screenshot-area">
          <b>{username}'s score:</b>
          {resultArray.map((row, rowIndex) => (
            <div className="display-row" key={rowIndex}>
              {row.map((cell, index) => (
                <div
                  className={`result-display-letter ${
                    cell.content ? "typed" : ""
                  }
                  ${cell.place ? "place" : cell.exists && "exists"}`}
                  key={index}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <button className="send-btn" onClick={handleScreenshot}>Download Result</button>
        Come back tomorrow.
      </div>
    </div>
  );
};

export default ChallengeResult;