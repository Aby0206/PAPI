import { styled } from '@mui/material/styles';
import { FormControl, Select, TextField } from '@mui/material';

interface CustomInputLabelProps {
	error: boolean;
}

export const StyledTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		border: 'none',
	},
	'& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
		{
			'-webkit-appearance': 'none',
			margin: 0,
		},
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
	minHeight: '78px',
	gap: '10px',
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.down('sm')]: {
    fontSize:13
  },
}));

export const StyledSelect = styled(Select)<CustomInputLabelProps>(
	({ theme, error }) => ({
		width: '370px',
		height: '49px',
		padding: '15px 12px 15px 12px',
		borderRadius: '5px',
		gap: '12px',
		backgroundColor: 'rgba(242, 244, 246, 1)',
		fontSize: '16px',
		lineHeight: '19.36px',
		color: 'rgba(162, 162, 162, 1)',
		fontWeight: '400',
		display: 'flex',
		alignItems: 'center',
		borderColor: error ? 'red' : '',
		'& .MuiMenu-paper': {
			maxHeight: '500px',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			fontSize: '13px',
		},
	})
);
