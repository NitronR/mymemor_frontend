import { Button } from "react-bootstrap";
import Input from "../Input/Input";
import PropTypes from "prop-types";
import React from "react";
import { getErrors } from "../../../utils/Validation";

// Input a list of strings
class ListInput extends React.Component {
  constructor(props) {
    super(props);

    // field = {value: current value of field, errors: array of string}
    this.state = {
      fields: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  render() {
    return (
      <div {...this.props}>
        {/* label */}
        {this.props.label}
        <br /> <br />
        {/* input fields */}
        {this.state.fields.map((field, index) => (
          // display input field and remove button horizontally
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              justifyContent: "center",
            }}
          >
            {/* Field input control */}
            <Input
              onChange={(event) => this.handleChange(event.target.value, index)}
              value={field.value}
              errors={field.errors}
            />
            {/* Remove field button */}
            <Button
              variant="danger"
              onClick={() => this.handleRemove(index)}
              style={{
                marginLeft: "1rem",
                height: "2.3rem",
                width: "2.3rem",
                padding: "0",
              }}
            >
              &times;
            </Button>
          </div>
        ))}
        {/* Add button to add one more input */}
        <Button onClick={this.handleAdd}>Add</Button>
      </div>
    );
  }
  // add empty input field
  handleAdd() {
    this.setState(
      {
        fields: [
          ...this.state.fields,
          { value: "", errors: getErrors(this.props.validators, "") },
        ],
      },
      this.props.onListChange(this.state.fields)
    );
  }
  // update value of field when corresponding input value changes
  handleChange(value, index) {
    let fields = [...this.state.fields];
    fields[index].value = value;
    fields[index].errors = getErrors(this.props.validators, value);

    this.setState({ fields }, this.props.onListChange(this.state.fields));
  }
  // remove a field from state
  handleRemove(index) {
    let fields = [...this.state.fields];
    fields.splice(index, 1);
    this.setState({ fields }, this.props.onListChange(this.state.fields));
  }
}

ListInput.propTypes = {
  onListChange: PropTypes.func.isRequired,
  // validators are applied for each string separately
  validators: PropTypes.array,
  label: PropTypes.string,
};

ListInput.defaultProps = {
  validators: [],
};

export default ListInput;
