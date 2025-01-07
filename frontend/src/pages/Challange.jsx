import React, { useState } from "react";
import "../styles/challange.css";

const Challange = () => {
  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const [tempWord, setTempWord] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [errors, setErrors] = useState("");

  const keyboardHandler = (value) => {
    if (currentRow < tempWord.length) {
      const updatedWord = [...tempWord];
      const row = [...updatedWord[currentRow]];

      for (let i = 0; i < row.length; i++) {
        if (row[i] === "") {
          row[i] = value;
          break;
        }
      }

      updatedWord[currentRow] = row;
      setTempWord(updatedWord);
    }
  };

  const backspace = (e) => {
    e.preventDefault();
    if (currentRow < tempWord.length) {
      const updatedWord = [...tempWord];
      const row = [...updatedWord[currentRow]];

      for (let i = row.length - 1; i >= 0; i--) {
        if (row[i] !== "") {
          row[i] = "";
          break;
        }
      }

      updatedWord[currentRow] = row;
      setTempWord(updatedWord);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(tempWord[currentRow][4] === "")
    {
        setErrors("Complete the word before submiting.");

        setTimeout(() => {
            setErrors();
        }, 3000);
    }
    else {
        console.log(tempWord[currentRow])
    }
  }

  return (
    <div className="challange page">
        <div className={errors?"errors":"errors-hidden"}>{errors}</div>
        <div className="display">
        <div className="challange-title">
            <button className="help">?</button>
            <div>WORDCODE</div>
            <button className="help">||</button>
        </div>
        <div>Try to guess a word of 5 letters.</div>
          {tempWord.map((row, rowIndex) => (
            <div className="display-row" key={rowIndex}>
              {row.map((letter, index) => (
                <div className="display-letter" key={index}>
                  {letter}
                </div>
              ))}
            </div>
          ))}
        <div className="board">
          {letters.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((letter, letterIndex) => (
                <button
                  key={letterIndex}
                  className="letter"
                  onClick={() => keyboardHandler(letter)}
                >
                  {letter}
                </button>
              ))}
              {rowIndex === 1 && (
                <button className="letter" onClick={backspace}>
                  ←
                </button>
              )}
              {rowIndex === 2 && (
                <button
                  className="letter"
                  onClick={submitHandler}
                >
                  Enter
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="timer">00:01</div>
    </div>
  );
};

export default Challange;
