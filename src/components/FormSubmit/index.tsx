import React from 'react';
import {
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useFormContext,
} from 'react-hook-form';
import { useSaveContractorMutation } from '../../redux/services/Contractors';
import { useNavigate } from 'react-router-dom';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import { ContractorInputs, NullableParam } from '../../types';
import { flattenErrorObject } from '../../utils/index';
import Button from '../Custom-Button';
interface SubmitSectionProps {
	isEditMode?: boolean;
	contractorId?: NullableParam<number>;
}
interface AddRequestPayloadProps {
	payload: ContractorInputs;
}
interface EditRequestPayloadProps extends AddRequestPayloadProps {
	id?: NullableParam<number>;
}

type RequestPayloadType = AddRequestPayloadProps | EditRequestPayloadProps;

const SubmitSection: React.FC<SubmitSectionProps> = ({
	isEditMode,
	contractorId,
}) => {
	const { handleSubmit, reset, formState,setError, getValues } =
		useFormContext();
	const { showSnackbar } = useGlobalSnackbar();
	const [SaveDetails, { isLoading }] = useSaveContractorMutation();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<ContractorInputs> = async (data) => {
		let formData: ContractorInputs = {};
		if (!isEditMode) {
			formData = data;
		} else {
			const dirtyFields = Object.keys(formState.dirtyFields) || [];
			dirtyFields.forEach((key) => {
				formData[key] = getValues(key);
			});      
			if (dirtyFields.includes('user_skill')) {
				const updatedSkills = formData?.user_skill?.map((item) => ({
					...item,
					approval_status:
						item['approval_status'] !== undefined
							? item['approval_status']
							: false,
				}));
				formData['user_skill'] = updatedSkills;
			}
		}
		const successMessage = isEditMode
			? 'Employee details updated successfully'
			: 'Employee details added successfully';
		try {
			const requestPayload: RequestPayloadType = isEditMode
				? { id: contractorId, payload: formData }
				: { payload: data };

			await SaveDetails(requestPayload as EditRequestPayloadProps).unwrap();
			showSnackbar(successMessage, 'success');
			!isEditMode && reset();
		} catch (error) {
			handleErrors(error);
		}
	};

	const handleErrors = (error: any) => {
		if (error?.data?.error) {
		  const errorList = flattenErrorObject(error.data.error);
		  for (const key in errorList) {
			setError(key, {
			  type: 'custom',
			  message: errorList[key],
			});
		  }
		}
		showSnackbar('Employee details updation failed', 'error');
	  };

	const onError = (errors: FieldErrors<ContractorInputs>) => {
		showSnackbar('Please fill all the mandatory fields! ', 'error');
	};


	return (
		<div className="button-container">
			<Button
				type="submit"
				showLoader={isLoading}
				disabled={isLoading}
				testId="submit-button-id"
				title={(!isEditMode && 'Add Contractor') || 'Update'}
				onClick={handleSubmit(onSubmit as SubmitHandler<FieldValues>, onError)}
			/>
			<button
				className="cancel-btn"
				disabled={isLoading}
				onClick={() => navigate(-1)}
			>
				Cancel
			</button>
		</div>
	);
};
export default SubmitSection;
