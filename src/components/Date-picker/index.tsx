import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledDatePicker } from './styledComponents';
import {
	PickerChangeHandlerContext,
	DateValidationError,
} from '@mui/x-date-pickers';

interface CustomDatePickerProps {
	onChange?: (
		value: unknown,
		context: PickerChangeHandlerContext<DateValidationError>
	) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onChange }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<StyledDatePicker onChange={onChange} />
		</LocalizationProvider>
	);
};

export default CustomDatePicker;
