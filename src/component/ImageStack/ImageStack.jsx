import PropTypes from "prop-types";
import React from "react";

// Shows given images in a stack of circular imgs
function ImageStack(props) {
  return (
    <div onClick={props.onClick} style={props.style}>
      {props.imageURLs.map((imageURL, index) => (
        <img
          key={index + imageURL}
          src={imageURL}
          style={{
            width: "2rem",
            height: "2rem",
            marginLeft: "-1rem",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
          alt="Item in stack"
        />
      ))}
    </div>
  );
}

ImageStack.propTypes = {
  imageURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageStack;
