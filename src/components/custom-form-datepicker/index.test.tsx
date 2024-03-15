import { screen, render, fireEvent } from '@testing-library/react';
import Index from './index';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Checking Cusotm Date Picker', () => {
    let format='DD-MMMM-YYYY';
	test('Render Date Component', async () => {
		render(
			<BrowserRouter>
				<Index />
			</BrowserRouter>
		);
		const dateInput = screen.getByPlaceholderText(format);
		expect(dateInput).toBeInTheDocument;
	});
	test('Adding Date in Component', async () => {
		render(
			<BrowserRouter>
				<Index />
			</BrowserRouter>
		);
		const message = screen.getByPlaceholderText(format);
		fireEvent.change(message, {
			target: {
				value: '12-Aug-2000',
			},
		});
		expect(message).toHaveValue('12-Aug-2000');
	});
});