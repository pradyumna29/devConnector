import axios from "axios";
import * as ActionTypes from "./types";

//Get current profile

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      // If the profile is not found then we want to return an empty profile which we will then change
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: {},
      })
    );
};

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// profile loading

export const setProfileLoading = () => {
  return {
    type: ActionTypes.PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: ActionTypes.CLEAR_CURRENT_PROFILE,
  };
};

// Delete profile
export const deleteProfile = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: ActionTypes.SET_CURRENT_PROFILE,
          payload: {},
        })
      )
      .catch(err =>
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payoad: err.response.data,
        })
      );
  }
};

export const deleteUser = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!!")) {
    axios
      .delete("/api/users")
      .then(res =>
        dispatch({
          type: ActionTypes.SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch(err =>
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payoad: err.response.data,
        })
      );
  }
};
