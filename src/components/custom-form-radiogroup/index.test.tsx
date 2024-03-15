import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomRadioGroup from './index';

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
];

test('CustomRadioGroup renders correctly', () => {
  render(<CustomRadioGroup options={options} value={1} />);
  
  options.forEach((option) => {
    const radioOption = screen.getByLabelText(option.name);
    expect(radioOption).toBeTruthy();
  });
  
  const selectedRadioOption = screen.getByLabelText('Option 1');
  expect(selectedRadioOption).toBeChecked;
});

test('CustomRadioGroup calls onChange when a radio option is selected', () => {
  const handleChange = jest.fn();
  
  render(<CustomRadioGroup options={options} value={1} onChange={handleChange} />);
  
  const radioOption = screen.getByLabelText('Option 2');
  fireEvent.click(radioOption);

  expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
});

