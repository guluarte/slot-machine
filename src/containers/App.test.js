// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";

// eslint-disable-next-line no-undef
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
