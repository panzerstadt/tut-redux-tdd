// integration, with real redux
// integration is about testing use cases

// Although unit tests are a great tool, they don’t presume that we properly
// connect our components, or that a reducer is subscribed to the right action.
// It’s a common place for bugs, and that’s why we need integration tests.
import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import setupStore from "../../setupStore";

import App from "./dogApp";

describe("dogApp integration", () => {
  it("should render a placeholder when no dog/animal image is fetched", () => {
    // Arrange
    const store = setupStore();

    // Act
    const { getByTestId, queryByTestId, debug } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // debug();

    // Assert
    const placeholderAnimal = getByTestId("animal-placeholder");
    const placeholderDog = getByTestId("dog-placeholder");

    const imgAnimal = queryByTestId("animal-img");
    const imgDog = queryByTestId("dog-img");

    expect(placeholderAnimal).toBeDefined();
    expect(placeholderDog).toBeDefined();
    expect(imgAnimal).toBeNull(); // should not be loaded because no search
    expect(imgDog).toBeNull();
  });

  it("should fetch and render a dog", async () => {
    // Arrange
    const store = setupStore();
    const httpMock = new MockAdapter(axios);
    httpMock.onGet("https://dog.ceo/api/breeds/image/random").reply(200, {
      status: "success",
      message: "https://dog-stub"
    });

    // Act
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Assert
    const btn = getByTestId("dog-button");
    fireEvent.click(btn);

    const img = await waitForElement(() => getByTestId("dog-img"));
    const placeholder = queryByTestId("dog-placeholder");

    expect(img).toBeDefined();
    expect(img.src).toContain("https://dog-stub");
    expect(placeholder).toBeNull();
  });

  it("should fetch and render a cat", async () => {
    // Arrange
    const store = setupStore();
    const httpMock = new MockAdapter(axios);
    httpMock.onGet("https://aws.random.cat/meow").reply(200, {
      message: "success",
      file: "https://cat-stub"
    });

    // Act
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Assert
    const btn = getByTestId("animal-button");
    fireEvent.click(btn);

    const img = await waitForElement(() => getByTestId("animal-img"));
    const placeholder = queryByTestId("animal-placeholder");

    expect(img).toBeDefined();
    expect(img.src).toContain("https://cat-stub");
    expect(placeholder).toBeNull();
  });
});
