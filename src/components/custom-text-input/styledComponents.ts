import { styled } from '@mui/material/styles';
import { FormControl,FormHelperText } from '@mui/material';

interface CustomTextAreaProps {
	error: boolean;
}

export const StyledFormControl = styled(FormControl)(() => ({
	display: 'flex',
	width: '100%',
	height: 'auto',
	gap: 18,
	'& .text-count': {
		color: 'var(--color-body, #111215)',
		fontFamily: 'Inter',
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
	},
}));

export const StyledFormHelperText = styled(FormHelperText)(() => ({
	fontSize: '14px',
	lineHeight: 'normal',
	fontWeight: 400,
	margin: 0,
	maxLines:2,
	maxWidth:'300px'
}));

export const StyledInputLabel = styled('label')(({ theme }) => ({
	size: '16px',
	lineHeight: '19.36px',
	color: 'var(--color-caption, #6E6D7A)',
	fontFamily: 'Inter',
	fontSize: '16px',
	fontStyle: 'normal',
	fontWeight: '500',
	'& .right-label': {
		color: theme.palette.text.primary,
		fontSize: 16,
		fontWeight: 400,
		textDecoration: 'none',
	},
	[theme.breakpoints.down('xl')]: {
		//fontSize: 18
	},
}));

export const StyledTextArea = styled('textarea')<CustomTextAreaProps>(
	({ theme, error }) => ({
		height: '171px',
		padding: '12px',
		color: 'var(--color-body, #111215)',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 400,
		borderRadius: ' 5px',
		border: '1px solid ',
		borderColor: error ? 'red' : 'rgba(194, 194, 194, 1)',
		minwidth: '370px',
		font: 'inter',
		lineHeight: '26px',
		backgroundColor: 'rgba(242, 244, 246, 1)',
		resize: 'none',
		'::placeholder': {
			color: 'rgba(162, 162, 162, 1)',
		},

		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: error ? 'red' : 'rgba(194, 194, 194, 1)',
			}
		  },
		[theme.breakpoints.down('sm')]: {},
	})
);
