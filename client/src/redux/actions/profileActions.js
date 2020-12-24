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
