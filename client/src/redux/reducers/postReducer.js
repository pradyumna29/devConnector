import * as ActionTypes from "../actions/types";
const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ActionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
