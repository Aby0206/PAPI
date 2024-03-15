import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import DeleteView from "./DeleteView";

const mockHandleOptionChange = jest.fn();
const mockOnDelete = jest.fn();

const view = (open = true, isLoading = false) => {
  return render(
    <DeleteView
      open={open}
      onDelete={mockOnDelete}
      onClose={() => {}}
      isLoading={isLoading}
      handleOptionChange={mockHandleOptionChange}
    />
  );
};

describe("DeleteView Component", () => {
  test("renders without errors when open is true", () => {
    view(true);
    expect(screen.getByText("What do you want to delete? Please select one.")).toBeTruthy();
  });


  test("calls handleOptionChange when checkbox is clicked", () => {
    view(true);
    const checkbox = screen.getByText("Skill");
    fireEvent.click(checkbox);
    expect(mockHandleOptionChange).toHaveBeenCalledWith("skill");
  });

  test("calls onDelete when Delete button is clicked", () => {
    view(true, false);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
  });

  

  test("calls onClose when Cancel button is clicked", () => {
    const mockOnClose = jest.fn();

    const { getByText } = render(
      <DeleteView
        open={true}
        onDelete={() => {}}
        onClose={mockOnClose}
        isLoading={false}
        handleOptionChange={() => {}}
      />
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
