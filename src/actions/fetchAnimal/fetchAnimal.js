import axios from "axios";

import {
  FETCH_FOX_FAILURE,
  FETCH_FOX_REQUEST,
  FETCH_FOX_SUCCESS
} from "../../constants/actionTypes";

export const fetchAnimalRequest = () => {
  return {
    type: FETCH_FOX_REQUEST
  };
};

export const fetchAnimalSuccess = body => {
  return {
    type: FETCH_FOX_SUCCESS,
    payload: {
      url: body.message
    }
  };
};

export const fetchAnimalFailure = err => {
  return {
    type: FETCH_FOX_FAILURE,
    err
  };
};

const fetchAnimal = () => {
  // returns a thunk
  return dispatch => {
    dispatch(fetchAnimalRequest()); // start
    return axios
      .get("http://shibe.online/api/birds?count=1&httpsUrls=true")
      .then(response => response.data)
      .then(data => {
        console.log(data);
        dispatch(fetchAnimalSuccess(data));
      })
      .catch(err => dispatch(fetchAnimalFailure(err)));
  };
};

const fetchCat = () => {
  // returns a thunk
  return dispatch => {
    dispatch(fetchAnimalRequest()); // start
    console.log("fetching a cat!");
    return axios
      .get("https://aws.random.cat/meow")
      .then(response => response.data)
      .then(data => {
        dispatch(fetchAnimalSuccess({ message: data.file }));
      })
      .catch(err => dispatch(fetchAnimalFailure(err)));
  };
};

export default fetchCat;
