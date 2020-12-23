import * as ActionTypes from "./types";
// Register test
export const registerUser = userData => {
  return {
    type: ActionTypes.TEST_DISPATCH,
    payload: userData,
  };
};
