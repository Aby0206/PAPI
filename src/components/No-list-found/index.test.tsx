import React from 'react';
import { render, screen } from '@testing-library/react';
import NoListFound from './index';

test('NoListFound component renders correctly', () => {
  render(<NoListFound />);
  
  const primaryText = screen.getByAltText('NoResultFound');
  expect(primaryText).toBeTruthy();

});