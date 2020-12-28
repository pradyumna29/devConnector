import axios from "axios";
import * as ActionTypes from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ActionTypes.ADD_POST,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading);
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: ActionTypes.GET_POSTS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_POSTS,
        payload: null,
      })
    );
};

// set loading state
export const setPostLoading = () => {
  return {
    type: ActionTypes.POST_LOADING,
  };
};
