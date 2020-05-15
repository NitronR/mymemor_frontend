import "./MemoCard.css";

import { Card, Carousel, Col, Row } from "react-bootstrap";

import ImageStack from "../ImageStack";
import React from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { getUserState } from "../../selectors";
import { withRouter } from "react-router-dom";

// max number of tagged people images to show on MemoCard
const MAX_TAGGED_PEOPLE = 4;

class MemoCard extends React.Component {
  render() {
    // People other than current user
    let people = this.props.memory.users.filter(
      (user) => user.username !== this.props.user.username
    );

    // image urls for tagged people profile pictures
    let imageURLs = people
      .map((person) => person.profile_pic_url)
      .slice(0, Math.min(people.length, MAX_TAGGED_PEOPLE));
    return (
      <Card className="memocard">
        <Card.Body>
          <Card.Title>
            {/* Topic */}
            {this.props.memory.topic}
            {/* Location */}
            <div className="memocard-location">
              {this.props.memory.location}
            </div>
          </Card.Title>
          <Card.Text as="div">
            {/* Content */}
            <span className="memocard-content">
              {this.props.memory.content}
            </span>

            {/* Photo carousel */}
            {this.props.memory.photos.length > 0 && (
              <Carousel style={{ margin: "1rem -1rem 0rem -1rem" }}>
                {/* render photos in carousel */}
                {this.props.memory.photos.map((photo, index) => (
                  <Carousel.Item
                    key={index + photo}
                    className="memocard-photo"
                    style={{ backgroundImage: 'url("' + photo + '")' }}
                    alt="memocard item"
                  />
                ))}
              </Carousel>
            )}

            {/* Bottom bar - date, tagged people */}
            <Row
              style={{
                marginTop: "0.5rem",
                marginBottom: "-0.5rem",
                fontSize: "14px",
                color: "#555",
              }}
            >
              {/* start date - end date */}
              <Col style={{ display: "grid", alignContent: "center" }}>
                {/* display if start and end date exist */}
                {this.props.memory.startDate &&
                  this.props.memory.endDate &&
                  `${dateFormat(
                    this.props.memory.startDate,
                    "mmm dd, yyyy"
                  )} - ${dateFormat(
                    this.props.memory.endDate,
                    "mmm dd, yyyy"
                  )}`}
              </Col>
              <Col style={{ textAlign: "right" }}>
                {/* Tagged People */}
                <ImageStack
                  style={{ cursor: "pointer" }}
                  imageURLs={imageURLs}
                  onClick={() => this.props.onTaggedPeopleClick(people)}
                />
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

let mapStateToProps = (state) => ({
  user: getUserState(state),
});

export default withRouter(connect(mapStateToProps)(MemoCard));
