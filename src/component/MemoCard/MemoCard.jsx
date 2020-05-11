import "./MemoCard.css";

import { Card, Carousel } from "react-bootstrap";

import React from "react";

export default class MemoCard extends React.Component {
  render() {
    return (
      <Card className="memocard">
        <Card.Body>
          <Card.Title>{this.props.topic}</Card.Title>
          <Card.Text>
            {/* Location */}
            <div className="memocard-location">{this.props.location}</div>
            {/* Content */}
            <div className="memocard-content">{this.props.content}</div>

            {/* Photo carousel */}
            {this.props.photos.length > 0 && (
              <Carousel style={{ margin: "-1rem", marginTop: "1rem" }}>
                {this.props.photos.map((photo) => (
                  <Carousel.Item>
                    <div
                      className="memocard-photo"
                      style={{ backgroundImage: 'url("' + photo + '")' }}
                      alt="memocard item"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}

            {/* People */}
            {/* TODO */}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
