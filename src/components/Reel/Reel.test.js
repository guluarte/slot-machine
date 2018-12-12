/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { mount } from "enzyme";
import sinon from "sinon";
import { Reel } from "./Reel";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<Reel />", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Reel
        status={""}
        delay={2000}
        left={[15, 5]}
        mode={""}
        position={0}
        symbol={""}
      />
    );
    expect(wrapper.find(".reel")).to.have.lengthOf(1);
  });

  it("calls componentDidMount", () => {
    sinon.spy(Reel.prototype, "componentDidMount");
    mount(
      <Reel
        status={""}
        delay={2000}
        left={[15, 5]}
        mode={""}
        position={0}
        symbol={""}
      />
    );
    expect(Reel.prototype.componentDidMount).to.have.property("callCount", 1);
    Reel.prototype.componentDidMount.restore();
  });
});
