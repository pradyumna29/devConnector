import * as ActionTypes from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
