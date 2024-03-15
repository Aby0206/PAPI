import { Theme, styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

interface StyledDatePickerProps {
	theme?: Theme;
	invalid?: boolean;
}

export const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>(
	({ theme, invalid }) => ({
		'& .MuiInputBase-root': {
			height: '49Px',
			width: 'auto',
			borderRadius: '5px',
			backgroundColor: '#F2F4F6',
		},
		'& fieldset': {
			borderColor: invalid ? '#f00 !important':'#C2C2C2 !important',
		},
		[theme.breakpoints.down('sm')]: {},
	})
);
