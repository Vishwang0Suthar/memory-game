import React, { useEffect, useState } from "react";
import "./dialogue.css";

const Dialogue = ({ clickCount }) => {
  const [fact, setFact] = useState("");

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

  if (!isVisible) {
    return null;
  }

  return (
    <div className="message">
      <div className="close" onClick={handleClick}></div>
      <div className="box">
        <p>{fact}</p>
        <p>{clickCount}</p>
      </div>
    </div>
  );
};

export default Dialogue;
