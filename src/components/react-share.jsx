import React, { Component, useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
const ReactShare = ({ share }) => {
  const [showShare, setShowShare] = useState(true);
  const shareUrl = "https://memory-game-flax-six.vercel.app/";
  const handleShareClick = () => {
    setShowShare(false);
  };
  if (!showShare) {
    return null;
  }
  return (
    <div
      style={{
        background: "#0000",
        height: "100vh",
        width: "100%",
      }}
    >
      <h1>I hope you like it</h1>
      <div className="close" onClick={handleShareClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <FacebookShareButton
        url={shareUrl}
        quote={"Title or jo bhi aapko likhna ho"}
        hashtag={"#portfolio..."}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton
        url={shareUrl}
        quote={"Title or jo bhi aapko likhna ho"}
        hashtag={"#portfolio..."}
      >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ReactShare;
