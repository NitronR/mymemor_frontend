import "./PersonCard.css";

import { Button, Card } from "react-bootstrap";

import React from "react";

function PersonCard(props) {
  // TODO default pic url
  let profile_pic_url =
    props.person.profile_pic_url === ""
      ? "default"
      : props.person.profile_pic_url;

  return (
    <Card
      className={
        "person-card" +
        (props.selectable ? " selectable" : "") +
        (props.clickable ? " clickable" : "") +
        (props.selected ? " selected" : "")
      }
      onClick={() => {
        if (props.selectable)
          props.onSelectChange(props.person.id, !props.selected);
      }}
      {...props}
    >
      <Card.Body className={`person-card-body ${props.size}`}>
        <div className="person-card-content">
          {/* Person image */}
          <div>
            <img
              src={profile_pic_url}
              className={`person-card-pic ${props.size}`}
              alt="profile-pic"
            />
          </div>
          {/* Person name, username */}
          {props.size === "" && (
            <span className="person-card-text tiny">
              <h4 className="person-card-name">{props.person.name}</h4>
              <h5 className="person-card-username">@{props.person.username}</h5>
            </span>
          )}
          {props.size === "small" && (
            <span className="person-card-text tiny">
              <h5 className="person-card-name">{props.person.name}</h5>
              <h6 className="person-card-username">@{props.person.username}</h6>
            </span>
          )}
          {props.size === "tiny" && (
            <span className="person-card-text tiny">
              <h6 className="person-card-name">{props.person.name}</h6>
              <h6 className="person-card-username">@{props.person.username}</h6>
            </span>
          )}
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

PersonCard.defaultProps = {
  size: "",
};

export default PersonCard;
