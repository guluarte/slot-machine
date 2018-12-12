// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { TOP, MIDDLE, BOTTOM, START_SPINNING, FIXED } from "../../constants";
import "./Reel.css";

/** Landing positions */
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
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  /**
   * If the player resizes the window update the state
   *
   * @memberof Reel
   */
  resize() {
    this.setState({
      ...this.state,
      isMobile: window.innerWidth <= 760
    });
  }

  /**
   * Moves the background to a new random position
   *
   * @memberof Reel
   */
  tick() {
    this.setState({
      ...this.state,
      completed: false,
      pos: this.state.pos + Math.floor(Math.random() * 1000)
    });
  }

  /**
   * Search the positions object for all items that have
   * the landingPosition in their values
   *
   * @param {number} landingPosition
   * @returns Array
   * @memberof Reel
   */
  getItemsInWinningPosition(landingPosition) {
    const items = [null, null, null];
    for (const key in positions) {
      if (positions.hasOwnProperty(key)) {
        const elements = positions[key];
        for (let index = 0; index < elements.length; index++) {
          const item = elements[index];
          // If the value is an array search inside the aray for the landingPosition
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

    // If Fixed mode set the symbol and position
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
      // If random mode get the list of symbols and choose one
      const symbols = Object.keys(positions)[Math.floor(Math.random() * 4)];

      symbol = positions[symbols];

      //Get a random position
      const randomPosition = symbol[Math.floor(Math.random() * 3)];

      // If the position is an arran select the first one
      landingPosition =
        randomPosition instanceof Array ? randomPosition[0] : randomPosition;
    }

    // Move the bg every 50ms
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

      // Call the parent component with the items in top, middle and bottom
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

  /**
   * If it is a mobile device put the bg a little bit to the left
   */
  getBackgroundPadding() {
    return this.state.isMobile ? "-15px" : "45px";
  }

  /**
   * Use this for aligning the reel depending on the screensize
   * @param {number} leftDesktop
   * @param {number} leftMobile
   */
  getLeftPadding(leftDesktop, leftMobile) {
    return this.state.isMobile ? leftMobile : leftDesktop;
  }

  render() {
    const { left } = this.props;
    const [leftDesktop, leftMobile] = left;
    return (
      <div
        className="reel"
        style={{
          left: this.getLeftPadding(leftDesktop, leftMobile),
          backgroundPosition:
            this.getBackgroundPadding() + " " + this.state.pos + "px"
        }}
      >
        <div className="gradient" />
      </div>
    );
  }
}
