import React from "react";
import Card from "react-bootstrap/Card";
import "./AddMemoryPage.css";
import { Form, Alert } from "react-bootstrap";
import Input from "../Form/Input";
import { MAX_LEN_TOPIC } from '../../constants/fieldLimits';
import ApiService from "../../service/ApiService";

class AddMemoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: {
        topic: "",
        content: "",
        photo_urls : [],
        start_date : Date,
        end_date : Date,
        add_people : []
      },
      errors: {},
      formInvalid: true
    };
    this.handleInput = this.handleInput.bind(this);
  }

  render() {
    return (
      <div className="boundary-center">
        {/* Redirect to login if not logged in */}
        {/* {!this.props.user.authenticated && <Redirect to="/login" />} */}
        
        <Card className="main-card">
          <Card.Title>
            {/* Add Memory heading */}
            <h3>Add Memory</h3>
          </Card.Title>
          <Card.Body>
            {/* Add Memory form */}
            <Form id="addMemory-form" onSubmit={this.addMemory} className="text-left">
              {/* Non field errors */}
              <Alert variant={"danger"} show={"non_field" in this.state.errors}>
                {this.state.errors.non_field &&
                  this.state.errors.non_field.map((error, idx) => (
                    <div key={idx}>{error}</div>
                  ))}
              </Alert>

              {/* Topic */}
              <Input
                name="topic"
                type="text"
                label="Topic"
                errors={this.state.errors.topic}
                onChange={this.handleInput}
                required
              />

              {/* Content */}
              <Input
                name="content"
                type="text"
                label="Content"
                errors={this.state.errors.label}
                onChange={this.handleInput}
                required
              />

              {/* Photo Urls */}
              <Input
                name="photo_urls"
                type="List"
                label="Photo Urls (Line Seperated)"
                errors={this.state.errors.photo_urls}
                onChange={this.handleInput}
                required
              />

              {/* Start Date */}
              <Input
                name="start_date"
                type="Date"
                label="Start Date"
                errors={this.state.errors.start_date}
                onChange={this.handleInput}
                required
              />

              {/* End Date */}
              <Input
                name="end_date"
                type="Date"
                label="End Date"
                errors={this.state.errors.end_date}
                onChange={this.handleInput}
              />

              {/* Add People */}
              <Input
                name="add_people"
                type="List"
                label="Add People"
                errors={this.state.errors.add_people}
                onChange={this.handleInput}
              />

              {/* Add Memory button */}
              <Form.Control
                type="submit"
                className="btn-primary"
                value="Add Memory"
              />
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;
    let errors = this.state.errors;

    errors[name] = [];

    switch (name) {
      case "topic":
        // topic should be in correct format
        if (value.length == 0 || value.length > MAX_LEN_TOPIC) {
          errors[name].push("topic should be in valid range");
        }
        break;
      case "content":
        // validation for content 
        break;
      case "photo_urls":
        // validation for photo_urls
        break;
      case "start_date":
        // validation
        break;
      case "end_date" :
        // validation
        break;
      case "add_people" :
        // validation
        break;
      default:
        delete errors[name];
    }

    // if even one error then return form is invalid
    let formInvalid = Object.keys(errors).some(field => {
      return errors[field].length !== 0;
    });

    this.setState(prevState => {
      return {
        form_data: {
          ...prevState.form_data,
          [name]: value
        },
        errors: errors,
        formInvalid: formInvalid
      };
    });
  }

  addMemory = async event => {
    event.preventDefault();

    if (!this.state.formInvalid) {
      // send to api service and get response
      // TODO handle promise reject
      // TODO show loading
      ApiService.register(this.state.form_data).then(response => {
        response = response.data;
        if (response.status === "success") {
          // redirect to login
          // TODO show success
          this.props.history.push("/login");
        } else if (response.status === "error") {
          // show errors
          this.setState({ errors: response.errors });
        } else {
          // TODO something went wrong
        }
      });
    }
  };
}


export default AddMemoryPage;
