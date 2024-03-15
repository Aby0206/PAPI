import React, { FC } from 'react';
import { StyledSkills, StyledButton } from '../Add-skills/styledComponents';
import CustomFormInput from '../custom-forminput';
import DeleteIcon from '../../assets/icons/material-symbols_delete-outline.svg';
import FormController from '../FormController';
import { VoidFunction } from '../../types';
import dayjs from 'dayjs';

interface AddSkillsProps {
	onDelete?: VoidFunction;
	index: number;
}

const AddQual: FC<AddSkillsProps> = ({
	onDelete,
	index,
}) => {
	const handleDelete = () => {
		if (onDelete) {
			onDelete();
		}
	};
	
	return (
		<StyledSkills className={index !== 0 ? 'hide-labels' : ''}>
			<FormController
				name={`qualification[${index}].school`}
				validation={{
					required: 'This is required field.',
					maxLength: {
						value: 100,
						message: 'This input exceed maxLength.',
					},
				}}
			>
				<CustomFormInput
					label="Educational Institution"
					placeholder="Educational Institution"
					required
					type="text"
				/>
			</FormController>
			<FormController
				name={`qualification[${index}].qualification`}
				validation={{
					required: 'This is required field.',
					maxLength: {
						value: 100,
						message: 'This input exceed maxLength.',
					},
				}}
			>
				<CustomFormInput
					type="text"
					label="Degree/Diploma"
					placeholder="Degree/Diploma"
					required
				/>
			</FormController>
			<FormController
				name={`qualification[${index}].domain`}
				validation={{
					required: 'This is required field.',
					maxLength: {
						value: 100,
						message: 'This input exceed maxLength.',
					},
				}}
			>
				<CustomFormInput
					type="text"
					label="Field(s) of Study"
					placeholder="Field"
					required
				/>
			</FormController>
			<FormController
				name={`qualification[${index}].year_of_completion`}
				validation={{
					required: 'This is required field.',
					maxLength: {
						value: 4,
						message: 'This input exceed maxLength.',
					},
					validate: (value) => {
						const year = parseInt(value, 10);

						if (isNaN(year) || year < 1900 || year > dayjs().year()) {
							return 'Please enter a valid year!';
						}
						return true;
					},
				}}
			>
				<CustomFormInput
					type="number"
					label="Year of Completion"
					placeholder="YYYY"
					required
				/>
			</FormController>
				<StyledButton onClick={handleDelete} className={index === 0 ? 'hide-button' : ''}>
					<img src={DeleteIcon} alt="delete-icon" />
				</StyledButton>
		</StyledSkills>
	);
};

export default AddQual;
