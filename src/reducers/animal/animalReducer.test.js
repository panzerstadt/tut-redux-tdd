import { FETCH_FOX_SUCCESS } from "../../constants/actionTypes";

import animalReducer from "./animalReducer";

describe("animal component", () => {
  it("loads initial state", () => {
    expect(animalReducer(undefined, {})).toEqual({ url: "" });
  });

  it("sets up fetched animal url", () => {
    // Arrange
    const prevState = { url: "" };
    // we just assume that fetching is a success, because we
    // have tested the fetchDog() component
    // therefore this deals with the moment FETCH_DOG_SUCCESS
    // is returned from redux and the next action is dealt
    // by animalReducer
    const action = {
      type: FETCH_FOX_SUCCESS,
      payload: { url: "https://some-cat-stub.jpg" }
    };

    // Act
    const nextState = animalReducer(prevState, action);

    // Assert
    expect(nextState).toEqual({ url: "https://some-cat-stub.jpg" });
  });
});
