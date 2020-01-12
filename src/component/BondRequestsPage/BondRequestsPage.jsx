import "./BondRequestsPage.css";

import React from "react";

export default class BondRequestsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bondRequests: []
    };

    this.handleReply = this.handleReply.bind(this);
  }
  render() {
    return (
      <div id="bond-requests-boundary">
        <h1>Bond requests</h1>
        {/* TODO */}
      </div>
    );
  }
  handleReply(bondRequestId, response) {
    // TODO
  }
}
