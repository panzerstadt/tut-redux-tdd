import configMockStore from "redux-mock-store";
import fetchAnimal from "./fetchAnimal";
import axios from "axios";
import {
  FETCH_FOX_SUCCESS,
  FETCH_FOX_REQUEST
} from "../../constants/actionTypes";

import MockAdapter from "axios-mock-adapter";

describe("fetch cat component", () => {
  let store;
  let httpMock;
  beforeEach(() => {
    // mock the redux store
    const mockStore = configMockStore();
    store = mockStore({});
    // mock the axios get
    httpMock = new MockAdapter(axios);
  });
  it("fetches a cat", async () => {
    // Arrange
    httpMock.onGet("https://aws.random.cat/meow").reply(200, {
      status: "success",
      file: "https://some-random-cat-stub.jpg"
    });

    // Act
    // run fetchAnimal together with a dispatcher
    // meaning connect fetch function with storage function here
    const getAnimal = fetchAnimal();
    await getAnimal(store.dispatch);

    // Assert
    const currentActions = store.getActions();
    expect(currentActions).toEqual([
      { type: FETCH_FOX_REQUEST },
      {
        type: FETCH_FOX_SUCCESS,
        payload: { url: "https://some-random-cat-stub.jpg" }
      }
    ]);
  });
});
