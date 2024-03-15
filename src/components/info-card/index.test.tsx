import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCard from './index';

const info = {
  name: {
    displayName: 'Name',
    type: 'text',
  },
  website: {
    displayName: 'Website',
    type: 'link',
  },
};

const data = {
  name: 'John Doe',
  website: 'https://example.com',
};

test('InfoCard renders correctly', () => {
  render(<InfoCard title="User Info" info={info} data={data} />);

  expect(screen.getByText('User Info')).toBeTruthy();
  expect(screen.getByText('Name')).toBeTruthy();
  expect(screen.getByText('Website')).toBeTruthy();
  expect(screen.getByText('John Doe')).toBeTruthy();
  
});

