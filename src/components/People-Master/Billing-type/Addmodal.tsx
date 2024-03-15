import { FC,useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import CloseIcon from '../../../assets/icons/closeButton.svg';
import {StyledBox,StyledButtonsWrapper } from '../../../styles/global';
import { useGlobalSnackbar , useGlobalAlert } from '../../../hooks/globalHelpers';
import Button from '../../Custom-Button';
import CustomFormInput from '../../custom-forminput';
import FormController from '../../FormController';
import { StyledDiv } from '../modalStyle';
import Constants from '../../../utils/Constants';
import {useAddBillingTypeMutation,useUpdateBillingTypeMutation} from'../../../redux/services/Project/billing'
import {NullableParam } from '../../../types';

type infoDataType = {
	id: number;
	name: NullableParam<string>;
	billingTypeName:string;
};

interface AddList {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
	editMode: boolean;
	billingData?: NullableParam<infoDataType>;
}

const FormProviderWrapper: FC<AddList> = ({
	open,
	onClose,
	onSuccess,
	editMode,
	billingData
}) => {
	const methods = useForm({ mode: 'onChange', shouldFocusError: true });

	return (
		<FormProvider {...methods}>
			<AddList
				open={open}
				onClose={onClose}
				onSuccess={onSuccess}
				editMode={editMode}
				billingData={billingData}
			/>
		</FormProvider>
	);
};

const AddList: FC<AddList> = ({
	open,
	billingData,
	onClose,
	onSuccess,
	editMode,
}) => {
	

	const [isLoading, setLoading] = useState(false);
	const { showSnackbar } = useGlobalSnackbar();
	const { showAlert } = useGlobalAlert();
	const[UpdateBilling]=useUpdateBillingTypeMutation(); 
	const[AddBilling]=useAddBillingTypeMutation()


	const {
		handleSubmit,
		reset,
		setError,
		formState: {errors}
	} = useFormContext();

	useEffect(() => {
		if (editMode && billingData) {
			let updatedData = {
				...billingData,
				billingTypeName: billingData.billingTypeName,
			};
			reset(updatedData);
		} else {
			reset({});
		}
	
	}, [open, editMode]);
	
    const handleClose = () => {
		reset({});
		onClose();
	};
	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			const response = await performAction( data);
			showSnackbar(response?.detail||'Success' ,'success');
			handleClose();
			onSuccess?.();
		} catch (err: any) {
			if (err?.status == 400) {
				showAlert(
					'This Billing Type already Exist.','error'
				);
			} else {
				showSnackbar('Oops. Something went wrong.', 'error');
			}
		} finally {
			setLoading(false);
		}
	};
	const performAction = async (data: any) => {
		if (editMode) {
		return await UpdateBilling(data).unwrap();		
		} else {
		  return (await AddBilling(data).unwrap());
		}
	  };

	const onError = () => {
		showSnackbar('Please fill the mandatory field! ', 'error');
	};
	const handleErrors = (err: any) => {
		const errorObject = err?.data?.error || {};
		for (const key in errorObject) {
		  if (errorObject.hasOwnProperty(key)) {
			const errorMessage = errorObject[key]?.string;
			const field = key;
			setError(field, {
			  type: 'custom',
			  message: errorMessage,
			});
		  }
		}
		showSnackbar(err?.data?.detail || Constants.ERROR_MESSAGE, 'error');
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
                <StyledDiv>
				<FormController
					name="billingTypeName"
					validation={{
						required: 'This is required field',
						pattern: {
							value: /^[A-Za-z]+$/,
							message: "Please Enter character's only !",
						},
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
			}}
				>
					<CustomFormInput
						type="text"
						placeholder="Billing Type"
						required
						label="Billing Type"
					/>
				</FormController>
		       </StyledDiv>
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