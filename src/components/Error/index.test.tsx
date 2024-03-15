import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ErrorView from './index';

test('ErrorView renders correctly and handles props', () => {
  const mockRetry = jest.fn();
  const error = {
    code: 500,
    detail: 'Internal Server Error',
  };

  render(<ErrorView retry={mockRetry} error={error} />);

  expect(screen.getByTestId('Something-went-wrong')).toBeTruthy();
  expect(screen.getByText('500 - Internal Server Error')).toBeTruthy();

  fireEvent.click(screen.getByTestId('retry-again'));

  expect(mockRetry).toHaveBeenCalled();
});


