/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { render } from "enzyme";
import { SlotMachine } from "./SlotMachine";
import Paper from "@material-ui/core/Paper";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<SlotMachine />", () => {
  it("has 1 Paper", () => {
    const wrapper = shallow(<SlotMachine classes={{}} />);
    expect(wrapper.find(Paper)).to.have.lengthOf(1);
  });

  it("has 1 SpinButton", () => {
    const wrapper = shallow(<SlotMachine classes={{}} />);
    expect(wrapper.find("#spintBtn")).to.have.lengthOf(1);
  });

  it("has Debug Area", () => {
    const wrapper = render(<SlotMachine classes={{}} />);
    expect(wrapper.text()).to.contain("Debug Area");
  });

  it("has 3 CHERRY symbols on top line 2000", () => {
    const wrapper = render(<SlotMachine classes={{}} />);
    expect(wrapper.text()).to.contain("3 CHERRY symbols on top line 2000");
  });

});
