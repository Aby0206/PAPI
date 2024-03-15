import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SubmitButton from './index';

test('SubmitButton renders correctly and handles props', () => {
	const mockOnClick = jest.fn();

	const { getByTestId, getByText } = render(
		<SubmitButton
			type="submit"
			title="Submit"
			disabled={false}
			showLoader={true}
			testId="submitButton"
			onClick={mockOnClick}
		/>
	);
	expect(getByTestId('submitButton')).toBeTruthy();
	expect(getByText('Submit')).toBeTruthy();

	fireEvent.click(getByTestId('submitButton'));

	expect(mockOnClick).toHaveBeenCalled();
});

test('SubmitButton displays loader when disabled', () => {
	const { getByTestId } = render(
		<SubmitButton
			title="Submit"
			disabled={true}
			showLoader={true}
			testId="submitButton"
		/>
	);

	const loader = getByTestId('submitButton').querySelector('svg');
	expect(loader).toBeTruthy();
});

test('SubmitButton does not display loader when not disabled', () => {
	const { getByTestId } = render(
		<SubmitButton
			title="Submit"
			disabled={false}
			showLoader={true}
			testId="submitButton"
		/>
	);
	const loader = getByTestId('submitButton').querySelector('svg');
	expect(loader).toBeNull();
});
