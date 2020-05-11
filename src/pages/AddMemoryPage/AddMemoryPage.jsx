import "./AddMemoryPage.css";

import { Alert, Col, Form, Row } from "react-bootstrap";

import ApiService from "../../service/ApiService";
import Card from "react-bootstrap/Card";
import Input from "../../component/Form/Input";
import { MAX_LEN_TOPIC } from "../../constants/fieldLimits";
import React from "react";
import RedirectIf from "../../component/RedirectIf";
import SelectPeopleList from "../../component/SelectPeopleList/SelectPeopleList";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { setLoading } from "../../actions";
import { toastSuccess } from "../../utils/Toast";

class AddMemoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: {
        topic: "",
        content: "",
        photo_urls: "",
        start_date: "",
        end_date: "",
        peopleIds: [],
      },
      errors: {},
      myPeople: [],
      formInvalid: true,
    };
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    // fetch my people
    this.fetchMyPeople();
  }
  async fetchMyPeople() {
    // start loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.getMyPeople();

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // update my people
        this.setState({ myPeople: response.people });
      } else if (response.status === "error") {
        // TODO show errors
      } else {
        // TODO something went wrong
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  }
  render() {
    return (
      <div id="add-memory-boundary">
        {/* Redirect to login if not logged in */}
        <RedirectIf condition={!this.props.user.authenticated} to="/login" />

        <Card className="main-card" style={{ width: "40rem" }}>
          <Card.Title>
            {/* Add Memory heading */}
            <h3>Add Memory</h3>
          </Card.Title>
          <Card.Body>
            {/* Add Memory form */}
            <Form
              id="add-memory-form"
              onSubmit={this.addMemory}
              className="text-left"
            >
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
                errors={this.state.errors.content}
                onChange={this.handleInput}
                as="textarea"
                rows="3"
                required
              />
              {/* Photo Urls */}
              {/* TODO photo url component with URL validation*/}
              <Input
                name="photo_urls"
                type="List"
                label="Photo Urls (Line Seperated)"
                errors={this.state.errors.photo_urls}
                onChange={this.handleInput}
                as="textarea"
                rows="3"
              />
              <Row>
                <Col>
                  {/* Start Date */}
                  <Input
                    name="start_date"
                    type="Date"
                    label="Start Date"
                    errors={this.state.errors.start_date}
                    onChange={this.handleInput}
                  />
                </Col>
                <Col>
                  {/* End Date */}
                  <Input
                    name="end_date"
                    type="Date"
                    label="End Date"
                    errors={this.state.errors.end_date}
                    onChange={this.handleInput}
                  />
                </Col>
              </Row>
              {/* Select People */}
              Select people
              <SelectPeopleList
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                people={this.state.myPeople}
                peopleIds={this.state.form_data.peopleIds}
                // update peopleIds list on change
                onChange={(selectedPeopleIds) =>
                  this.setState({
                    form_data: {
                      ...this.state.form_data,
                      peopleIds: selectedPeopleIds,
                    },
                  })
                }
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
        if (value.length === 0 || value.length > MAX_LEN_TOPIC) {
          errors[name].push(
            `Cannot have more than ${MAX_LEN_TOPIC} characters.`
          );
        }
        break;
      case "content":
        // TODO validation for content
        break;
      case "photo_urls":
        // TODO validation for photo_urls
        break;
      case "start_date":
        // TODO validation
        break;
      case "end_date":
        // TODO validation
        break;
      default:
        delete errors[name];
    }

    // if even one error then return form is invalid
    let formInvalid = Object.keys(errors).some((field) => {
      return errors[field].length !== 0;
    });

    this.setState((prevState) => {
      return {
        form_data: {
          ...prevState.form_data,
          [name]: value,
        },
        errors: errors,
        formInvalid: formInvalid,
      };
    });
  }

  addMemory = async (event) => {
    event.preventDefault();

    if (!this.state.formInvalid) {
      // send to api service and get response
      // TODO handle promise reject
      // TODO show loadingevent.preventDefault();

      let photos = this.state.form_data.photo_urls.split("\n");

      // clear errors
      this.setState({ errors: {} });

      // verify credentials

      // show loading
      this.props.setLoading(true);

      try {
        let response = await ApiService.addMemory({
          ...this.state.form_data,
          photos,
        });

        // throw if not ok
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        response = response.data;

        if (response.status === "success") {
          // show success
          toastSuccess("Memory added");

          // redirect to memoline
          this.props.history.push("/memoline");
        } else if (response.status === "error") {
          // show error in form
          this.setState({ errors: response.errors });
        } else {
          // TODO something went wrong
        }
      } catch (e) {
        // TODO handle promise reject
      } finally {
        // stop loading
        this.props.setLoading(false);
      }
    }
  };
}

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

export default connect(mapStateToProps, { setLoading })(AddMemoryPage);
