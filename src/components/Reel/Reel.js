// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { TOP, MIDDLE, BOTTOM, START_SPINNING, FIXED } from "../../constants";
import "./Reel.css";

const positions = {
  BAR: [790, 880, [980, 50]],
  BAR3X: [[50, 980], 140, 230],
  CHERRY: [230, 320, 410],
  SEVEN: [410, 510, 610],
  BAR2X: [610, 690, 790]
};

export class Reel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: Math.floor(Math.random() * 1000)
    };
    this.delay = props.delay;
    this.intervalMs = props.intervalMs;
    this.onFinish = props.onFinish;
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    this.setState({
      ...this.state,
      completed: false,
      pos: this.state.pos + Math.floor(Math.random() * 1000)
    });
  }

  getItemsInWinningPosition(landingPosition) {
    const items = [null, null, null];
    for (const key in positions) {
      if (positions.hasOwnProperty(key)) {
        const elements = positions[key];
        for (let index = 0; index < elements.length; index++) {
          const item = elements[index];
          if (item instanceof Array) {
            for (const innerItem of item) {
              if (innerItem === landingPosition) {
                items[index] = key;
              }
            }
          } else {
            if (item === landingPosition) {
              items[index] = key;
            }
          }
        }
      }
    }

    return items;
  }

  start() {
    let symbol = "";
    let landingPosition = 0;

    if (this.props.mode && this.props.mode === FIXED) {
      symbol = positions[this.props.symbol];

      switch (this.props.position) {
        case TOP:
          landingPosition =
            symbol[0] instanceof Array ? symbol[0][0] : symbol[0];
          break;

        case MIDDLE:
          landingPosition =
            symbol[1] instanceof Array ? symbol[1][0] : symbol[1];
          break;

        case BOTTOM:
          landingPosition =
            symbol[2] instanceof Array ? symbol[2][0] : symbol[2];
          break;

        default:
          break;
      }
    } else {
      const symbols = Object.keys(positions)[Math.floor(Math.random() * 4)];

      symbol = positions[symbols];
      const randomPosition = symbol[Math.floor(Math.random() * 3)];

      landingPosition =
        randomPosition instanceof Array ? randomPosition[0] : randomPosition;
    }

    const interValHandler = setInterval(() => this.tick(), 50);
    setTimeout(() => {
      clearInterval(interValHandler);

      this.setState({
        ...this.state,
        pos: landingPosition
      });

      const [top, middle, bottom] = this.getItemsInWinningPosition(
        landingPosition
      );

      this.onFinish(top, middle, bottom);
    }, this.delay);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.status === START_SPINNING &&
      this.props.status !== START_SPINNING
    ) {
      this.start();
    }
  }

  render() {
    const { left } = this.props;
    return (
      <div
        className="reel"
        style={{
          left,
          backgroundPosition: "45px " + this.state.pos + "px"
        }}
      >
        <div className="gradient" />
      </div>
    );
  }
}
