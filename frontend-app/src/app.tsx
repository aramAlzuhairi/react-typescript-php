import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Header from "./Header";

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`;

class Myapp extends Component {
  render() {
    const {
      user: { name, email },
      logged,
    } = window.PHPApp;

    return (
      <Fragment>
        <Header />
        <div className="dashboard">
          {logged && <h2 className="status">Logged In</h2>}
          <h1 className="name"> {name}</h1>
          <p className="email">{email}</p>

          <p>API host variable {__API_HOST__}</p>
        </div>
      </Fragment>
    );
  }
}

render(<Myapp />, document.getElementById("app"));
