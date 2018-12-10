export const START_SPINNING = "START_SPINNING";
export const STOP_SPINNING = "STOP_SPINNING";
export const SPINNING = "SPINNING";

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
