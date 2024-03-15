import React from 'react';
import { render,screen } from '@testing-library/react';
import ImageBadge from './index';

test('ImageBadge renders correctly with badgeContent', () => {
  const badgeContent = 42;
  render(
    <ImageBadge badgeContent={badgeContent}>
      <div data-testid="child">Child Content</div>
    </ImageBadge>
  );
  const badge = screen.getByTestId('badge-id');
		expect(badge).toBeTruthy();

});

