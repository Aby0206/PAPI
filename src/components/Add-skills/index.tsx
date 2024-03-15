import { ChangeEvent, FC,useState } from 'react';
import { StyledSkills, StyledButton } from './styledComponents';
import DeleteIcon from '../../assets/icons/material-symbols_delete-outline.svg';
import CustomFormInput from '../custom-forminput';
import FormController from '../FormController';
import FormSelect from '../custom-form-select';
import {
	useGetSkillCategoryListQuery,
	useGetSkillsQuery,
} from '../../redux/services/Contractors';
import CustomRating from '../custom-rating';
import { VoidFunction } from '../../types';
interface AddSkillsProps {
	onDelete?: VoidFunction;
	index: number;
	editFormData:any
}

interface SearchQueryProps {
	skill: string;
	category: string;
}

const AddSkills: FC<AddSkillsProps> = ({
	onDelete,
	index,
	editFormData,
}) => {
	const [searchQuery, setSearchQuery] = useState<SearchQueryProps>({
		skill: '',
		category: '',
	});
	const category = useGetSkillCategoryListQuery({searchQuery:searchQuery.category}).data;
	const skills = useGetSkillsQuery({searchQuery:searchQuery.skill}).data;
	const handleSearchChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		fieldname?: string,
	) => {
		let query = event?.target?.value?.trim() || '';
		fieldname && setSearchQuery((prevQueries) => ({
			...prevQueries,
			[fieldname]: query,
		}));
	};

	const onClose = (fieldName?: string) => {
		fieldName && setSearchQuery((prevQueries) => ({
		  ...prevQueries,
		  [fieldName]: '',
		}));
	  };


	const handleDelete = () => {
		if (onDelete) {
			onDelete();
		}
	};

	return (
		<StyledSkills className={index !== 0 ? 'hide-labels' : ''}>
			<FormController
				name={`user_skill[${index}].category`}
				validation={{
					required: 'This is required field.',
				}}
			>
				<FormSelect
					label="Skill Category"
					fieldName="category"
					search
					searchPlaceholder="Search a Skill Category"
					onSearchChange={handleSearchChange}
					onClose={onClose}
					options={category?.results ?? []}
					nameKey="category"
					selected={editFormData?.[index]?.category?.name}
				></FormSelect>
			</FormController>
			<FormController
				name={`user_skill[${index}].skill`}
				validation={{
					required: 'This is required field.',
				}}
			>
				<FormSelect
					label="Skill"
					fieldName="skill"
					search
					searchPlaceholder="Search a Skill"
					onSearchChange={handleSearchChange}
					onClose={onClose}
					options={skills?.results ?? []}
					nameKey="name"
					selected={editFormData?.[index]?.name?.skill}
				></FormSelect>
			</FormController>
			<FormController
				name={`user_skill[${index}].experience`}
				validation={{
					required: 'This is required field',
					max: {
						value: 50,
						message: 'Maximum value allowed is 50.',
					  },
					  pattern: {
						value: /^(0|[1-9]\d*\.?\d?)$/,
						message: 'Please enter a valid number of years of experience!',
					},
				}}
			>
				<CustomFormInput
					type="number"
					placeholder="Experience"
					required
					label="Experience(years)"
				/>
			</FormController>
			<FormController
				name={`user_skill[${index}].rating`}
				validation={{
					required: 'This is required field',
				}}
				formatValue={(event, onChange) => {
					onChange(+event.target.value);
				}}
			>
				<CustomRating label="Proficiency Level" required  showBorder={true}  />
			</FormController>
			
				<StyledButton onClick={handleDelete} className={index === 0 ? 'hide-button' : ''}>
					<img src={DeleteIcon} alt="delete-icon" />
				</StyledButton>
		
		</StyledSkills>
	);
};

export default AddSkills;
