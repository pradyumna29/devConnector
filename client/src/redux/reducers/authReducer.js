import * as ActionTypes from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TEST_DISPATCH:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
