import { START_SPINNING, STOP_SPINNING, SPINNING } from "../constants";

export const stopSpinning = () => ({
  type: STOP_SPINNING
});

export const spinning = () => ({
  type: SPINNING
});

export const startSpinning = (totalMs) => dispatch => {
    dispatch({
    type: START_SPINNING
  });
  setTimeout(() => {
    dispatch(stopSpinning());
  }, totalMs);
};
