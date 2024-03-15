import { ChangeEvent, FC, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import {
	StyledFieldLabel,
	StyledButtonsWrapper,
	StyledBox,
} from '../../styles/global';
import CustomRating from '../custom-rating';
import CloseIcon from '../../assets/icons/closeButton.svg';
import { StyledDiv } from './styledComponents';
import {
	useAddSkillMutation,
	useUpdateSkillMutation,
} from '../../redux/services/EmployeeDetailsApi';
import {
	useGetSkillCategoryListQuery,
	useGetSkillListQuery,
	useLazyGetSkillCategoryQuery,
} from '../../redux/services/Skill';
import FormController from '../FormController';
import { useGlobalSnackbar, useGlobalAlert } from '../../hooks/globalHelpers';
import {
	NullableParam,
	SearchQueryProps,
	IdProps,
	Skill,
} from '../../types/index';
import FormSelect from '../custom-form-select';
import Button from '../Custom-Button';
import { generateArray, getValueWithLabel } from '../../utils';
import { useGetProficienyQuery } from '../../redux/services/Proficiency';
interface AddSkillsProps {
	open: boolean;
	onClose: () => void;
	editMode?: boolean;
	handleEditMode: () => void;
	skillData?: NullableParam<Skill>;
	id?: NullableParam<string>;
}
interface Category {
	id: NullableParam<number>;
	name: string;
}

const FormProviderWrapper: FC<AddSkillsProps> = ({
	open,
	onClose,
	editMode,
	handleEditMode,
	skillData,
	id,
}) => {
	const methods = useForm({ mode: 'onChange', shouldFocusError: true });

	return (
		<FormProvider {...methods}>
			<AddNewSkill
				open={open}
				onClose={onClose}
				editMode={editMode}
				handleEditMode={handleEditMode}
				skillData={skillData}
				id={id}
			/>
		</FormProvider>
	);
};

const AddNewSkill: FC<AddSkillsProps> = ({
	open,
	onClose,
	editMode,
	handleEditMode,
	skillData,
	id,
}) => {
	const { showSnackbar } = useGlobalSnackbar();
	const { showAlert } = useGlobalAlert();
	const [searchQuery, setSearchQuery] = useState<SearchQueryProps>({
		skill: '',
		category: '',
	});
	const [categorySelected, setCategory] = useState<Category>({
		id: null,
		name: '',
	});
	const [skillSelected, setSkill] = useState(null);
	const [categoryChanged, setCategoryChanged] = useState(false);
	const [year, setYear] = useState(0);
	const [filterIds, setFilterIds] = useState<IdProps>({
		skillFilter: null,
	});
	const { data: category, isError: isCategoryError } =
		useGetSkillCategoryListQuery({
			searchQuery: searchQuery.category,
		});
	const { data: skills, isError: isSkillError } = useGetSkillListQuery({
		searchQuery: searchQuery.skill,
		id: filterIds.skillFilter,
	});

	const [trigger] = useLazyGetSkillCategoryQuery();
	const Years = generateArray(20, 'Year', 'Years');
	const Months = generateArray(12, 'Month', 'Months');
	const [AddSkill, { isLoading }] = useAddSkillMutation();
	const [UpdateSkill] = useUpdateSkillMutation();
	const {
		handleSubmit,
		reset
	} = useFormContext();
	const { data: Proficiency } = useGetProficienyQuery(null);

	

	useEffect(() => {
		if (editMode) {
			skillData && reset(skillData);
		} else {
			let defaultData = { years_of_experience: 0, months_of_experience: 1 };
			reset(defaultData);
		}
	}, [editMode, skillData, reset]);

	useEffect(() => {
		refreshData();
	}, [open]);
	const handleClose = () => {
		onClose();
		reset();
		handleEditMode();
	};
	const refreshData = () => {
		clearSearch();
		clearIds();
		if (!editMode) {
			clearCategory()
		}
	};

	useEffect(() => {
		if (isSkillError) {
			showAlert('Skill not found. Please contact the admin.', 'warning');
		}
		if (isCategoryError) {
			showAlert('Category not found. Please contact the admin.', 'warning');
		}
	}, [isSkillError, isCategoryError]);

	const handleSearchChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		fieldname?: string
	) => {
		let query = event?.target?.value?.trim() || '';
		fieldname &&
			setSearchQuery((prevQueries) => ({
				...prevQueries,
				[fieldname]: query,
			}));
		clearIds();
	};

	const onHandleClose = (fieldName?: string) => {
		fieldName && clearSearch();
	};

	const getCategory = async (el: any) => {
		try {
			const result = await trigger(el.id);
			const responseData = result.data?.results?.[0] || {};
			setCategory({ id: responseData?.id, name: responseData?.category });
			setSkill(el.id);
			reset({
				years_of_experience: '0',
				months_of_experience: '1', 
				category: responseData?.id,
				skill: el.id,
			});
			setFilterIds({
				['skillFilter']: responseData?.id,
			});
		} catch (error) {}
	};

	const clearIds = () => {
		setFilterIds({ skillFilter: null });
	};
	const clearSearch = () => {
		setSearchQuery({ skill: '', category: '' });
	};
	const clearCategory = () => {
		setCategory({ id: null, name: '' });
	};

	const onSubmit = async (data: any) => {
		try {
			let skill = { ...data, user: id };
			if (editMode) {
				skill = {
					user: id,
					years_of_experience: data?.years_of_experience,
					months_of_experience: data?.months_of_experience,
					rating: data?.rating,
				};
				await UpdateSkill({ id: skillData?.id, payload: skill })?.unwrap();
				showSnackbar('Employee details updated successfully', 'success');
			} else {
				await AddSkill(skill)?.unwrap();
				showSnackbar('Employee details added successfully', 'success');
			}
			handleEditMode();
			reset();
			handleClose();
		} catch (err: any) {
			if (err?.status == 400) {
				showAlert(
					'User skill with the same skill and category already exists.You can update it',
					'error'
				);
			} else {
				showSnackbar('Oops. Something went wrong.', 'error');
			}
		}
	};

	const onError = () => {
		showSnackbar('Please fill all the mandatory fields! ', 'error');
	};
	return (
		<div>
			<Modal open={open} onClose={onClose}>
				<StyledBox className="top-fixed" sx={{ gap: 3 }}>
					<div className="card-header">
						<div className="card-title">
							{editMode === true ? (
								<text className="card-text">Update Skill</text>
							) : (
								<text className="card-text">Add Skill</text>
							)}
							<img
								className="card-icon"
								src={CloseIcon}
								alt="closeButton"
								onClick={handleClose}
							/>
						</div>
						<div className="divider" />
					</div>
					{(editMode === false && (
						<>
							<FormController
								name="category"
								validation={{
									required: 'This is required field.',
								}}
								formatValue={(event, onChange) => {
									setFilterIds(() => ({
										skillFilter: event.target.value,
									}));
									onChange(event);
									setCategoryChanged(!categoryChanged);
								}}
							>
								<FormSelect
									label="Skill Category"
									showAsterisk={true}
									hidelabel={false}
									fieldName="category"
									search={true}
									onSearchChange={handleSearchChange}
									onClose={onHandleClose}
									options={category?.results || []}
									nameKey="category"
									key={skillSelected}
									// value='3'
									data-qa-automation="EmpDetailSkillCategorydd"
									selected={categorySelected?.name || 'Select'}
								></FormSelect>
							</FormController>
							<FormController
								name="skill"
								validation={{
									required: 'This is required field.',
								}}
							>
								<FormSelect
									label="Skill"
									showAsterisk={true}
									hidelabel={false}
									fieldName="skill"
									search={true}
									onSearchChange={handleSearchChange}
									onClose={onHandleClose}
									options={skills?.results || []}
									nameKey="name"
									data-qa-automation="EmpDetailSkilldd"
									key={
										categoryChanged
											? 'category-changed'
											: 'category-not-changed'
									}
									selected="Select"
									handleItemClicked={(el) => {
										if (el.category !== categorySelected?.id) {
											getCategory(el);
										}
									}}
								></FormSelect>
							</FormController>
						</>
					)) || (
						<StyledFieldLabel sx={{ color: 'black' }}>
							{skillData?.category} / {skillData?.skill}
						</StyledFieldLabel>
					)}
					<StyledDiv>
						<StyledFieldLabel>
							Experience <span style={{ color: 'red' }}>*</span>
						</StyledFieldLabel>
						<StyledDiv className="row">
							<FormController
								name="years_of_experience"
								formatValue={(value, onChange) => {
									setYear(value?.target?.value);
									onChange(value);
								}}
								validation={{
									required: 'This is required field.',
								}}
							>
								<FormSelect
									showAsterisk={true}
									hidelabel={true}
									fieldName="years"
									options={Years || []}
									nameKey="name"
									selected={
										(skillData &&
											getValueWithLabel(
												skillData?.years_of_experience,
												'Year',
												'Years'
											)) ||
										'0 Year'
									}
									data-qa-automation="EmpDetailyoedd"
								></FormSelect>
							</FormController>
							<FormController
								name="months_of_experience"
								validation={{
									required: 'This is required field.',
									max: {
										value: year == 20 ? 0 : 12,
										message: 'Maximum value is 0',
									},
								}}
							>
								<FormSelect
									showAsterisk={true}
									hidelabel={true}
									fieldName="months"
									data-qa-automation="EmpDetailmoedd"
									options={Months || []}
									nameKey="name"
									selected={
										(skillData &&
											getValueWithLabel(
												skillData?.months_of_experience,
												'Month',
												'Months'
											)) ||
										'1 Month'
									}
								></FormSelect>
							</FormController>
						</StyledDiv>
					</StyledDiv>
					<FormController
						name="rating"
						validation={{
							required: 'This is required field',
						}}
						formatValue={(event, onChange) => {
							onChange(+event.target.value);
						}}
					>
						<CustomRating
							data-qa-automation="EmpDetailRating"
							label="Proficiency Level"
							required
							showRatingDesc={true}
							showBorder={true}
							description={Proficiency?.results?.toReversed() || []}
						/>
					</FormController>
					<StyledButtonsWrapper>
						<Button
							type="submit"
							showLoader={isLoading}
							disabled={isLoading}
							testId="submit-button-id"
							title={editMode ? 'Update' : 'Add'}
							onClick={handleSubmit(onSubmit, onError)}
							data-qa-automation="EmpDetailSubmitbtn"
						/>

						<Button
							type="cancel"
							testId="cancel-button-id"
							disabled={isLoading}
							title="Cancel"
							onClick={handleClose}
							data-qa-automation="EmpDetailCancelbtn"
						/>
					</StyledButtonsWrapper>
				</StyledBox>
			</Modal>
		</div>
	);
};

export default FormProviderWrapper;
