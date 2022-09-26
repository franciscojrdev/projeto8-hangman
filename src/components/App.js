import forca0 from "../assets/img/forca0.png";
import forca1 from "../assets/img/forca1.png";
import forca2 from "../assets/img/forca2.png";
import forca3 from "../assets/img/forca3.png";
import forca4 from "../assets/img/forca4.png";
import forca5 from "../assets/img/forca5.png";
import forca6 from "../assets/img/forca6.png";
import words from "../data/palavras";
import { useState } from "react";

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function HideLetters() {
  return <li>_</li>;
}
let cont = 0;
let images = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
export default function App() {
  const [image, setImage] = useState(images[cont]);
  const [word, setWord] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [haveLetter, setHaveLetter] = useState([]);
  const [noLetter, setNoLetter] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [chute, setChute] = useState("");

  function chooseWord() {
    let position = words[Math.floor(Math.random() * words.length)].split("");
    setWord(position);
  }

  function saveLetter(letter) {
    setClicked([...clicked, letter]);
    let compair = word.includes(letter);
    if (compair) {
      setHaveLetter([...haveLetter, letter]);
    } else {
      cont = cont + 1;
      let imgChoosed = images[cont];
      setImage(imgChoosed);
      setNoLetter([...noLetter, letter]);
      if (cont === 6) {
        setEndGame(true);
      }
    }
  }
  function compairWords() {
    let strWord = word.join("");
    if (word.length !== 0) {
      strWord.toUpperCase() === chute.toUpperCase()
        ? alert("acertou")
        : alert("errou");
    }
  }

  return (
    <>
      <main>
        <div className="forca">
          <img data-identifier="game-image" src={image} />
          <aside>
            <button onClick={chooseWord} data-identifier="choose-word">
              Escolher Palavra
            </button>
            <ul>
              {!endGame ? (
                word.map((el, index) => <HideLetters key={index} />)
              ) : (
                <li className="color">{word}</li>
              )}
            </ul>
          </aside>
        </div>
        <div className="typeArea">
          <ul>
            {alfabeto.map((el, index) => (
              <li
                data-identifier="letter"
                key={index}
                className={word.length !== 0 ? "backcolor1" : "backcolor2"}
                onClick={
                  word.length !== 0
                    ? () => saveLetter(el)
                    : () => console.warn("not yet")
                }
              >
                {el.toUpperCase()}
              </li>
            ))}
          </ul>
          <div className="answear">
            <label>Já sei a palavra!</label>
            <input
              data-identifier="type-guess"
              type="text"
              value={chute}
              onChange={(e) => setChute(e.target.value)}
            ></input>
            <button onClick={compairWords} data-identifier="guess-button">Chutar</button>
          </div>
        </div>
      </main>
    </>
  );
}
