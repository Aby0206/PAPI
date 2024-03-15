import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledDatePicker } from './styledComponents';
import {
	PickerChangeHandlerContext,
	DateValidationError,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
	onChange?: (
		value: unknown,
		context: PickerChangeHandlerContext<DateValidationError>
	) => void;
	showAsterisk?: boolean;
	hidelabel?: boolean;
	label?: string;
	value?: string;
	invalid?: boolean;
	minDate?: Date | null;
	maxDate?: Date | null;
}

const CustomFormDatePicker: React.FC<CustomDatePickerProps> = ({
	onChange,
	label,
	hidelabel = false,
	showAsterisk = false,
	invalid,
	minDate,
	maxDate,
	value,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{!hidelabel && (
				<label className="input-label">
					{label} {showAsterisk && <span style={{ color: 'red' }}>*</span>}
				</label>
			)}
			<StyledDatePicker
				format='DD-MM-YYYY'
				minDate={minDate}
				maxDate={maxDate}
				onChange={onChange}
				invalid={invalid}
				value={value ? dayjs(value) : ''}
			/>
		</LocalizationProvider>
	);
};

export default CustomFormDatePicker;
