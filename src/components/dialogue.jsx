import React, { useEffect, useState } from "react";
import "./dialogue.css";
import ReactShare from "./react-share";

const Dialogue = ({ clickCount }) => {
  const [fact, setFact] = useState("");
  const [showShare, setShowShare] = useState(true);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/facts?limit=1",
          {
            headers: {
              "X-Api-Key": "2IwiG26KjqJUqg48xjzMzA==WcQJAjj5PrWs7L42",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setFact(data[0]?.fact || "No fact available");
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    fetchFact();
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };
  const handleShareClick = () => {
    setShowShare(true);
    // setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const pgRefresh = () => {
    location.reload();
  };

  return (
    <div className="message">
      <div className="close" onClick={handleClick}>
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
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="box">
        <p>{fact}</p>
        <p>I took you {clickCount} clicks to crack the game</p>
        <div className="user-opt">
          <p>Tap here to play again</p>
          <div className="button-bx">
            <div className="button" onClick={pgRefresh}>
              <p>Refresh</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                height={24}
                width={24}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div className="button" id="share" onClick={handleShareClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-6"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showShare && <ReactShare visible={showShare} />}
    </div>
  );
};

export default Dialogue;
