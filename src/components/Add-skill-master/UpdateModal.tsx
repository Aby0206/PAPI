import { ChangeEvent, FC, useState } from 'react';
import CustomFormInput from '../custom-forminput';
import FormController from '../FormController';
import CustomSwitch from '../custom-switch';
import CustomCheckbox from '../custom-checkbox';
import { StyledDiv } from './styledComponents';
import FormSelect from '../custom-form-select';
import { NullableParam } from '../../types';
import { StyledFieldLabel } from '../../styles/global';
type infoDataType = {
	id: number;
	name: NullableParam<string>;
	category: {
		id: number;
		category: NullableParam<string>;
		status: boolean;
	};
	total_employee: number;
	status: boolean;
};
interface UpdateModalProps {
	editMode?: boolean;
	skillData?: NullableParam<infoDataType>;
	options: any;
	handleOptionChange?: (option: string) => void;
	handleSearchChange?: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		fieldname?: string
	) => void;
}
const UpdateModal: FC<UpdateModalProps> = ({
	editMode,
	skillData,
	options,
	handleOptionChange,
	handleSearchChange,
}) => {
	const [checked, setChecked] = useState('skill');
	const [checkBox, setCheckBox] = useState(true);

	const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e?.target?.getAttribute('value') ?? 'false';
		let option = value == 'false' ? 'skillCategory' : 'skill';
		setChecked(option);
		setCheckBox(JSON.parse(value));
		handleOptionChange?.(option);
	};
	return (
		<StyledDiv>
			<StyledFieldLabel>Please select Skill/Skill Category</StyledFieldLabel>
			<CustomCheckbox
				data={['Skill', 'Skill Category']}
				value={checkBox}
				checked={checkBox}
				handleCheckBox={handleCheckBox}
			/>

			{checked === 'skill' ? (
				<FormController
					name="category"
					validation={{
						required: 'This is required field.',
					}}
				>
					<FormSelect
						label="Skill Category"
						showAsterisk={true}
						hidelabel={false}
						fieldName="category"
						search={true}
						onSearchChange={handleSearchChange}
						options={options?.results || []}
						nameKey="category"
						selected={skillData?.category?.category as string}
					></FormSelect>
				</FormController>
			) : (
				<FormController
					name="category_name"
					validation={{
						required: 'This is required field.',
					}}
				>
					<CustomFormInput
						type="text"
						placeholder="Skill Category"
						required
						label="Skill Category"
					/>
				</FormController>
			)}

			{checked === 'skill' && (
				<FormController
					name="name"
					validation={{
						required: 'This is required field',

						max: {
							value: 30,
							message: 'Maximum char limit is 30.',
						},
					}}
				>
					<CustomFormInput
						type="text"
						placeholder="Skill"
						required
						label="Skill "
					/>
				</FormController>
			)}
			{editMode === true && (
				<div className="wrap-box">
					<FormController
						name="status"
						formatValue={(e, onChange) => {
							onChange(e);
						}}
					>
						<CustomSwitch labelContent="Status" required />
					</FormController>
				</div>
			)}
		</StyledDiv>
	);
};

export default UpdateModal;
