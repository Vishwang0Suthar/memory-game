import React from "react";
// import PropTypes from "prop-types";

const Title = ({ isMobile }) => {
  return (
    <>
      <div className="title">
        <h1>Memory Game</h1>
        <hr />
        <div className="title-head">
          <div className="desc">
            <br />
            {isMobile ? (
              <p>
                Welcome to the captivating memory game! Challenge your brain and
                test your memory skills by matching pairs of cards
                consecutively.
              </p>
            ) : (
              <p>
                Welcome to the captivating memory game! Challenge your brain and
                test your memory skills by matching pairs of cards
                consecutively. But watch out, if you don't find the matching
                cards in time, they'll play a little game of hide-and-seek. Get
                ready for a delightful adventure of card-flipping fun!
              </p>
            )}
            <p> A dripy da coder production. </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
