import { styled } from '@mui/material/styles';

export const StyledSkills = styled('div')(({ theme }) => ({
	width: 'auto',
	height: '49px',
	gap: '33px',
	display: 'flex',
	'& .input-field': {
		color: '#A2A2A2',
		fontSize: '16px',
		width: 'auto',
		height: '49px',
		padding: '15px 12px 15px 12px',
		borderRadius: '5px',
		border: '1px solid',
		gap: '10px',
		backgroundColor: 'rgba(242, 244, 246, 1)',
	},
	'&.hide-labels': {
		'& .input-label': {
			opacity: 0,
			pointerEvents: 'none',
		},
	},
	".MuiFormControl-root":{
		flex: 1
	 },

	[theme.breakpoints.down('sm')]: {},
}));

export const StyledButton = styled('button')(({ theme }) => ({
	width: '50px',
	height: '50px',
	borderRadius: '5px',
	gap: '10px',
	backgroundColor: 'rgba(74, 189, 149, 0.2)',
	border: 'none',
	cursor: 'pointer',
	marginTop: '28px',
	[theme.breakpoints.down('sm')]: {},

	'&.hide-button': {
		opacity: 0,
		pointerEvents: 'none',
	},
}));
