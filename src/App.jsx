import { useEffect, useState } from "react";

import "./App.css";
import { handleMatch } from "./script.js";
import Login from "./login.jsx";
import Music from "./music.jsx";
import About from "./about.jsx";
// import { setClientToken } from "./spotify";
import Dialogue from "./components/dialogue.jsx";
import langda from "../langda.jpg";
import { setClientToken } from "./spotify.jsx";
import ParentComponent from "./components/dialogueMain.jsx";
const initialCards = [
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/blinky.gif" },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/huh.jpeg" },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/langcet.jpg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/sysytm.jpeg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/monday.jpeg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/wwatsep.png",
  },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/unon.png" },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/mogus.jpeg" },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/blinky.gif" },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/huh.jpeg" },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/langcet.jpg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/sysytm.jpeg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/monday.jpeg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/wwatsep.png",
  },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/unon.png" },
  { order: Math.ceil(Math.random() * 16), matched: false, icon: "/mogus.jpeg" },
];

function App() {
  const [hasFlipped, setHasFlipped] = useState(false);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [cards, setCards] = useState(initialCards);
  const [clickCount, setClickCount] = useState(0);
  const [allMatched, setAllMatched] = useState(false);

  const audio_click = new Audio("audio/00click.mp3");
  audio_click.load();

  useEffect(() => {
    // Check if all cards have been matched
    const allCardsMatched = cards.every((card) => card.matched);

    if (allCardsMatched) {
      setAllMatched(true);
      handleMatch();
      // alert("All cards matched!");
      console.log("All matched also No. of clicks = " + clickCount);
    }
  }, [cards, clickCount]);

  function onCardClick(index) {
    // if (allMatched) return; // Prevent clicking when all matched
    setClickCount((prevCount) => prevCount + 1);

    if (!hasFlipped) {
      setHasFlipped(true);
      setFirstCard(cards[index]);
    } else {
      setSecondCard(cards[index]);
      const isMatch = firstCard.icon === cards[index].icon;

      if (isMatch) {
        // Create a new array with the matched cards marked as matched
        const newCards = cards.map((card, i) =>
          i === index || i === cards.indexOf(firstCard)
            ? { ...card, matched: true }
            : card
        );
        setCards(newCards);
      }

      setTimeout(() => {
        setHasFlipped(false);
        setFirstCard(null);
        setSecondCard(null);
      }, 800);
    }
  }

  function getRandomRotation() {
    return `${Math.floor(Math.random() * 361)}deg`;
  }

  const elements = document.querySelectorAll(".back");
  function hue() {
    elements.forEach((element) => {
      const randomRotation = getRandomRotation();
      element.style.setProperty("--random-rotation", randomRotation);
    });
  }

  const audio_click_play = () => {
    audio_click.currentTime = 0.32;
    audio_click.play();
    audio_click.volume = 0.15;
  };

  const audio_click_pause = () => {
    if (audio_click.currentTime > 0.8) {
      audio_click.pause();
      audio_click.currentTime = 0;
    }
  };

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const tokenExpiry = window.localStorage.getItem("token-expiry");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!token || (tokenExpiry && new Date().getTime() > tokenExpiry)) {
      if (hash) {
        const _token = hash.split("&")[0].split("=")[1];
        const expiresIn = parseInt(hash.split("expires_in=")[1].split("&")[0]);
        const expiryTime = new Date().getTime() + expiresIn * 1000; // Convert seconds to milliseconds
        window.localStorage.setItem("token", _token);
        window.localStorage.setItem("token-expiry", expiryTime.toString());
        setToken(_token);
        // setClientToken(_token);
      }
    } else {
      setToken(token);
      // setClientToken(token);
    }
  }, []);

  return (
    <div className="game" id={` ${allMatched ? "confettiContainer" : ""}`}>
      <div className="title">
        <div className="head">
          <h1>Memory Game</h1>
          <hr />
          <br />
        </div>
        <div className="desc">
          <br />
          <p>
            Welcome to our captivating memory game! Challenge your brain and
            test your memory skills by matching pairs of cards consecutively.
            But watch out, if you don't find the matching cards in time, they'll
            play a little game of hide-and-seek. Get ready for a delightful
            adventure of card-flipping fun!
          </p>
          <p> A dripy da coder production. </p>
        </div>
      </div>
      <div className="board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${
              firstCard === card || secondCard === card || card.matched
                ? "flip"
                : ""
            }`}
            onClick={() => onCardClick(index)}
            style={{ order: card.order }}
            // onMouseEnter={audio_click_play}
            onMouseLeave={audio_click_pause}
            onMouseEnter={hue()}
          >
            <img src={card.icon} alt={`Card ${index}`} className="front" />
            <img src={langda} alt="Card Back" className="back" />
          </div>
        ))}
      </div>
      {allMatched && <ParentComponent clickCount={clickCount} />}
      <div className="wild">
        <About />
        {!token ? (
          <div className="musicl">
            <Login />
          </div>
        ) : (
          <Music token={token} />
        )}
      </div>
    </div>
  );
}

export default App;
