import "./Memoline.css";

import { Button, Card, ListGroup } from "react-bootstrap";

import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import MemoCard from "../../component/MemoCard";
import React from "react";
import RedirectIf from "../../component/RedirectIf";
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
      sortBy: "create_time",
      order: "descending",
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
      let response = await ApiService.getMemoline(
        this.state.sortBy,
        this.state.order
      );

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
  handleSort = (sortBy) => {
    // update sortby state and fetch memoline
    this.setState({ sortBy: sortBy }, this.fetchMemoline);
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
                      marginBottom: "-1rem",
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
                <h5 style={{ padding: "0.5rem" }}>Sort by</h5>
                <ListGroup as="ul">
                  <ListGroup.Item
                    as="li"
                    active={this.state.sortBy === "create_time"}
                    onClick={() =>
                      this.setState(
                        { sortBy: "create_time" },
                        this.fetchMemoline
                      )
                    }
                    action
                  >
                    Creation Time
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    active={this.state.sortBy === "memory_time"}
                    onClick={() =>
                      this.setState(
                        { sortBy: "memory_time" },
                        this.fetchMemoline
                      )
                    }
                    action
                  >
                    Memory Time
                  </ListGroup.Item>
                </ListGroup>
                {/* Order */}
                <ListGroup as="ul" style={{ marginTop: "1rem" }}>
                  <ListGroup.Item
                    as="li"
                    active={this.state.order === "ascending"}
                    onClick={() =>
                      this.setState({ order: "ascending" }, this.fetchMemoline)
                    }
                    action
                  >
                    Ascending
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    active={this.state.order === "descending"}
                    onClick={() =>
                      this.setState({ order: "descending" }, this.fetchMemoline)
                    }
                    action
                  >
                    Descending
                  </ListGroup.Item>
                </ListGroup>{" "}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(MemolinePage);
