import React, { FC, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { StyledDialogue, StyledBox } from './styledComponents';
import CloseIcon from '../../assets/icons/closeButton.svg';
import FormController from '../FormController';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import CustomTextInput from '../custom-text-input';
import Button from '../Custom-Button';
import { PayloadProps } from '../../redux/services/Proficiency';
import Constants from '../../../src/utils/Constants';
// import { unstable_usePrompt } from 'react-router-dom';
interface EditProficiencyProps {
	isOpen: boolean;
	onClose: () => void;
	data: ProficiencyData;
	updateProficiency?: (id: number, data: PayloadProps) => void;
}
type ProficiencyData = {
	id: number;
	rating: number;
	description: string;
};

const FormProviderWrapper: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	data: ProficiencyData;
	updateProficiency?: (id: number, data: PayloadProps) => void;
}> = ({ isOpen, onClose, data, updateProficiency, ...props }) => {
	const methods = useForm({ mode: 'onChange', shouldFocusError: true });

	return (
		<FormProvider {...methods}>
			<EditProficiency
				isOpen={isOpen}
				onClose={onClose}
				data={data}
				updateProficiency={updateProficiency}
			/>
		</FormProvider>
	);
};
const EditProficiency: FC<EditProficiencyProps> = ({
	isOpen,
	onClose,
	data,
	updateProficiency,
}) => {
	const { showSnackbar } = useGlobalSnackbar();
	const {
		handleSubmit,
		reset,
		setValue,
		setError,
		formState: { errors },
	} = useFormContext();

	const [isLoading, setLoading] = useState(false);
	const [unsavedChanges, setunsavedChanges] = useState(false);
	// unstable_usePrompt(
	// 	{when: true , message : 'Changes that you made may not be saved. Are you sure you want to leave?'}
	// );
	const handleClose = () => {
		onClose();
		reset();
	};
	useEffect(() => {
		reset(data);
	}, [isOpen]);

	const onSubmit: SubmitHandler<ProficiencyData> = async (data) => {
		setLoading(true);
		setunsavedChanges(false);
		try {
			let proficiency = {
				rating: data.rating,
				description: data.description,
			};
			await updateProficiency?.(data.id, proficiency);
			onClose();
		} catch (err: any) {
			setError('description', {
				type: 'custom',
				message: err?.data?.error?.description?.string || '',
			});
			showSnackbar(err?.data?.detail || Constants.ERROR_MESSAGE, 'error');
		} finally {
			setLoading(false);
		}
	};

	const onError = () => {
		showSnackbar('Please check the data before continue! ', 'error');
	};
	return (
		<StyledDialogue>
			<Modal open={isOpen} onClose={onClose}>
				<StyledBox>
					<div className="card-title">
						<text className="card-heading" data-testid="title-id">
							Update
						</text>

						<img
							className="card-icon"
							src={CloseIcon}
							alt="closeButton"
							onClick={handleClose}
						/>
					</div>
					<div className="divider"/>
					<FormController
						name="description"
						validation={{
							required: 'This is required field.',
							maxLength: {
								value: 250,
								message: 'This input exceed maxLength!',
							},
							minLength: {
								value: 50,
								message: 'Minimum 50 characters!',
							},
						}}
						formatValue={(e, onChange) => {
							
							onChange(e);
							setValue('description', e?.target?.value || null);
							if (e?.target?.value !== data.description) {
								setunsavedChanges(true);
							} else {
								setunsavedChanges(false);
							}
						}}
					>
						<CustomTextInput
							label="Description"
							required
							helperText="Min 50 characters or max 250 characters"
							testid="input-id"
						/>
					</FormController>
					<div className="btn-wrap">
						<Button
						   data-qa-automation="editProfiModalbtn"
							type="submit"
							showLoader={isLoading}
							disabled={isLoading}
							testId="update-button-id"
							title="Update"
							onClick={handleSubmit(
								onSubmit as SubmitHandler<FieldValues>,
								onError
							)}
						/>
						<Button
						   data-qa-automation="cancelProfiModalbtn"
							type="cancel"
							testId="cancel-button-id"
							disabled={isLoading}
							title="Cancel"
							onClick={handleClose}
						/>
					</div>
				</StyledBox>
			</Modal>
		</StyledDialogue>
	);
};

export default FormProviderWrapper;
