import React from "react";
import { DogApp } from "./dogApp";
import { render } from "@testing-library/react";
import RandomDog from "../randomDog/randomDog";

describe("App component", () => {
  it("renders RandomDog component", () => {
    // Arrange

    // Act
    const { getByTestId } = render(<DogApp />);

    // Assert
    const dog = getByTestId("randomdog-container");
    const animal = getByTestId("randomanimal-container");

    // id is written in randomdog component, not the dogapp component
    // to this tests for the REAL component, not a jsx element
    expect(dog).toBeDefined();
    expect(animal).toBeDefined();
  });
});
