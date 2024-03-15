import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import DeleteSkill from '../Delete-popup/index';
import '@testing-library/jest-dom';


describe('DeleteSkill component', () => {
  test('renders correctly', () => {
    render(
      <DeleteSkill
        open={true}
        onClose={() => {}}
        onDelete={() => {}}
        description="Some description"
        isLoading={false}
      />
    );
    const text = screen.getByTestId("delete_text")
    expect(text.textContent).toBe("Delete");
  });

test('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByAltText } = render(
      <DeleteSkill
        open={true}
        onClose={onCloseMock}
        onDelete={() => {}}
        description="Some description"
        isLoading={false}
      />
    );

    fireEvent.click(getByAltText('closeButton'));
    expect(onCloseMock).toHaveBeenCalled();
  });

test('renders correctly when image is loading', () => {
    const { getByAltText } = render(
      <DeleteSkill
        open={true}
        onClose={() => {}}
        onDelete={() => {}}
        description="Some description"
        isLoading={false}
      />
    );
  
    const image = getByAltText('Delete_icon');

    expect(image).toHaveAttribute('alt', 'Delete_icon');
  });

test('calls onDelete when delete button is clicked', async () => {
    const onDeleteMock = jest.fn();
    const { getByTestId } = render(
      <DeleteSkill
        open={true}
        onClose={() => {}}
        onDelete={onDeleteMock}
        description="Some description"
        isLoading={false}
      />
    );

    fireEvent.click(getByTestId('submit-button-id'));

    
    await waitFor(() => {
      expect(onDeleteMock).toHaveBeenCalled();
    });
  });

})

  
