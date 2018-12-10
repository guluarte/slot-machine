// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { connect } from "react-redux";
import { startSpinning } from "../actions";
import { Reel } from "../components";
import "./App.css";

class SlotMachine extends Component {
  onReelFinish(reel, item1, item2, item3) {
  }
  render() {
    const { startSpinning, status } = this.props;
    return (
      <div>
        <div className="ReelContainer">
          <Reel
            status={status}
            delay={2000}
            intervalMs={50}
            onFinish={(item1, item2, item3) =>
              this.onReelFinish(1, item1, item2, item3)
            }
            key={0}
          />
          <Reel
            status={status}
            delay={2500}
            intervalMs={50}
            onFinish={(item1, item2, item3) =>
              this.onReelFinish(2, item1, item2, item3)
            }
            key={1}
          />
          <Reel
            status={status}
            delay={3000}
            intervalMs={50}
            onFinish={(item1, item2, item3) =>
              this.onReelFinish(2, item1, item2, item3)
            }
            key={2}
          />
        </div>
        <button onClick={() => startSpinning(2000)}>Start Spinning</button>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  const { machineState } = state;

  return {
    status: machineState.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startSpinning: (reel, ms) => {
      dispatch(startSpinning(reel, ms));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlotMachine);
