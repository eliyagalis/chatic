import React, { useEffect, useReducer, useState } from "react";
import "../styles/challange.css";
import axios from "axios";
import Timer from "../components/Timer";
import Header from "../components/Header";

// const initialState = {
//   tempWord: Array.from({ length: 6 }, () =>
//     Array.from({ length: 5 }, () => ({
//       content: "",
//       place: false,
//       exists: false,
//     }))),

// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.payload };
//     case "SET_CHATS":
//       return { ...state, chats: action.payload };
//     case "SET_ROOM":
//       return { ...state, room: action.payload };
//     case "SET_MESSAGES":
//       return {
//         ...state,
//         messages:
//           typeof action.payload === "function"
//             ? action.payload(state.messages)
//             : action.payload,
//       };
//     case "SET_MESSAGE_TEXT":
//       return { ...state, messageText: action.payload };
//     case "SET_IS_NEW_CHATS":
//       return { ...state, isNewChats: action.payload };
//     case "SET_NOTIFICATIONS":
//       return { ...state, notifications: action.payload };
//     default:
//       return state;
//   }
// };

const Challange = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const [keyboardStatus, setKeyboardStatus] = useState({place: [], exists: []});

  const [tempWord, setTempWord] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        content: "",
        place: false,
        exists: false,
      }))
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [errors, setErrors] = useState("");

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
    e.preventDefault();
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
    e.preventDefault();
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
        } else {
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
        console.log(error);
      });
  };

  return (
    <div className="challange">
      <div className={errors ? "errors" : "errors-hidden"}>{errors}</div>
      <div className="display">
        <Timer />
        <div className="challange-title">WORDCODE</div>
        <div>Try to guess a word of 5 letters.</div>
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
                  className={`letter ${keyboardStatus.place.includes(letter)?"place": 
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
    </div>
  );
};

export default Challange;