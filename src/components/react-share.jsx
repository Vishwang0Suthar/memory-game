import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  WhatsappIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./react-share.css";

const ReactShare = ({ onCloseClick, clickCount }) => {
  const shareUrl = "https://memory-game-flax-six.vercel.app/";
  const shareMessage = `🎮 I just completed the card-flipping game in ${clickCount} clicks! Can you beat my score? Match the cards, win the game, and enjoy your favorite playlist while playing. Check it out! 🎵 \n`;

  const handleShare = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="share-main">
      <div className="box">
        <h1>I hope you like it</h1>
        <div className="platforms">
          <div className="close" onClick={onCloseClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div
            onClick={() =>
              handleShare(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}&quote=${encodeURIComponent(shareMessage)}`
              )
            }
          >
            <FacebookIcon size={44} round={true} />
          </div>

          <div
            onClick={() =>
              handleShare(
                `https://web.whatsapp.com/send?text=${encodeURIComponent(
                  shareMessage + " " + shareUrl
                )}`
              )
            }
          >
            <WhatsappIcon size={44} round={true} />
          </div>
          <div className="share-button">
            <TwitterShareButton
              url={shareUrl}
              title={shareMessage}
              className="share-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                width={28}
                height={28}
                viewBox="0 0 24 24"
                // style="enable-background:new 0 0 24 24;"
              >
                <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
              </svg>
            </TwitterShareButton>
          </div>
          <div>
            <LinkedinShareButton
              url={shareUrl}
              title={shareMessage}
              className="share-button"
            >
              <LinkedinIcon size={44} round={true} />
            </LinkedinShareButton>
          </div>
          <div>
            <RedditShareButton
              url={shareUrl}
              title={shareMessage}
              className="share-button"
            >
              <RedditIcon size={44} round={true} />
            </RedditShareButton>
          </div>
          <CopyToClipboard text={`${shareMessage} ${shareUrl}`}>
            <div
              className="share-button"
              onClick={() => alert("Link copied to clipboard!")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                height={28}
                width={28}
                class="size-6"
                // style={{ padding: "20px" }}
              >
                {" "}
                <path
                  // height={20}
                  // width={20}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default ReactShare;
