import PersonCard from "../../pages/ProfilePage/PersonCard/PersonCard";
import PropTypes from "prop-types";
import React from "react";

function SelectPeopleList(props) {
  function handleSelectChange(id, selected) {
    let peopleIds = [...props.peopleIds];
    // if selected, add id
    if (selected) {
      peopleIds.push(id);
    } else {
      // if unselected, remove id
      peopleIds.splice(peopleIds.indexOf(id), 1);
    }
    props.onChange(peopleIds);
  }
  return (
    <div {...props}>
      {props.people.map((person) => (
        <PersonCard
          style={{ marginTop: "0.5rem" }}
          person={person}
          size="small"
          onSelectChange={handleSelectChange}
          selected={props.peopleIds.includes(person.id)}
          selectable
        />
      ))}
    </div>
  );
}

SelectPeopleList.propTypes = {
  people: PropTypes.array.isRequired,
  peopleIds: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

SelectPeopleList.defaultProps = {
  onChange: () => {},
};

export default SelectPeopleList;
