import { useState } from "react";

export default function About() {
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

  const [textToCopy, setTextToCopy] = useState("dripydacoder@gmail.com");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log("Text copied to clipboard: " + textToCopy);
      // Optionally, provide user feedback
      // alert('Text copied to clipboard: ' + textToCopy);
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
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
      <a
        onMouseEnter={() => {
          audio_click_play();
          hue();
        }}
        onMouseLeave={() => {
          audio_click_pause();
        }}
        href="mailto:dripydacoder@gmail.com"
      >
        {" "}
        <i className="fas fa-envelope"></i> &nbsp;{textToCopy}
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
      <a href="https://linktr.ee/dripy_vishwng">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          // fill-rule="evenodd"
          // clip-rule="evenodd"
          // stroke="white"
          height={24}
          width={24}
          viewBox="0 0 417 512.238"
        >
          <path
            fill="#FAB55A"
            fill-rule="nonzero"
            d="M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z"
          />
        </svg>
        &nbsp;Dripy Linlktree
      </a>
    </div>
  );
}
