/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { render } from "enzyme";
import { DebugArea } from "./DebugArea";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<DebugArea />", () => {
  it("has 1 Paper", () => {
    const wrapper = shallow(
      <DebugArea
        classes={{}}
        mode="FIXED"
        parentState={{}}
        handleChange={() => {}}
        enabled={true}
      />
    );
    expect(wrapper.find(Paper)).to.have.lengthOf(1);
  });

  it("has 3 InputLabel ", () => {
    const wrapper = shallow(
      <DebugArea
        classes={{}}
        mode="FIXED"
        parentState={{}}
        handleChange={() => {}}
        enabled={true}
      />
    );
    expect(wrapper.find(InputLabel)).to.have.lengthOf(7);
  });

  it("has 26 MenuItem ", () => {
    const wrapper = shallow(
      <DebugArea
        classes={{}}
        mode="FIXED"
        parentState={{}}
        handleChange={() => {}}
        enabled={true}
      />
    );
    expect(wrapper.find(MenuItem)).to.have.lengthOf(26);
  });

  it("has 26 Select ", () => {
    const wrapper = shallow(
      <DebugArea
        classes={{}}
        mode="FIXED"
        parentState={{}}
        handleChange={() => {}}
        enabled={true}
      />
    );
    expect(wrapper.find(Select)).to.have.lengthOf(7);
  });

  it("has 4 h3 tag", () => {
    const wrapper = shallow(
      <DebugArea
        classes={{}}
        mode="FIXED"
        parentState={{}}
        handleChange={() => {}}
        enabled={true}
      />
    );
    expect(wrapper.find("h3")).to.have.lengthOf(4);
  });

  it("contains Reel 1, Reel 2, Reel 3", () => {
    const wrapper = render(
      <DebugArea
        classes={{}}
        mode="FIXED"
        parentState={{
          symbolReel1: 0,
          symbolReel2: 0,
          symbolReel3: 0,
          landingPositionReel1: 0,
          landingPositionReel2: 0,
          landingPositionReel3: 0
        }}
        handleChange={() => {}}
        enabled={true}
      />
    );
    expect(wrapper.text()).to.contain("Reel 1");
    expect(wrapper.text()).to.contain("Reel 2");
    expect(wrapper.text()).to.contain("Reel 3");
  });

});
