/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

import "./App.css";
import { handleMatch } from "./script.js";
import Login from "./login.jsx";
import Music from "./music.jsx";
import About from "./about.jsx";
import { setClientToken } from "./spotify";
import Dialogue from "./components/dialogue.jsx";
// import useSound from 'use-sound';

const initialCards = [
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/blinky.gif",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/huh.jpeg",
  },
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
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/unon.png",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/mogus.jpeg",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/blinky.gif",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/huh.jpeg",
  },
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
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/unon.png",
  },
  {
    order: Math.ceil(Math.random() * 16),
    matched: false,
    icon: "/mogus.jpeg",
  },
];

function App() {
  const [hasFlipped, setHasFlipped] = useState(false);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [cards, setCards] = useState(initialCards);
  const [clickCount, setClickCount] = useState(0);

  // const audio = new Audio("audio/this is how INDIAN LOFI sounds like 🤷.m4a");
  const audio_click = new Audio("audio/00click.mp3");
  const [allMatched, setAllMatched] = useState(false);
  audio_click.load();
  useEffect(() => {
    // Check if all cards have been matched
    const allMatched = cards.every((card) => card.matched);

    if (allMatched) {
      setAllMatched(true);
      handleMatch();
      alert("all cards matched");
      // animate();
      console.log("All matched also No. of clicks = " + clickCount);
    }
  }, [cards, clickCount]);

  function onCardClick(index) {
    setClickCount((prevCount) => prevCount + 1);
    setAllMatched(true);
    if (!hasFlipped) {
      setHasFlipped(true);
      setFirstCard(cards[index]);
    } else {
      setSecondCard(cards[index]);

      const isMatch = firstCard.icon === cards[index].icon; // Compare by icon
      if (isMatch) {
        // Create a new array with the matched card marked as matched
        const newCards = cards.map((card, i) =>
          i === index || i === cards.indexOf(firstCard)
            ? { ...card, matched: true }
            : card
        );
        setCards(newCards);
        setAllMatched(true);
        setSecondCard(null);
      } else {
        setTimeout(function () {
          setHasFlipped(false);
          setFirstCard(null);
          setSecondCard(null);
        }, 800);
        // Reset
      }
    }
  }
  function getRandomRotation() {
    // Generate a random rotation angle between 0 and 360 degrees
    return `${Math.floor(Math.random() * 361)}deg`;
  }
  // const animate=()=>{
  //   for (let i = 0; i < 50; i++) {
  //     const particle = document.createElement('div');
  //     particle.classList.add('celebration-particle');
  //     particle.style.left = `${Math.random() * 100}%`;
  //     particle.style.top = `${Math.random() * 100}%`;
  //     container.appendChild(particle);

  //     // Remove the particle after animation ends
  //     particle.addEventListener('animationend', () => {
  //       particle.remove();
  //     });
  //   }
  // }

  // Add hover and focus event listeners to .front and .back elements

  // Initialize a variable to track whether the audio is playing
  // let isAudioPlaying = false;
  // let color = 0
  // let click = 0
  // const element = document.querySelectorAll(".card");

  // const elements = document.querySelectorAll(".back");
  // Initialize a variable to track whether the audio is playing
  // let isAudioPlaying = false;
  // let color = 0
  // let click = 0
  const elements = document.querySelectorAll(".back");
  function hue() {
    elements.forEach((element) => {
      const randomRotation = getRandomRotation();
      element.style.setProperty("--random-rotation", randomRotation);
    });
  }
  // const elementals = document.querySelectorAl(".card");
  // function rgb(){
  //   elementals.forEach((element)=>{
  //     const
  //   })
  // }
  // element.addEventListener("mouseout", () => {
  //   // Pause and reset the audio when the mouse leaves the element
  //   audio_click.pause();
  //   audio_click.currentTime = 0;
  // });
  // });

  // const clicks = document.querySelectorAll(".btn prev-btn");

  // clicks.forEach((card) => {

  //   card.addEventListener("mouseover", () => {
  //     card.setAttribute("onMouseEnter", "audio_click_play()");
  //   let aud = `() => {
  //   audio_click_play()
  //   hue()
  // }`;

  //   });
  // });

  // const element = document.getElementById("controls");

  // // Add a custom attribute named "data-custom" with a value of "myValue"
  // element.setAttribute("onMouseEnter", "audio_click_play()");

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

  //   const [play, { stop }] = useSound(
  //     audio_click,
  //     { volume: 0.5 }
  //   );
  //copying content

  //   return (
  //     <div>
  //       <p>{textToCopy}</p>
  //       <button onClick={handleCopyClick}>Copy</button>
  //     </div>
  //   );
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  // export default CopyToClipboard;

  // const [isHovering, setIsHovering] = React.useState(
  //   false
  // );

  return (
    <div className="game" id={` ${allMatched ? "confettiContainer" : ""}`}>
      <div className="title">
        <div className="head">
          <h1> mental disorder </h1>
          <hr />
          <br />
        </div>
        <div className="desc">
          <div>
            <br />
            <p>
              {" "}
              Welcome to our captivating memory game! Challenge your brain and
              test your memory skills by matching pairs of cards consecutively.
              But watch out, if you don't find the matching cards in time,
              they'll play a little game of hide-and-seek. Get ready for a
              delightful adventure of card-flipping fun!
            </p>
          </div>
          <p> A dripy da coder production. </p>
        </div>
      </div>
      <div className="board">
        {cards.map(function (card, index) {
          return (
            <div
              key={index}
              className={`card ${
                firstCard === card || secondCard === card || card.matched
                  ? "flip"
                  : ""
              }`}
              onClick={() => onCardClick(index)}
              style={{ order: card.order }}
              onMouseEnter={() => {
                audio_click_play();
                hue();
              }}
              onMouseLeave={() => {
                audio_click_pause();
              }}
            >
              <img src={card.icon} alt={`Card ${index}`} className="front" />
              <img src="langda.jpg" alt="Card Back" className="back" />
            </div>
          );
        })}
      </div>
      {allMatched ? <Dialogue></Dialogue> : ""}
      <div className="wild">
        <About />
        {!token ? (
          <div className="musicl">
            <Login />
          </div>
        ) : (
          <Music />
        )}
      </div>
    </div>
  );
}

export default App;
