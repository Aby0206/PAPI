import { FC,ChangeEvent, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import CloseIcon from '../../assets/icons/closeButton.svg';
import {StyledBox,StyledButtonsWrapper } from '../../styles/global';
import {
	useAddSkillCategoryMutation,
	useUpdateSkillCategoryMutation,
	useAddSkillMutation,
	useUpdateSkillMutation,
} from '../../redux/services/Skill';
import { useGetSkillCategoryListQuery } from '../../redux/services/Contractors';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import UpdateModal from './UpdateModal';
import Button from '../Custom-Button';
import Constants from '../../../src/utils/Constants';
import {NullableParam } from '../../types';

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

interface AddSkillsProps {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
	editMode?: boolean;
	skillData?: NullableParam<infoDataType>;
}

const FormProviderWrapper: FC<AddSkillsProps> = ({
	open,
	onClose,
	onSuccess,
	editMode,
	skillData,
}) => {
	const methods = useForm({ mode: 'onChange', shouldFocusError: true });

	return (
		<FormProvider {...methods}>
			<AddNewSkill
				open={open}
				onClose={onClose}
				onSuccess={onSuccess}
				editMode={editMode}
				skillData={skillData}
			/>
		</FormProvider>
	);
};

const AddNewSkill: FC<AddSkillsProps> = ({
	open,
	onClose,
	onSuccess,
	editMode,
	skillData,
}) => {
	const [checked, setChecked] = useState('skill');
	const [isLoading, setLoading] = useState(false);
	const { showSnackbar } = useGlobalSnackbar();
	const [searchQuery, setSearchQuery] = useState('');
	const [AddSkill] = useAddSkillMutation();
	const [UpdateSkill] = useUpdateSkillMutation();
	const [AddCategory] = useAddSkillCategoryMutation();
	const [UpdateCategory] = useUpdateSkillCategoryMutation();

	const category =
		useGetSkillCategoryListQuery({ searchQuery: searchQuery }).data ?? [];

	const {
		handleSubmit,
		reset,
		setError,
		formState: {errors}
	} = useFormContext();

	useEffect(() => {
		if (editMode && skillData) {
			let updatedData = {
				...skillData,
				category_name: skillData.category.category,
			};
			reset(updatedData);
		} else {
			reset({});
		}
		setSearchQuery("");
	}, [open, checked, editMode]);

	const handleSearchChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		fieldname?: string
	) => {
		let query = event?.target?.value?.trim() || '';
		fieldname && setSearchQuery(query);
	};

	const handleOptionChange = (option: string) => {
		setChecked(option);
	};

	const handleClose = () => {
		reset({});
		onClose();
		setChecked('skill');
		setSearchQuery("");
	};

	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			const response = await performAction( data);
			showSnackbar(response?.detail||'Success' ,'success');
			handleClose();
			onSuccess?.();
		} catch (err: any) {
			handleErrors(err);
		} finally {
			setLoading(false);
		}
	};

	const performAction = async ( data: any) => {
		let payload = {};
		if (editMode) {
		  if (checked === 'skill') {
			payload = {
				category: data?.category?.id,
				name: data?.name,
				status: data?.status,
			};
			return (await UpdateSkill({ id: data?.id, payload }).unwrap());
		  } else {
			payload = {
				category: data?.category_name,
				status: data?.status,
			};
			return (await UpdateCategory({ id: data?.category?.id, payload }).unwrap());
		  }
		} else if(editMode ===false){
			if (checked === 'skill') {
				payload = {
				  category: data?.category,
				  name: data?.name,
				};
				return (await AddSkill(payload).unwrap());
			  } else if (checked==='skillCategory'){
				payload = {
					category: data?.category_name,
				  };
				  return (await AddCategory(payload).unwrap());
			  }
			  
		}
	  };

	const handleErrors = (err: any) => {
		const errorObject = err?.data?.error || {};
		for (const key in errorObject) {
			if (errorObject.hasOwnProperty(key)) {
				const errorMessage = errorObject[key]?.string;
				let field = key;
				if (key === 'category' && checked === 'skillCategory') {
					field = 'category_name';
				}
				setError(field, {
					type: 'custom',
					message: errorMessage,
				});
			}
		}
		showSnackbar(err?.data?.detail || Constants.ERROR_MESSAGE, 'error');
	};

	const onError = () => {
		showSnackbar('Please fill the mandatory fields! ', 'error');
	};

	return (
		<Modal open={open} onClose={onClose}>
			<StyledBox>
				<div className="card-header">
					<div className="card-title">
						{editMode === true ? (
							<text className="card-text">Update</text>
						) : (
							<text className="card-text">Add</text>
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
				<UpdateModal
					editMode={editMode}
					skillData={skillData}
					options={category}
					handleSearchChange={handleSearchChange}
					handleOptionChange={handleOptionChange}
				/>
				<StyledButtonsWrapper>
					<Button
						type="submit"
						showLoader={isLoading}
						disabled={isLoading}
						testId="submit-button-id"
						title={editMode ? 'Update' : 'Add'}
						onClick={handleSubmit(onSubmit, onError)}
					/>

					<Button
						type="cancel"
						testId="cancel-button-id"
						disabled={isLoading}
						title="Cancel"
						onClick={handleClose}
					/>
				</StyledButtonsWrapper>
			</StyledBox>
		</Modal>
	);
};

export default FormProviderWrapper;
