import React from 'react';
import { StyledBasicInfo } from './styledComponents';
import CustomFormInput from '../custom-forminput';
import FormController from '../FormController';
import { FormControl } from '@mui/material';
import { useParams } from 'react-router-dom';

const BasicInfo: React.FC = () => {
	const { id } = useParams();
	const isEditMode=!!id;
	return (
		<FormControl>
			<StyledBasicInfo>
				<div className="card-title" data-testid="Basic">Basic Information</div>
				<div className="input-container">
					<div className="input-caption">
						<FormController
							name="user.employee_id"
							validation={{
								required: 'This is required field.',
								maxLength: {
									value: 10,
									message: 'This input exceed maxLength.',
								},
							}}
						>
							<CustomFormInput
								type="text"
								label="ID"
								placeholder="CON001"
								required={!isEditMode}
								disabled={isEditMode}
								data-qa-automation="adContractidinput"
							/>
						</FormController>
					</div>

					<div className="input-caption">
						<FormController
							name="user.first_name"
							validation={{
								required: 'This is required field.',
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
								placeholder="First Name"
								label="Name"
								required
								data-qa-automation="adContractfninput"
							/>
						</FormController>
					</div>

					<div className="input-caption">
						<div style={{ height: '44px' }}></div>
						<FormController
							name="user.last_name"
							validation={{
								pattern: {
									value: /^[A-Za-z ]+$/,
									message: "Please Enter character's only !",
								},
							}}
						>
							<CustomFormInput
								placeholder="Last Name"
								type="text"
								label="Last Name"
								data-qa-automation="adContractlninput"
							/>
						</FormController>
					</div>
				</div>
				<div className="input-container">
					<div className="input-caption">
						<FormController
							name="user.email"
							validation={{
								required: 'This is required field.',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Please enter a valid email !',
								},
								maxLength: {
									value: 254,
									message: 'This input exceed maxLength.',
								},
							}}
						>
							<CustomFormInput
								placeholder="Email ID"
								label="Email ID(personal)"
								type="email"
								required
								data-qa-automation="adContractemailinput"
							/>
						</FormController>
					</div>
					<div className="input-caption">
						<FormController
							name="user.phone"
							validation={{
								required: 'This is required field.',
								maxLength: {
									value: 15,
									message: 'Please enter a valid mobile number !',
								},
								pattern: {
									value: /^\d{1,15}$/i,
									message: 'Please enter a valid mobile number !',
								},
							}}
						>
							<CustomFormInput
								placeholder="Mobile Number"
								label="Mobile Number"
								type="number"
								required
								data-qa-automation="adContractphnoinput"
							/>
						</FormController>
					</div>
					<div className="url">
						<FormController
							name="user.linkedin"
							validation={{
								maxLength: {
									value: 200,
									message: 'This input exceed maxLength.',
								},
								validate: (value) => {
									const linkedinUrlPattern =
										/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;

									if (value && !value.match(linkedinUrlPattern)) {
										return 'Please enter a valid LinkedIn URL.';
									}
								},
							}}
						>
							<CustomFormInput
							   type='text'
								placeholder="URL"
								label="Linkdln URL"
								data-qa-automation="adContracturlinput"
							/>
						</FormController>
					</div>
				</div>
			</StyledBasicInfo>
		</FormControl>
	);
};

export default BasicInfo;
