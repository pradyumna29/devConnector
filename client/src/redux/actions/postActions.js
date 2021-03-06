import axios from 'axios';
import * as ActionTypes from './types';

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
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

//addComment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: ActionTypes.GET_POST,
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

//delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: ActionTypes.GET_POST,
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
    .get('/api/posts')
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

//Get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading);
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: ActionTypes.GET_POST,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_POST,
        payload: null,
      })
    );
};

// Delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: id,
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set loading state
export const setPostLoading = () => {
  return {
    type: ActionTypes.POST_LOADING,
  };
};

//clear errrors
export const clearErrors = () => {
  return {
    type: ActionTypes.CLEAR_ERRORS,
  };
};
