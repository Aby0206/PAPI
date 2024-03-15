import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomSwitch from './index';

test('CustomSwitch renders correctly with a label', () => {
  render(<CustomSwitch labelContent="Switch Label" />);
  
  const label = screen.getByText('Switch Label');
  expect(label).toBeTruthy();
  
  const switchComponent = screen.getByTestId('switch');
  expect(switchComponent).toBeTruthy();
});

test('CustomSwitch handles onChange event', () => {
  const handleChange = jest.fn();
  
  render(<CustomSwitch labelContent="Switch Label" onChange={handleChange} />);
  
  const switchComponent = screen.getByTestId('switch');
  fireEvent.click(switchComponent);
  
});
