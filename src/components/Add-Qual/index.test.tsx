import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddQual from './index';
import { useForm, FormProvider } from 'react-hook-form';

const Wrapper: React.FC<{ children: any }> = ({ children }) => {
	const methods = useForm();
	return <FormProvider {...methods}>{children}</FormProvider>;
};

test('AddQual component render correctly', async () => {
	render(
		<Wrapper>
			<AddQual index={1} onDelete={() => {}} />
		</Wrapper>
	);
	await screen.findByPlaceholderText('Educational Institution');
	expect(
		screen.getByPlaceholderText('Educational Institution')
	).toBeInTheDocument();
});

test('AddQual component has every input feilds', async () => {
	render(
		<Wrapper>
			<AddQual index={1} onDelete={() => {}} />
		</Wrapper>
	);
	await screen.findByPlaceholderText('Educational Institution');
	expect(
		screen.getByPlaceholderText('Educational Institution')
	).toBeInTheDocument();

	expect(screen.getByPlaceholderText('Degree/Diploma')).toBeInTheDocument();
	expect(screen.getByPlaceholderText('Field')).toBeInTheDocument();
	expect(screen.getByPlaceholderText('YYYY')).toBeInTheDocument();
});

test('AddQual component has delete button', async () => {
	render(
		<Wrapper>
			<AddQual index={1} onDelete={() => {}} />
		</Wrapper>
	);
	await screen.findByPlaceholderText('Educational Institution');
	expect(screen.getByAltText('delete-icon')).toBeInTheDocument();
});
