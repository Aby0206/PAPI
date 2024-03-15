import React from 'react';
import { render,screen ,fireEvent} from '@testing-library/react';
import EditProficiency from './index';
import { useForm, FormProvider } from 'react-hook-form';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../hooks/globalHelpers', () => {
	return {
	  useGlobalSnackbar: () => {
		return {
		  showSnackbar: jest.fn(),
		};
	  },
	};
  });


  const Wrapper: React.FC<{ children: any }> = ({ children }) => {
	const methods = useForm();
	return <FormProvider {...methods}>{children}</FormProvider>;
};
describe('EditProficiency Component', () => {
	let testData={
		id:1,
		rating: 5,
		description: 'Sample description'
	}

	test('UI Rendered correctly', () => {

		render(
			<Router>
			<Wrapper>
			<EditProficiency
				isOpen={true}
				onClose={() => {}}
				data={testData}
			/>
			</Wrapper>
			</Router>
		);
		const title = screen.getByTestId('title-id');
		const updateButton = screen.getByTestId('update-button-id');
		const cancelButton = screen.getByTestId('cancel-button-id');
		
		expect(title).toBeTruthy();
		expect(updateButton).toBeTruthy();
		expect(cancelButton).toBeTruthy();
	});

	test('Rendering description input ', async() => {
		render(
			<Router>
			<Wrapper>
			<EditProficiency
				isOpen={true}
				onClose={() => {}}
				data={testData}
			/>
			</Wrapper>
			</Router>
		);
		const descriptionInput = screen.getByTestId('input-id');
		fireEvent.change(descriptionInput, {
			target: { value: 'testing new description' },
		});

		expect(descriptionInput.textContent).toBe('testing new description');

	});
	test('handles "update" button click', () => {
		render(
			<Router>
			<Wrapper>
			<EditProficiency
				isOpen={true}
				onClose={() => {}}
				data={testData}
			/>
			</Wrapper>
			</Router>
		);

		const descriptionInput = screen.getByTestId('input-id');
		fireEvent.change(descriptionInput, {
			target: { value: 'New Description' },
		});

		const updateButton = screen.getByTestId('update-button-id');
		fireEvent.click(updateButton);

	});

	test('handles "cancel" button click', () => {
		render(
			<Router>
			<Wrapper>
			<EditProficiency
				isOpen={true}
				onClose={() => {}}
				data={testData}
			/>
			</Wrapper>
			</Router>
		);
		const cancelButton = screen.getByTestId('cancel-button-id');
		fireEvent.click(cancelButton);

	});
 })
