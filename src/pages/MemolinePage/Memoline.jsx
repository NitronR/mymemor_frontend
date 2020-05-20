import "./Memoline.css";

import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";

import ApiService from "../../service/ApiService";
import { ChevronDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import MemoCard from "../../component/MemoCard";
import PeopleModal from "../../component/PeopleModal/PeopleModel";
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
      peopleModalContent: [],
      showPeopleModal: false,
      showOptions: false,
    };

    this.fetchMemoline = this.fetchMemoline.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  render() {
    // display options -> sort by and sort order
    let displayOptions = (
      <DisplayOptions
        sortBy={this.state.sortBy}
        order={this.state.order}
        onSortChange={(sortBy) => this.setState({ sortBy }, this.fetchMemoline)}
        onOrderChange={(order) => this.setState({ order }, this.fetchMemoline)}
      />
    );
    return (
      <div id="memoline-boundary">
        {/* Redirect to login if not logged in */}
        <RedirectIf condition={!this.props.user.authenticated} to="/login" />

        {/* if no memories then show add memory card in center */}
        {this.state.memories.length === 0 && (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              alignContent: "center",
              minHeight: "80%",
            }}
          >
            <AddMemoryCard style={{ width: "15rem" }} />
          </div>
        )}
        {/* if have memories then render in memocard */}
        {this.state.memories.length !== 0 && (
          <div id="memoline-container">
            {/* Options bar for mobile */}
            <Card id="memoline-options-bar">
              <Card.Body>
                <Row>
                  <Col>
                    <AddMemoryButton style={{ width: "100%" }} />
                  </Col>
                  <Col
                    style={{
                      justifyContent: "right",
                      display: "grid",
                      alignContent: "center",
                    }}
                  >
                    <ChevronDown
                      size={20}
                      onClick={() =>
                        this.setState({ showOptions: !this.state.showOptions })
                      }
                    />
                  </Col>
                </Row>

                {/* Collapsible options */}
                {this.state.showOptions && (
                  <div style={{ marginTop: "0.5rem" }}>{displayOptions}</div>
                )}
              </Card.Body>
            </Card>

            {/* Memoline */}
            <div id="memoline">
              {/* Render memories in MemoCard */}
              {this.state.memories.map((memory, idx) => (
                <MemoCard
                  memory={memory}
                  key={idx}
                  onTaggedPeopleClick={(people) =>
                    this.setState({
                      peopleModalContent: people,
                      showPeopleModal: true,
                    })
                  }
                />
              ))}
            </div>

            {/* Options */}
            <div id="memoline-options">
              {/* Add memory */}
              <AddMemoryCard />

              {/* Display options */}
              <Card style={{ marginTop: "1rem" }}>
                <Card.Body>{displayOptions}</Card.Body>
              </Card>
            </div>
          </div>
        )}
        {/* Modal to show tagged people */}
        <PeopleModal
          people={this.state.peopleModalContent}
          show={this.state.showPeopleModal}
          onPersonClick={(person) =>
            this.props.history.push(`/profile/${person.username}`)
          }
          onClose={() => this.setState({ showPeopleModal: false })}
        />
      </div>
    );
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
}

// card with add memory button
function AddMemoryCard(props) {
  return (
    <Card style={props.style}>
      <Card.Body style={{ padding: 0 }}>
        <h5 style={{ padding: "2rem" }}>Any memory you want to add?</h5>
        <AddMemoryButton
          style={{
            width: "100%",
            marginTop: "-2rem",
            marginBottom: "-1rem",
          }}
        />
      </Card.Body>
    </Card>
  );
}

function AddMemoryButton(props) {
  return (
    <Link to="/add-memory">
      <Button style={props.style}>Add Memory</Button>
    </Link>
  );
}

  // display options -> sort by and sort order
function DisplayOptions(props) {
  return (
    <div>
      <h6 style={{ padding: "0.5rem" }}>Sort by</h6>
      <ListGroup as="ul">
        <ListGroup.Item
          as="li"
          active={props.sortBy === "create_time"}
          onClick={() => props.onSortChange("create_time")}
          action
        >
          Creation Time
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          active={props.sortBy === "memory_time"}
          onClick={() => props.onSortChange("memory_time")}
          action
        >
          Memory Time
        </ListGroup.Item>
      </ListGroup>
      {/* Order */}
      <ListGroup as="ul" style={{ marginTop: "1rem" }}>
        <ListGroup.Item
          as="li"
          active={props.order === "ascending"}
          onClick={() => props.onOrderChange("ascending")}
          action
        >
          Ascending
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          active={props.order === "descending"}
          onClick={() => props.onOrderChange("descending")}
          action
        >
          Descending
        </ListGroup.Item>
      </ListGroup>{" "}
    </div>
  );
}

const mapStateToProps = (state) => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(MemolinePage);
