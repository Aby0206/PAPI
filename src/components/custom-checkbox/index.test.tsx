import { screen, render} from '@testing-library/react';
import Index from './index';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Checking Cusotm CheckBox', () => {
	test('Render Date Component', async () => {
		render(
			<BrowserRouter>
				<Index labelContent="Checking Testing" value={true} />
			</BrowserRouter>
		);
		const label = screen.getByText('Checking Testing');
		expect(label).toBeInTheDocument();

		const yesCheckbox = screen.getByTestId('checkbox-component-yes');
		expect(yesCheckbox).toBeInTheDocument();

		const noCheckbox = screen.getByTestId('checkbox-component-no');
		expect(noCheckbox).toBeInTheDocument();
	});
	test("h",()=>{
		
	})
});
