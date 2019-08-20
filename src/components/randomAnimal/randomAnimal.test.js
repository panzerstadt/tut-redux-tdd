import React from "react";
import RandomAnimal from "./randomAnimal";
import { render, fireEvent } from "@testing-library/react";

describe("randomAnimal component", () => {
  it("renders a placeholder initially", () => {
    // Arrange

    // Act
    const { getByTestId, queryByTestId } = render(<RandomAnimal />);

    // Assert
    const placeholder = getByTestId("animal-placeholder");
    const img = queryByTestId("animal-img");

    expect(placeholder).toBeDefined();
    expect(img).toBeNull();
  });

  it("should render actual dog image", () => {
    // Arrange

    // Act
    const { getByTestId, queryByTestId } = render(
      <RandomAnimal animalUrl="http://stub" />
    );

    // Assert
    const img = getByTestId("animal-img");
    const placeholder = queryByTestId("animal-placeholder");

    expect(img).toBeDefined();
    expect(img.src).toContain("http://stub");
    expect(placeholder).toBeNull();
  });

  it("should execute fetchDog", () => {
    // Arrange
    const fetchAnimal = jest.fn();

    // Act
    const { getByTestId } = render(<RandomAnimal fetchAnimal={fetchAnimal} />);

    // Assert
    const button = getByTestId("animal-button");

    fireEvent.click(button);
    expect(fetchAnimal).toHaveBeenCalledTimes(1);
  });
});
