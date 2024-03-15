import React from 'react';
import CustomCheckbox from '../custom-checkbox';
import FormController from '../FormController';
import FileUploadComponent from '../custom-form-upload';
import CustomFormDatePicker from '../custom-form-datepicker';
import { toBase64 } from '../../utils';

const Attachments: React.FC = () => {

	return (
		<>
			<div className="heading">Attachments</div>
			<div className="upload-container">
				<FormController
					name="sow"
					validation={{
						required: 'This is required field',
					}}
					formatValue={(value, onChange) => {
						toBase64(value.target.files[0]).then((base64) => {
							onChange(base64);
						});
					}}
				>
					<FileUploadComponent fileMessage="Attach SOW" required />
				</FormController>

				<FormController
					name="cv"
					validation={{
						required: 'This is required field',
					}}
					formatValue={(value, onChange) => {
						toBase64(value.target.files[0]).then((base64) => {
							onChange(base64);
						});
					}}
				>
					<FileUploadComponent fileMessage="Attach CV" required />
				</FormController>

				<FormController
					name="simelabs_cv"
					validation={{
						required: 'This is required field',
					}}
					formatValue={(value, onChange) => {
						toBase64(value.target.files[0]).then((base64) => {
							onChange(base64);
						});
					}}
				>
					<FileUploadComponent fileMessage="Attach Simelabs CV" required />
				</FormController>
			</div>
			<div className="checkbox-container">
				<FormController
					name="msa_signed"
					validation={{
						validate: (value) => {
							return value !== null;
						},
					}}
					formatValue={(e, onChange) => {
						const value = e?.target?.getAttribute('value') || false;
						onChange(JSON.parse(value));
					}}
				>
					<CustomCheckbox labelContent="MSA Signed" required />
				</FormController>
				<div className="container-item-1">
					<FormController
						name="msa_expiry_date"
						formatValue={(value, onChange) => {
							onChange(value?.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Expiry Date"
							hidelabel={false}
							showAsterisk={false}
						/>
					</FormController>
				</div>
			</div>
			<div className="checkbox-container">
				<FormController
					name="sow_signed"
					validation={{
						validate: (value) => {
							return value !== null;
						},
					}}
					formatValue={(e, onChange) => {
						const value = e?.target?.getAttribute('value') || false;
						onChange(JSON.parse(value));
					}}
				>
					<CustomCheckbox labelContent="SOW Signed" required />
				</FormController>
				<div className="container-item-1">
					<FormController
						name="sow_expiry_date"
						formatValue={(value, onChange) => {
							onChange(value?.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Expiry Date"
							hidelabel={false}
							showAsterisk={false}
						/>
					</FormController>
				</div>
			</div>
		</>
	);
};

export default Attachments;
