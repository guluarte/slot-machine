import { combineReducers } from "redux";
import { START_SPINNING, STOP_SPINNING, SPINNING } from "../constants";

const machineState = (state = { status: STOP_SPINNING }, action) => {
  switch (action.type) {
    case START_SPINNING: {
      return { ...state, status: START_SPINNING };
    }
    case SPINNING: {
      return { ...state, status: SPINNING };
    }
    case STOP_SPINNING: {
      return { ...state, status: STOP_SPINNING };
    }
    default:
      return state;
  }
};

export default combineReducers({
  machineState
});
