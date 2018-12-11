// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { startSpinning } from "../actions";
import { Reel, PayTable, DebugArea } from "../components";
import {
  STOP_SPINNING,
  CHERRY,
  SEVEN,
  BAR3X,
  BAR2X,
  BAR,
  TOP,
  MIDDLE,
  BOTTOM,
  WINNING_CHERRY_TOP,
  WINNING_CHERRY_MIDDLE,
  WINNING_CHERRY_BOTTOM,
  WINNING_SEVEN_SYMBOLS_ON_LINE,
  WINNING_SEVEN_CHERRY_ON_LINE,
  WINNING_ANY_COMBINATION_BAR_ON_LINE,
  WINNING_BAR3X,
  WINNING_BAR2X,
  WINNING_BAR,
  RANDOM,
  WINNING_PAY_TABLE_CHERRYS_ON_TOP,
  WINNING_PAY_TABLE_CHERRYS_ON_MIDDLE,
  WINNING_PAY_TABLE_CHERRYS_ON_BOTTOM,
  WINNING_PAY_TABLE_SEVENS_ANY_LINE,
  WINNING_PAY_TABLE_CHERRY_AND_SEVEN,
  WINNING_PAY_TABLE_3XBAR_LINE,
  WINNING_PAY_TABLE_2XBAR_LINE,
  WINNING_PAY_TABLE_BAR_LINE,
  WINNING_PAY_TABLE_COMBINAION_BAR_LINE,
  WINNING_SOUND,
  SPINNING_SOUND,
  START_SPINNING
} from "../constants";
import "./SlotMachine.css";
import CoinImage from "./coin.jpg";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  gridPadding: {
    padding: theme.spacing.unit * 2
  },
  arcadeButton: {
    borderRadius: 100,
    height: 100,
    width: 100,
    margin: "auto",
    backgroundColor: "#1a9007"
  },
  insertButton: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundImage: `url(${CoinImage})`,
    backgroundSize: "100% auto",
    color: "#000"
  }
});

class SlotMachine extends Component {
  constructor(props) {
    super(props);
    // Lines hold the items after a run
    // Winning lines hold the lines that have a winning combination
    this.state = {
      lines: { TOP: [], MIDDLE: [], BOTTOM: [] },
      winningLines: [],
      balance: 1,
      mode: RANDOM,
      symbolReel1: BAR,
      symbolReel2: BAR,
      symbolReel3: BAR,
      landingPositionReel1: TOP,
      landingPositionReel2: TOP,
      landingPositionReel3: TOP
    };
  }

  /**
   * Returns an array with all the winning rules
   * If the rules is false then it didn't match
   * Otherwise it will return an array with the winning line
   * the payout and last the name of the rule
   *
   * @returns
   * @memberof SlotMachine
   */
  getWinningCombinations() {

    // Returns true if the line contains itemName
    const lookForElement = (line, itemName) => {
      return this.state.lines[line].includes(itemName);
    };

    // Returns true if the line hold the same itemName
    const lookForThreeElements = (line, itemName) => {
      for (const element of this.state.lines[line]) {
        if (element !== itemName) {
          return false;
        }
      }
      return true;
    };

    const cherrySymbolsOnLine = line => {
      if (!lookForThreeElements(line, CHERRY)) {
        return false;
      }
      return [
        line,
        line === TOP
          ? WINNING_CHERRY_TOP
          : line === MIDDLE
          ? WINNING_CHERRY_MIDDLE
          : WINNING_CHERRY_BOTTOM
      ];
    };

    const sevenSymbolsOnLine = line => {
      if (!lookForThreeElements(line, SEVEN)) {
        return false;
      }
      return [line, WINNING_SEVEN_SYMBOLS_ON_LINE];
    };

    const anyCombinationOfCherryAndSeven = line => {
      const hasCherry = lookForElement(line, CHERRY);
      const hasSeven = lookForElement(line, SEVEN);

      if (hasCherry && hasSeven) {
        return [line, WINNING_SEVEN_CHERRY_ON_LINE];
      }
      return false;
    };

    const threeElements = (line, itemName, payout) => {
      if (!lookForThreeElements(line, itemName)) {
        return false;
      }
      return [line, payout];
    };

    const anyCombinationOfBar = line => {
      const barArray = [BAR3X, BAR2X, BAR];
      if (!barArray.includes(this.state.lines[line][0])) {
        return false;
      }
      if (!barArray.includes(this.state.lines[line][1])) {
        return false;
      }
      if (!barArray.includes(this.state.lines[line][2])) {
        return false;
      }

      return [line, WINNING_ANY_COMBINATION_BAR_ON_LINE];
    };

    // Adds the name of the rule at the end
    const addWinningLine = (result, winningLine) => {
      return result ? [...result, winningLine] : false;
    };

    return [
      addWinningLine(
        cherrySymbolsOnLine(TOP),
        WINNING_PAY_TABLE_CHERRYS_ON_TOP
      ),
      addWinningLine(
        cherrySymbolsOnLine(MIDDLE),
        WINNING_PAY_TABLE_CHERRYS_ON_MIDDLE
      ),
      addWinningLine(
        cherrySymbolsOnLine(BOTTOM),
        WINNING_PAY_TABLE_CHERRYS_ON_BOTTOM
      ),
      addWinningLine(
        sevenSymbolsOnLine(TOP),
        WINNING_PAY_TABLE_SEVENS_ANY_LINE
      ),
      addWinningLine(
        sevenSymbolsOnLine(MIDDLE),
        WINNING_PAY_TABLE_SEVENS_ANY_LINE
      ),
      addWinningLine(
        sevenSymbolsOnLine(BOTTOM),
        WINNING_PAY_TABLE_SEVENS_ANY_LINE
      ),
      addWinningLine(
        anyCombinationOfCherryAndSeven(TOP),
        WINNING_PAY_TABLE_CHERRY_AND_SEVEN
      ),
      addWinningLine(
        anyCombinationOfCherryAndSeven(MIDDLE),
        WINNING_PAY_TABLE_CHERRY_AND_SEVEN
      ),
      addWinningLine(
        anyCombinationOfCherryAndSeven(BOTTOM),
        WINNING_PAY_TABLE_CHERRY_AND_SEVEN
      ),
      addWinningLine(
        threeElements(TOP, BAR3X, WINNING_BAR3X),
        WINNING_PAY_TABLE_3XBAR_LINE
      ),
      addWinningLine(
        threeElements(MIDDLE, BAR3X, WINNING_BAR3X),
        WINNING_PAY_TABLE_3XBAR_LINE
      ),
      addWinningLine(
        threeElements(BOTTOM, BAR3X, WINNING_BAR3X),
        WINNING_PAY_TABLE_3XBAR_LINE
      ),
      addWinningLine(
        threeElements(TOP, BAR2X, WINNING_BAR2X),
        WINNING_PAY_TABLE_2XBAR_LINE
      ),
      addWinningLine(
        threeElements(MIDDLE, BAR2X, WINNING_BAR2X),
        WINNING_PAY_TABLE_2XBAR_LINE
      ),
      addWinningLine(
        threeElements(BOTTOM, BAR2X, WINNING_BAR2X),
        WINNING_PAY_TABLE_2XBAR_LINE
      ),
      addWinningLine(
        threeElements(TOP, BAR, WINNING_BAR),
        WINNING_PAY_TABLE_BAR_LINE
      ),
      addWinningLine(
        threeElements(MIDDLE, BAR, WINNING_BAR),
        WINNING_PAY_TABLE_BAR_LINE
      ),
      addWinningLine(
        threeElements(BOTTOM, BAR, WINNING_BAR),
        WINNING_PAY_TABLE_BAR_LINE
      ),
      addWinningLine(
        anyCombinationOfBar(TOP),
        WINNING_PAY_TABLE_COMBINAION_BAR_LINE
      ),
      addWinningLine(
        anyCombinationOfBar(MIDDLE),
        WINNING_PAY_TABLE_COMBINAION_BAR_LINE
      ),
      addWinningLine(
        anyCombinationOfBar(BOTTOM),
        WINNING_PAY_TABLE_COMBINAION_BAR_LINE
      )
    ];
  }

  onReelFinish(reel, top, middle, bottom) {
    this.setState({
      ...this.state,
      lines: {
        TOP: [...this.state.lines.TOP, top],
        MIDDLE: [...this.state.lines.MIDDLE, middle],
        BOTTOM: [...this.state.lines.BOTTOM, bottom]
      },
      winningLines: []
    });

    if (reel === 3) {
      let currentBalance = this.state.balance;
      const winningLines = [];
      // Run the rules and get the winning combinations
      const winningCombinations = this.getWinningCombinations().filter(
        w => w instanceof Array
      );
      for (const winningCombination of winningCombinations) {
        currentBalance += winningCombination[1];
        winningLines.push(winningCombination);
      }
      this.setState({
        ...this.state,
        balance: currentBalance,
        winningLines,
        lines: { TOP: [], MIDDLE: [], BOTTOM: [] }
      });
    }
  }

  handleBalanceChange(event) {
    if (event.target.value === "") {
      this.setState({ balance: "" });
      return;
    }
    const value = parseInt(event.target.value);
    if (value >= 0 && value <= 5000) {
      this.setState({ balance: value });
      return;
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onStartSpinning() {
    const { startSpinning } = this.props;
    let balance = this.state.balance - 1;
    this.setState({ ...this.state, balance, winningLines: [] });
    startSpinning(3500);
  }

  onInsertCoin() {
    let currentBalance = this.state.balance + 1;
    this.setState({
      ...this.state,
      balance: currentBalance
    });
  }

  isWinningPayTableLine(name) {
    const any = this.state.winningLines.find(wl => wl[2] === name);

    return any ? true : false;
  }

  render() {
    const { status, classes } = this.props;
    return (
      <div className="slot-machine ">
        <h1 className="title">Derivco Estonia Test Slot Machine</h1>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={7}>
            <Grid item xs={12}>
              <div className="reel-container">
                <Reel
                  status={status}
                  delay={2000}
                  left={[15, 5]}
                  mode={this.state.mode}
                  position={this.state.landingPositionReel1}
                  symbol={this.state.symbolReel1}
                  onFinish={(top, middle, bottom) =>
                    this.onReelFinish(1, top, middle, bottom)
                  }
                  key={0}
                />
                <Reel
                  status={status}
                  delay={2500}
                  left={[45, 12]}
                  mode={this.state.mode}
                  position={this.state.landingPositionReel2}
                  symbol={this.state.symbolReel2}
                  onFinish={(top, middle, bottom) =>
                    this.onReelFinish(2, top, middle, bottom)
                  }
                  key={1}
                />
                <Reel
                  status={status}
                  delay={3000}
                  left={[75, 21]}
                  mode={this.state.mode}
                  position={this.state.landingPositionReel3}
                  symbol={this.state.symbolReel3}
                  onFinish={(top, middle, bottom) =>
                    this.onReelFinish(3, top, middle, bottom)
                  }
                  key={2}
                />
              </div>
              {this.state.winningLines.map(wl => (
                <div
                  className={"blink_me red-line red-line-" + wl[0]}
                  key={wl}
                />
              ))}

              {this.state.winningLines.length > 0 && (
                <audio autoPlay="autoplay" className="player" preload="false">
                  <source src={WINNING_SOUND} />
                </audio>
              )}

              {status === START_SPINNING && (
                <audio autoPlay="autoplay" className="player" preload="false">
                  <source src={SPINNING_SOUND} />
                </audio>
              )}
            </Grid>

            <Grid item xs={12}>
              <DebugArea
                classes={classes}
                mode={this.state.mode}
                parentState={this.state}
                handleChange={this.handleChange.bind(this)}
                enabled={status !== START_SPINNING}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item xs container>
                  <Grid item xs={4}>
                    <Button
                      className={classes.arcadeButton}
                      variant="contained"
                      color="primary"
                      onClick={this.onStartSpinning.bind(this)}
                      disabled={
                        status !== STOP_SPINNING || this.state.balance < 1
                          ? true
                          : false
                      }
                    >
                      SPIN
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      className={classes.insertButton}
                      variant="contained"
                      color="primary"
                      onClick={this.onInsertCoin.bind(this)}
                      disabled={status !== STOP_SPINNING ? true : false}
                    >
                      INSERT COIN
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="standard-number"
                      label="Balance $"
                      value={this.state.balance}
                      onChange={this.handleBalanceChange.bind(this)}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      disabled={status !== STOP_SPINNING ? true : false}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {this.state.balance < 1 && status === STOP_SPINNING && (
                      <h3 className="blink_me">Insert More Coins!</h3>
                    )}
                  </Grid>
                  <PayTable
                    isWinningPayTableLine={this.isWinningPayTableLine.bind(
                      this
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SlotMachine)
);
