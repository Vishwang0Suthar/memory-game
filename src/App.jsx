import { useEffect, useState } from "react";
// import { logDataToGoogleSheet } from "./backend/googlesheet.js";
import "./App.css";
import axios from "axios";

import { handleMatch } from "./script.js";
import Login from "./login.jsx";
import Music from "./music.jsx";
import About from "./about.jsx";
import "./components/user.css";
import * as XLSX from "xlsx";

// import { setClientToken } from "./spotify";
// import Dialogue from "./components/dialogue.jsx";
import langda from "../langda.jpg";
// import { setClientToken } from "./spotify.jsx";
import ParentComponent from "./components/dialogueMain.jsx";
import Mobileview from "./components/mobliview.jsx";
import Title from "./components/title.jsx";
import { injectSpeedInsights } from "@vercel/speed-insights";
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
  const [inputValue, setInputValue] = useState("");
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [cards, setCards] = useState(initialCards);
  const [clickCount, setClickCount] = useState(0);
  const [allMatched, setAllMatched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState(() => {
    // Retrieve from sessionStorage if available
    return sessionStorage.getItem("userName") || "";
  });
  const [entryTime, setEntryTime] = useState("");
  const audio_click = new Audio("audio/00click.mp3");
  injectSpeedInsights();
  // audio_click.load();

  // const handleGameCompletion = () => {
  //   const currentTime = new Date().toISOString(); // Get the current time as entry time
  //   setEntryTime(currentTime);

  //   // Call function to log user data to Google Sheets
  //   logDataToGoogleSheet(userName, currentTime, clickCount);

  //   console.log("Game Completed!");
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAllMatched(true);
  //     handleGameCompletion();
  //   }, 5000);

  //   // Cleanup the timer if the component unmounts or if the effect is re-run
  //   return () => clearTimeout(timer);
  // }, []);

  const postClickData = async (name, clickCount) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-click",
        {
          name,
          clickCount,
        }
      );

      console.log("Response:", response.data);
      // alert("Data saved successfully!");
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response?.data || error.message
      );
      // alert("Failed to save data.");
    }
  };

  useEffect(() => {
    // Function to update the state based on screen width
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Set initial state
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if all cards have been matched
    const allCardsMatched = cards.every((card) => card.matched);

    if (allCardsMatched) {
      setAllMatched(true);
      postClickData(userName, clickCount);
      handleMatch();
      // alert("All cards matched!");
      // console.log("All matched also No. of clicks = " + clickCount);
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
    const token = window.sessionStorage.getItem("token");
    const tokenExpiry = window.sessionStorage.getItem("token-expiry");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!token || (tokenExpiry && new Date().getTime() > tokenExpiry)) {
      if (hash) {
        const _token = hash.split("&")[0].split("=")[1];
        const expiresIn = parseInt(hash.split("expires_in=")[1].split("&")[0]);
        const expiryTime = new Date().getTime() + expiresIn * 1000; // Convert seconds to milliseconds
        window.sessionStorage.setItem("token", _token);
        window.sessionStorage.setItem("token-expiry", expiryTime.toString());
        setToken(_token);
        // setClientToken(_token);
      }
    } else {
      setToken(token);
      // setClientToken(token);
    }
  }, []);

  const handleInputChange = () => {
    // console.log(inputValue);

    setUserName(inputValue);
    sessionStorage.setItem("userName", inputValue);
    // console.log(sessionStorage.getItem("userName"));

    // console.log(userName);
    // Correctly update userName here
  };

  return (
    <>
      {/* <SpeedInsights /> */}

      {userName === "" ? (
        <div className="user-info">
          <div className="user-name">
            <div className="user-q">
              <h2>Username</h2>
              <input
                className="user-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="leaderboard-name"
              />
            </div>
            <button className="user-button" onClick={handleInputChange}>
              <p>Dive in</p>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="game" id={`${allMatched ? "confettiContainer" : ""}`}>
        <Title userName={userName} isMobile={isMobile} />

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
    </>
  );
}

export default App;
