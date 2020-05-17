import { Modal } from "react-bootstrap";
import PersonCard from "../../pages/ProfilePage/PersonCard";
import PropTypes from "prop-types";
import React from "react";

// shows a list of people in a modal
function PeopleModal(props) {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>Memory shared with...</Modal.Header>
      <Modal.Body>
        {/* Render list */}
        {props.people.map((person) => (
          <PersonCard
            person={person}
            size="small"
            onClick={() => props.onPersonClick(person)}
            style={{ marginTop: "0.5rem" }}
            clickable
          />
        ))}
      </Modal.Body>
    </Modal>
  );
}

PeopleModal.propTypes = {
  people: PropTypes.array.isRequired,
  onPersonClick: PropTypes.func,
};

PeopleModal.defaultProps = {
  onPersonClick: () => {},
};

export default PeopleModal;
