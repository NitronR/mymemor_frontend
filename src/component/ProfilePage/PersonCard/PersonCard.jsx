import "./PersonCard.css";

import { Button, Card } from "react-bootstrap";

import React from "react";

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
            <h4 className="person-card-name">{props.name}</h4>
            <h5 className="person-card-username">@{props.username}</h5>
          </span>
        </div>
        {/* Bond request part */}
        {props.bondCard && (
          <div className="text-right">
            <Button
              variant="primary"
              onClick={props.onAccept}
              style={{ marginRight: "0.5rem" }}
            >
              Accept
            </Button>
            <Button variant="danger" onClick={props.onDecline}>
              Decline
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default PersonCard;
