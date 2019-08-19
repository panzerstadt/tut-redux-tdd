import { combineReducers } from "redux";
import dog from "./dog/dogReducer";
import animal from "./animal/animalReducer";

export default combineReducers({
  dog,
  animal
});
