import React from 'react';
import { render, screen } from '@testing-library/react';
import TableView from './TableView';

jest.mock('../../hooks/globalHelpers', () => {
	return {
		useGlobalSnackbar: () => {
			return {
				showSnackbar: jest.fn(),
			};
		},
	};
});

let testData = [
	{
		id: 1,
		rating: 5,
		description: 'Test description 1',
	},
	{
		id: 2,
		rating: 4,
		description: 'Test description 2',
	},
	{
		id: 3,
		rating: 3,
		description: 'Test description 3',
	},
	{
		id: 2,
		rating: 2,
		description: 'Test description 4',
	},
	{
		id: 1,
		rating: 1,
		description: 'Test description 5',
	},
];

describe('<ProfiencyListing />', () => {
	it('should render table correctly', () => {
		render(<TableView data={testData} onItemClick={() => {}} />);

		const ratingHead = screen.getByText('Rating');
		const descriptionHead = screen.getByText('Description');
		expect(Boolean(ratingHead)).toBeTruthy();
		expect(Boolean(descriptionHead)).toBeTruthy();

		const rows = screen.getAllByRole('row');
		expect(Boolean(rows.length === 6)).toBeTruthy();
	});
});
