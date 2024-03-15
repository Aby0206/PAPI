import { screen, render } from '@testing-library/react';
import Index from './index';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MenuItem } from '@mui/material';

describe('Checking Cusotm Date Picker', () => {
	test('Render Select Component', async () => {
		const data = [
			{
				id: 1,
				category: 'Programming Language',
			},
			{
				id: 2,
				category: 'Framework/Library',
			},
			{
				id: 3,
				category: 'Data',
			},
		];
		render(
			<BrowserRouter>
				<Index data-testid="select-id">
					{data?.map((el) => (
						<MenuItem key={el.id} value={el.id}>
							{el.category}
						</MenuItem>
					))}
				</Index>
			</BrowserRouter>

		);
		const component = screen.getByTestId('select-id');
		expect(component).toBeInTheDocument();
	});
});