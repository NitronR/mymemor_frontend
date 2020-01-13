import "./Memoline.css";

import { Button, Card, Form } from "react-bootstrap";

import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import MemoCard from "../MemoCard";
import React from "react";
import RedirectIf from "../RedirectIf/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { setLoading } from "../../actions";

// TODO add scroll pagination
class MemolinePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memories: [],
      no_memories: false,
      sortBy: 'create_time'
    };

    this.fetchMemoline = this.fetchMemoline.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  componentDidMount = async () => {
    // fetch memoline
    this.fetchMemoline();
  };
  fetchMemoline = async () => {
    // start loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.getMemoline(this.state.sortBy);

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // show memories

        // TODO handle no memories
        this.setState({ memories: response.memories });
      } else {
        // TODO show error
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  };
  handleSort = event => {
    // TODO change sort
  };
  render() {
    return (
      <div id="memoline-boundary">
        <div id="memoline-container">
          {/* Redirect to login if not logged in */}
          <RedirectIf condition={!this.props.user.authenticated} to="/login" />

          {/* Memoline */}
          <div id="memoline">
            {this.state.memories.map((memory, idx) => (
              <MemoCard {...memory} key={idx} />
            ))}
          </div>

          {/* Options */}
          {/* Add memory */}
          <div id="memoline-options">
            <Card>
              <Card.Body style={{ padding: 0 }}>
                <h5 style={{ padding: "2rem" }}>Any memory you want to add?</h5>
                <Link to="/add-memory">
                  <Button
                    style={{
                      width: "14.8rem",
                      marginTop: "-2rem",
                      marginBottom: "-1rem"
                    }}
                  >
                    Add Memory
                  </Button>
                </Link>
              </Card.Body>
            </Card>

            {/* Sort by */}
            <Card style={{ marginTop: "1rem" }}>
              <Card.Body>
                <Form.Group controlId="sort-by" onChange={this.handleSort}>
                  <Form.Label>
                    <h5>Sort by</h5>
                  </Form.Label>
                  <Form.Control as="select">
                    <option value="create_time">Creation time</option>
                    <option value="memory_time">Memory time</option>
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(MemolinePage);
