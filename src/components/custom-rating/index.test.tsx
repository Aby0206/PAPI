import React from 'react';
import { render } from '@testing-library/react';
import CustomRating from './index';

test('CustomRating renders without errors', () => {
  render(<CustomRating />);
});