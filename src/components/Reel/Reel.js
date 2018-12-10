// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { START_SPINNING, SPINNING } from "../../actions";
import "./Reel.css";
import BAR from "./BAR.png";
import BAR_2X from "./2xBAR.png";
import BAR_3X from "./3XBAR.png";
import SEVEN from "./7.png";
import CHERRY from "./Cherry.png";

// const SPACE = "SPACE";

export class Reel extends Component {
  constructor(props) {
    super(props);
    this.items = [BAR_3X, BAR, BAR_2X, SEVEN, CHERRY];
    this.state = {
      status: props.status,
      pos: 0
    };
    this.delay = props.delay;
    this.intervalMs = props.intervalMs;
    this.onFinish = props.onFinish;
  }

  componentDidMount() {
    this.tick();
  }

  nextItem(index) {
    return ++index % this.items.length;
  }

  tick() {
    const item1 = this.nextItem(
      this.state.item1 || Math.floor(Math.random() * this.items.length)
    );
    const item2 = this.nextItem(this.state.item2 || item1);
    const item3 = this.nextItem(this.state.item3 || item2);
    this.setState({
      ...this.state,
      completed: false,
      item1,
      item2,
      item3,
      pos: this.state.pos + 100
    });
  }

  start() {
    const interValHandler = setInterval(() => this.tick(), this.intervalMs);
    setTimeout(() => {
      clearInterval(interValHandler);
      this.setState({
        ...this.state,
        status: SPINNING,
        completed: true
      });
      this.onFinish(this.state.item1, this.state.item2, this.state.item3);
    }, this.delay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === START_SPINNING) {
      this.start();
    }
  }

  render() {
    return (
        <div className="reel" style={{ backgroundPosition: "0px " + this.state.pos + "px" }}></div>
    );
  }
}
