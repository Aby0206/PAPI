import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UpdateModal from './UpdateModal';
import { useForm, FormProvider } from 'react-hook-form';

const Wrapper: React.FC<{ children: any }> = ({ children }) => {
	const methods = useForm();
	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('UpdateModal Component', () => {
	const options = [
		{ id: 1, category: 'Category 1' },
		{ id: 2, category: 'Category 2' },
	];

	let testData={
		id: 1,
		name: 'Sample Skill',
		category: {
			id: 2,
			category: 'Sample Category',
			status: true,
		},
		total_employee: 10,
		status: true,
	}

	test('UI rendered correctly', () => {
		render(
			<Wrapper>
				<UpdateModal
					editMode={false}
					skillData={testData}
					options={options}
					handleOptionChange={(option) => {}}
				/>
			</Wrapper>
		);

		expect(screen.getByText('Please select Skill/Skill Category')).toBeTruthy();
	});

		test('renders the component with Skill selected', () => {

			render(
				<Wrapper>
					<UpdateModal
						editMode={false}
						skillData={testData}
						options={options}
						handleOptionChange={(option) => {}}
					/>
				</Wrapper>
			);

			expect(screen.getByText('Please select Skill/Skill Category')).toBeTruthy();
			expect(screen.getByLabelText('Skill')).toBeTruthy();
		});

	  test('renders the component in edit mode with Skill selected', () => {

			render(
				<Wrapper>
					<UpdateModal
						editMode={true}
						skillData={testData}
						options={options}
						handleOptionChange={(option) => {}}
					/>
				</Wrapper>
			);

			expect(screen.getByText('Please select Skill/Skill Category')).toBeTruthy();
			expect(screen.getByLabelText('Skill')).toBeTruthy();
		});

		test('renders the component with Skill Category selected', () => {
			render(
				<Wrapper>
					<UpdateModal editMode={false} options={[]}  />
				</Wrapper>
			);

			const skillCategoryRadio = screen.getByLabelText('Skill Category');
			fireEvent.click(skillCategoryRadio);
			expect(skillCategoryRadio).toHaveProperty('checked', true);
		});

	  test('renders the component in edit mode with Skill Category selected', () => {
			render(
				<Wrapper>
					<UpdateModal editMode={true} options={[]} />
				</Wrapper>
			);

			const skillCategoryRadio = screen.getByLabelText('Skill Category');
			fireEvent.click(skillCategoryRadio);
			expect(skillCategoryRadio).toHaveProperty('checked', true);
		});

		test('renders the component in edit mode with status switch', () => {
			render(
	      <Wrapper>
	    <UpdateModal editMode={true} options={[]} />
	    </Wrapper>
	    );

			const statusSwitch = screen.getByText('Status');
			expect(statusSwitch).toBeTruthy();
		});
});
