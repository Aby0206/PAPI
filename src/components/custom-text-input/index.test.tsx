import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTextInput from './index';

test('CustomTextInput renders correctly with a label', () => {
  render(
    <CustomTextInput
      label="Text Input Label"
      placeholder="Enter text here"
    />
  );

  const label = screen.getByText('Text Input Label');
  expect(label).toBeTruthy();

  const placeholder = screen.getByPlaceholderText('Enter text here');
  expect(placeholder).toBeTruthy();
});

test('CustomTextInput displays error message and character count', () => {
  render(
    <CustomTextInput
      label="Text Input Label"
      errorMessage="This is an error message."
      value="Sample text"
    />
  );

  const errorMessage = screen.getByTestId('error-message');
  expect(errorMessage).toBeTruthy();

  const characterCount = screen.getByTestId('count');
  expect(characterCount).toBeTruthy();
});
