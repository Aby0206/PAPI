import React, {ChangeEvent, useState } from 'react';
import { StyledWork, StyledWorkMode, StyledTextArea } from './styledComponent';
import FormSelect from '../custom-form-select';
import CustomFormInput from '../custom-forminput';
import FormControl from '@mui/material/FormControl';
import FormController from '../FormController';
import {
	useGetDepartmentsQuery,
	useGetReportingManagersQuery,
	useGetDesignationsQuery,GetContractorApiResponse
} from '../../redux/services/Contractors';
import CustomFormDatePicker from '../custom-form-datepicker';
import Attachments from './Attachments';
import CustomRadioGroup from '../custom-form-radiogroup';
import { useFormContext } from 'react-hook-form';
import Constants from '../../../src/utils/Constants';

interface SearchQueryProps {
	managers?: string;
	designations: string;
	departments: string;
}

interface WorkProps {
	data?:GetContractorApiResponse
}

const Work: React.FC<WorkProps> = ({data}) => {
	const [searchQuery, setSearchQuery] = useState<SearchQueryProps>({
		managers: '',
		designations: '',
		departments: '',
	});
	const { setValue } =
		useFormContext();
	const departments = useGetDepartmentsQuery({searchQuery:searchQuery.departments}).data;
	const reportingManagers = useGetReportingManagersQuery({
		searchQuery:searchQuery.managers}
	).data;
	const designations = useGetDesignationsQuery({searchQuery:searchQuery.designations}).data;
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

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

	return (
		<StyledWork>
			<div className="card-title">Work</div>
			<div className="container-box">
				<FormController
					name="user.department"
					validation={{
						required: 'This is required field.',
					}}
				>
					<FormSelect
						label="Department"
						showAsterisk={true}
						hidelabel={false}
						fieldName="departments"
						search
						searchPlaceholder="Search a Department"
						onSearchChange={handleSearchChange}
						onClose={onClose}
						options={departments?.results ?? []}
						nameKey="name"
						selected={data?.user?.department?.name}
						data-qa-automation="adContractdeptdd"
					></FormSelect>
				</FormController>
				<FormController
					name="user.designation"
					validation={{
						required: 'This is required field.',
					}}
				>
					<FormSelect
						label="Title"
						showAsterisk={true}
						search
						searchPlaceholder="Search a Designation"
						fieldName="designations"
						onSearchChange={handleSearchChange}
						onClose={onClose}
						options={designations?.results ?? []}
						nameKey="name"
						selected={data?.user?.designation?.name}
						data-qa-automation="adContracttitledd"
					></FormSelect>
				</FormController>
				<FormController
					name="user.reporting_manager"
					validation={{
						required: 'This is required field.',
					}}
				>
					<FormSelect
						label="Reporting Manager"
						showAsterisk={true}
						search
						searchPlaceholder="Search a Reporting Manager"
						fieldName="managers"
						onSearchChange={handleSearchChange}
						onClose={onClose}
						options={reportingManagers?.results ?? []}
						nameKey="full_name"
						selected={data?.user?.reporting_manager?.full_name}
						data-qa-automation="adContractrmdd"
					></FormSelect>
				</FormController>
				<FormController
					name="email_official"
					validation={{
						required: 'This is required field',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'Please enter a valid email !',
						},
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
					}}
				>
					<CustomFormInput
						type="email"
						label="Email ID (Official)"
						required
						placeholder="Email ID "
						data-qa-automation="adContractemailofficialinput"
					/>
				</FormController>
			</div>
			<div className="container-box">
				<FormController
					name="user.experience"
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
						label="Total Experience (years)"
						required
						placeholder="Experience"
						data-qa-automation="adContractteinput"
					/>
				</FormController>
				<FormController
					name="user.address"
					validation={{
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
					}}
				>
					<CustomFormInput
						type="text"
						label="Location"
						placeholder="Location"
						data-qa-automation="adContractLocinput"
					/>
				</FormController>
				<FormController
					name="vendor"
					validation={{
						required: 'This is required field',
						maxLength: {
							value: 50,
							message: 'This input exceed maxLength.',
						},
					}}
				>
					<CustomFormInput
						type="text"
						label="Vendor Name"
						placeholder="Vendor Name"
						required
						data-qa-automation="adContractVninput"
					/>
				</FormController>
				<FormController
					name="availability"
					formatValue={(event, onChange) => {
						const value = event?.target?.value?.trim() || '';
						value !== '' ? onChange(parseFloat(value)) : onChange('');
					}}
					validation={{
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
						validate: (value) => {
							if (value < 0) {
								return 'Value cannot be below zero.';
							}
							return true;
						},
					}}
				>
					<CustomFormInput
						type="number"
						label="Availability"
						placeholder="% of Availability"
						data-qa-automation="adContractavailinput"
					/>
				</FormController>
			</div>
			<div className="container-box-2">
				<div className="container-item-1">
					<FormController
						name="user.start_date"
						validation={{
							required: 'This is required field',
						}}
						formatValue={(value, onChange) => {
							setStartDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Contract Start Date"
							hidelabel={false}
							showAsterisk={true}
							maxDate={endDate}
							data-qa-automation="adContractCsdDp"
						/>
					</FormController>
				</div>
				<div className="container-item-1">
					<FormController
						name="user.end_date"
						validation={{
							required: 'This is required field',
						}}
						formatValue={(value, onChange) => {
							setEndDate(value);
							onChange(value?.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Contract End Date"
							hidelabel={false}
							showAsterisk={true}
							minDate={startDate}
							data-qa-automation="adContractCedDp"
						/>
					</FormController>
				</div>
			</div>
			<FormControl>
				<StyledWorkMode>
					<div className="title">Work Mode</div>
					<FormController
						name="user.work_mode"
						formatValue={(event, onChange) => {
							const value = event?.target?.value || '1';
							onChange(parseInt(value));
						}}
					>
						<CustomRadioGroup options={Constants.WORKMODES} />
					</FormController>
				</StyledWorkMode>
			</FormControl>
			<div className="heading">Contracted At</div>
			<div className="container-box-3">
				<FormController
					name="contracted_currency"
					validation={{
						required: 'This is required field.',
					}}
				>
					<FormSelect
						label="Currency"
						showAsterisk={true}
						options={Constants.CURRENCY}
						nameKey="name"
						selected={data?.contracted_currency}
						data-qa-automation="adContractcurrnecydd"
					></FormSelect>
				</FormController>
				<FormController
					name="contract_payment"
					formatValue={(event, onChange) => {
						const value = event?.target?.value?.trim() || '';
						value !== '' ? onChange(parseFloat(value)) : onChange('');
					}}
					validation={{
						required: 'This is required field',
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
						validate: (value) => {
							const numericValue = parseFloat(value);
							if (isNaN(numericValue) || numericValue < 1) {
								return 'Please enter a valid number!';
							}
							return true;
						},
					}}
				>
					<CustomFormInput
						label="Value"
						type="number"
						required
						placeholder="value"
						data-qa-automation="adContractValueinput"
					/>
				</FormController>
				<FormController
					name="contracted_unit"
					validation={{
						required: 'This is required field',
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
					}}
				>
					<FormSelect
						label="Unit"
						showAsterisk={true}
						options={Constants.UNIT}
						nameKey="name"
						selected={data?.contracted_unit}
						data-qa-automation="adContractUnitdd"
					></FormSelect>
				</FormController>
			</div>
			<Attachments />
			<div className="container-item">
				<>Remarks</>
				<FormController name="remarks" formatValue={(e, onChange) => {
							onChange(e)
							setValue("remarks",e?.target?.value||null)
						}}>
					<StyledTextArea placeholder="Remarks if any"    
							data-qa-automation="adContractRemarkinput"
					/>
				</FormController>
			</div>
		</StyledWork>
	);
};

export default Work;
