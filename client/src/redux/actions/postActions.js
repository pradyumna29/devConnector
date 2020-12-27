import axios from "axios";
import * as ActionTypes from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("api/posts", postData)
    .then(res => dispatch => ({
      type: ActionTypes.ADD_POST,
      payload: res.data,
    }))
    .catch(err => dispatch => ({
      type: ActionTypes.GET_ERRORS,
      payload: err.response.data,
    }));
};
