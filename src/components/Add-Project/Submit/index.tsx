import React, {useEffect} from 'react';
import {
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useFormContext,
} from 'react-hook-form';
import {useSaveProjectMutation} from '../../../redux/services/Project/index'
import { useNavigate } from 'react-router-dom';
import { useGlobalSnackbar } from '../../../hooks/globalHelpers';
import { NullableParam , ContractorInputs} from '../../../types';
import { flattenErrorObject } from '../../../utils/index';
import Button from '../../Custom-Button';
interface SubmitSectionProps {
	isEditMode?: boolean;
	projectId?: number | null;
	file:any;
	data:any;
}
interface AddRequestPayloadProps {
	payload: ContractorInputs;
}
interface EditRequestPayloadProps extends AddRequestPayloadProps {
	id?: NullableParam<number>;
}

type RequestPayloadType = AddRequestPayloadProps | EditRequestPayloadProps;

const SubmitProject: React.FC<SubmitSectionProps> = ({
	isEditMode,
	projectId,
	file,
	data
}) => {
	const { handleSubmit, reset, formState,setError, getValues } =
		useFormContext();
	const { showSnackbar } = useGlobalSnackbar();
	const [SaveDetails, { isLoading }] = useSaveProjectMutation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isEditMode && data) {
			let updatedData = {
				...data,
			};
			reset(updatedData);
		} else {
			reset({});
		}
	
	}, [data]);

	const onSubmit: SubmitHandler<ContractorInputs> = async (data) => {
		let formData:any =  new FormData();
		if (!isEditMode) {
			delete data?.sow;
			formData.append("project",new Blob([JSON.stringify({...data,uploadSowType:file?.type,docOriginalName:file?.name})],{type:'application/json'}))
			formData.append("doc",file)
		} else {
			const dirtyFields = Object.keys(formState.dirtyFields) || [];
			let project:any ={}
			dirtyFields.forEach((key) => {
				if(key === "sow") 	formData.append("doc",file)
				else project[key] = getValues(key);
			});  
			delete data?.sow;
			formData.append("project",new Blob([JSON.stringify({...project,...data,id:projectId,uploadSowType:file?.type,docOriginalName:file?.name})],{type:'application/json'}))
		}
		const successMessage = isEditMode
			? 'Project Details updated successfully'
			: 'Project Details added successfully';
		try {
			const requestPayload: RequestPayloadType = isEditMode
				? { id: projectId, payload: formData }
				: { payload: formData };

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
		showSnackbar('Project details updation failed', 'error');
	  };

	const onError = (errors: FieldErrors<ContractorInputs>) => {
		showSnackbar('Please fill all the mandatory fields! ', 'error');
	};


	return (
		<div className="button-container">
			<Button
				type="submit"
				showLoader={false}
				disabled={false}
				testId="submit-button-id"
				title={(!isEditMode && 'Add Project') || 'Update'}
				onClick={handleSubmit(onSubmit as SubmitHandler<FieldValues>, onError)}
			/>
			<button
				className="cancel-btn"
				disabled={false}
				onClick={() => navigate(-1)}
			>
				Cancel
			</button>
		</div>
	);
};
export default SubmitProject;
