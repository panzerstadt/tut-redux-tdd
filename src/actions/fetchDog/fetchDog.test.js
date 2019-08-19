import fetchDog from "./fetchDog";
import axios from "axios";
import configureMockStore from "redux-mock-store";

import {
  FETCH_DOG_REQUEST,
  FETCH_DOG_SUCCESS
} from "../../constants/actionTypes";

// mock axios to return fake get requests
jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        status: "success",
        message: "https://dog.ceo/api/img/someDog.jpg"
      }
    })
  )
}));

describe("fetchDog component", () => {
  let store;
  beforeEach(() => {
    // mock redux to return fake dispatches
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("fetches a dog", async () => {
    // Arrange

    // Act
    const getDog = fetchDog();
    await getDog(store.dispatch);

    // Assert
    // expect two actions to have happened
    expect(store.getActions()).toEqual([
      { type: FETCH_DOG_REQUEST },
      {
        payload: { url: "https://dog.ceo/api/img/someDog.jpg" },
        type: FETCH_DOG_SUCCESS
      }
    ]);
  });
});
