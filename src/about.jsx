import { useState } from "react";

export default function About(){

    const elements = document.querySelectorAll(".back");
    const audio_click = new Audio("audio/00click.mp3");
    audio_click.load();
    
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

      const [textToCopy, setTextToCopy] = useState('dripydacoder@gmail.com');

      const handleCopyClick = async () => {
        try {
          await navigator.clipboard.writeText(textToCopy);
          console.log('Text copied to clipboard: ' + textToCopy);
          // Optionally, provide user feedback
          // alert('Text copied to clipboard: ' + textToCopy);
        } catch (err) {
          console.error('Unable to copy text to clipboard', err);
        }
      };
    
      function getRandomRotation() {
        // Generate a random rotation angle between 0 and 360 degrees
        return `${Math.floor(Math.random() * 361)}deg`;
      }

    function hue() {
      elements.forEach((element) => {
        const randomRotation = getRandomRotation();
        element.style.setProperty("--random-rotation", randomRotation);
      });
    }

    return (
    <div className="about">
          <h2>about</h2>
          <hr />
          <a onMouseEnter={() => {
                audio_click_play();
                hue();
              }}
              onMouseLeave={() => {
                audio_click_pause();
              }} onClick={handleCopyClick}>
            {" "}
            <i className="fas fa-envelope"></i> &nbsp;{textToCopy}
            <i  className="fa-solid fa-copy"></i>
          </a>
          <a
            href="https://in.linkedin.com/in/vishwang-suthar-062b39233"
            onMouseEnter={() => {
                audio_click_play();
                hue();
              }}
              onMouseLeave={() => {
                audio_click_pause();
              }}
          >
            {" "}
            <i className="fa-brands fa-linkedin"></i> &nbsp;Vishwang Suthar
          </a>
          <a
            href="https://www.instagram.com/panjupanda69op/"
            onMouseEnter={() => {
                audio_click_play();
                hue();
              }}
              onMouseLeave={() => {
                audio_click_pause();
              }}
          >
            {" "}
            <i className="fa-brands fa-instagram"></i> &nbsp;Gallery Dump
          </a>
          <a
            href="https://www.instagram.com/panjupanda69op/"
            onMouseEnter={() => {
                audio_click_play();
                hue();
              }}
              onMouseLeave={() => {
                audio_click_pause();
              }}
          >
            {" "}
            <i className="fa-brands fa-github"></i> &nbsp;Linked!n
          </a>
        </div>
)}