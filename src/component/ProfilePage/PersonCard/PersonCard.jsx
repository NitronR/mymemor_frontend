import React from "react";
import { Card } from "react-bootstrap";
import "./PersonCard.css";

function PersonCard(props) {
  // TODO default pic url
  let profilePicURL =
    props.profilePicURL === "" ? "default" : props.profilePicURL;

  return (
    <Card className="person-card">
      <Card.Body className="person-card-body">
        <div className="person-card-content">
          {/* Person image */}
          <img
            src={profilePicURL}
            className="person-card-pic"
            alt="profile-pic"
          />
          {/* Person name, username */}
          <span className="person-card-text">
            <h2 className="person-card-name">{props.name}</h2>
            <h3 className="person-card-username">@{props.username}</h3>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PersonCard;
