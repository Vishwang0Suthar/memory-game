import React, { useState } from "react";
import Dialogue from "./dialogue";
import ReactShare from "./react-share";

const DialogueMain = () => {
  const [showDialogue, setShowDialogue] = useState(true);
  const [showShare, setShowShare] = useState(false);

  const handleShareClick = () => {
    setShowDialogue(false);
    setShowShare(true);
  };

  const handleCloseShare = () => {
    setShowShare(false);
    setShowDialogue(true);
  };

  return (
    <div>
      {showDialogue && (
        <Dialogue clickCount={3} onShareClick={handleShareClick} />
      )}
      {showShare && <ReactShare onClose={handleCloseShare} />}
    </div>
  );
};

export default DialogueMain;
