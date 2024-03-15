import { screen, render, fireEvent } from '@testing-library/react';
import Index from './index';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Checking Cusotm Date Picker', () => {
	test('Render Date Component', async () => {
		render(
			<BrowserRouter>
				<Index type="text" data-testid="input-component" />
			</BrowserRouter>
		);
		const input = screen.getByTestId('input-component');
		expect(input).toBeInTheDocument;
	});
	test('Render Date Component', async () => {
		render(
			<BrowserRouter>
				<Index type="text" labelTestid="label-component" label="Form Testing" />
			</BrowserRouter>
		);
		const label = screen.getByTestId('label-component');
		expect(label).toBeInTheDocument;
		expect(label).toHaveTextContent('Form Testing');
	});
	test('Render Date Component', async () => {
		render(
			<BrowserRouter>
				<Index
					type="text"
					errorTest="input-component"
					placeholder="input-component"
				/>
			</BrowserRouter>
		);
		const input = await screen.getByPlaceholderText('input-component');
		fireEvent.change(input, {
			target: {
				value: 'sasadasdas',
			},
		});
		expect(input.textContent).toBe('');
	});
});