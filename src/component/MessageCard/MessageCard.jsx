import { Card } from "react-bootstrap";
import React from "react";

// Shows a message in a card
export function MessageCard(props) {
  return (
    <div
      // if spaced, add space around the card
      style={
        props.spaced && {
          width: "100%",
          height: "80%",
          display: "grid",
          alignContent: "center",
        }
      }
    >
      <Card style={props.spaced && { margin: "auto" }} as="span">
        <Card.Body>{props.children}</Card.Body>
      </Card>
    </div>
  );
}
