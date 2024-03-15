import React from 'react';
import { render} from '@testing-library/react';
import CustomDatePicker from './index';

test('CustomDatePicker renders correctly', () => {
  const mockOnChange = jest.fn();

  const { container } = render(<CustomDatePicker onChange={mockOnChange} />);
  expect(container).toBeTruthy();


});
