import { FETCH_FOX_SUCCESS } from "../../constants/actionTypes";

const initialState = {
  url: ""
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOX_SUCCESS:
      return { ...state, url: action.payload.url };
    default:
      return state;
  }
};

export default animalReducer;
