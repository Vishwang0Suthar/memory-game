import React, { useState } from "react";
import Dialogue from "./dialogue";
import ReactShare from "./react-share";

const ParentComponent = ({ clickCount }) => {
  const [isDialogueVisible, setIsDialogueVisible] = useState(true);
  const [show, setShow] = useState(true);
  const handleShareClick = () => {
    setIsDialogueVisible(false);
  };

  const handleCloseClick = () => {
    setIsDialogueVisible(true);
  };
  const handleMainCloseClick = () => {
    setShow(false);
  };
  if (!show) {
    return null;
  }
  return (
    <div className="message">
      {isDialogueVisible ? (
        <Dialogue
          clickCount={clickCount}
          handleMainCloseClick={handleMainCloseClick}
          onShareClick={handleShareClick}
        />
      ) : (
        <ReactShare clickCount={clickCount} onCloseClick={handleCloseClick} />
      )}
    </div>
  );
};

export default ParentComponent;
