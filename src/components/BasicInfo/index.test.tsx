import { screen, render } from '@testing-library/react';
import Index from './index';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Wrapper: React.FC<{ children: any }> = ({ children }) => {
	const methods = useForm();
	return <FormProvider {...methods}>{children}</FormProvider>;
};

test('Basic Info rendered', async () => {
	render(
		<Wrapper>
			<Index />
		</Wrapper>
	);
	const value = await screen.getByTestId('Basic');
	expect(value).toBeInTheDocument;
});
