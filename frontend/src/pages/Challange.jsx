import React, { useEffect, useReducer, useState } from "react";
import "../styles/challange.css";
import axios from "axios";
import Timer from "../components/Timer";
import ChallengeResult from "../components/ChallengeResult";

const Challange = () => {

  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const [currentRow, setCurrentRow] = useState(0);
  const [errors, setErrors] = useState("");
  const [gameStatus, setGameStatus] = useState();
  const [keyboardStatus, setKeyboardStatus] = useState({place: [], exists: []});
  const [tempWord, setTempWord] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        content: "",
        place: false,
        exists: false,
      }))
    ));

  const keyboardHandler = (value) => {
    if (currentRow < tempWord.length) {
      const updatedWord = [...tempWord];
      const row = [...updatedWord[currentRow]];

      for (let i = 0; i < row.length; i++) {
        if (row[i].content === "") {
          row[i] = { ...row[i], content: value };
          break;
        }
      }

      updatedWord[currentRow] = row;
      setTempWord(updatedWord);
    }
  };

  const backspace = (e) => {
    if (currentRow < tempWord.length) {
      const updatedWord = [...tempWord];
      const row = [...updatedWord[currentRow]];

      for (let i = row.length - 1; i >= 0; i--) {
        if (row[i].content !== "") {
          row[i] = { ...row[i], content: "" };
          break;
        }
      }

      updatedWord[currentRow] = row;
      setTempWord(updatedWord);
    }
  };

  const submitHandler = (e) => {
    if (tempWord[currentRow].some((cell) => cell.content === "")) {
      setErrors("Complete the word before submitting.");

      setTimeout(() => {
        setErrors("");
      }, 3000);

      return;
    }
    const currentWord = tempWord[currentRow].map((cell) => cell.content);

    axios
      .post("/wordcode/check", currentWord)
      .then((res) => {
        const updatedWord = [...tempWord];
        const row = res.data.result;
        updatedWord[currentRow] = row;
        setTempWord(updatedWord);
        
        if (res.data.correctLetters === 5) {
            setTimeout(() => {
                setGameStatus("success");
            }, 1500);
        }

        else if (currentRow === 5) {
            setTimeout(() => {
                setGameStatus("defeat");
            }, 1500);
        }

        else {
            const newKeyboardstatus = { ...keyboardStatus };
            res.data.result.map((w)=> {
                if (w.exists) {
                    newKeyboardstatus.exists.push(w.content);
                }
                if (w.place) {
                    newKeyboardstatus.place.push(w.content);
                }
            })
            setKeyboardStatus(newKeyboardstatus);
            setCurrentRow((prev) => prev + 1);}
      })
      .catch((error) => {
            setErrors(error.response.data.error);

            setTimeout(() => {
                setErrors("");
            }, 3000);
      });
  };

  return (
    <div className="challange">
      <div className={errors ? "errors" : "errors-hidden"}>{errors}</div>
        <div className="challenge-title">WORDCODE</div>
        <div className="challenge-header">
        <button className="send-btn">Back to the chat</button>
        </div>
        
      <div className="display">
      
        <Timer />
        {tempWord.map((row, rowIndex) => (
          <div className="display-row" key={rowIndex}>
            {row.map((cell, index) => (
              <div
                className={`display-letter ${cell.content ? "typed" : ""}
                ${ cell.place ? "place" : cell.exists && "exists"}`}
                key={index}
              >
                {cell.content}
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
                  className={`letter ${keyboardStatus.place.includes(letter) ? "place": 
                    keyboardStatus.exists.includes(letter)&& "exists"
                  }`}
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
                <button className="letter" onClick={submitHandler}>
                  Enter
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    { gameStatus && (<div className="overlay"/>)}
    { gameStatus === "success" && (<ChallengeResult resultArray={tempWord} />)}
    </div>
  );
};

export default Challange;