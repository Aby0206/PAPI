import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
	display: 'inline-flex',
	padding: ' 28px 27px',
	flexDirection: 'column',
	alignItems: ' flex-start',
	gap: ' 20px',
	background: ' #FFF',
	boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.15)',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	
	p: '4',
	'& .card-title': {
		display: 'flex',
		justifyContent: 'space-between',
		gap: '146px',
		width: '100%',
		textAlign: 'center',
		fontFamily: 'Inter',
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: 500,
	},
	'& .divider': {
		height: 1,
		flexShrink: 0,
		alignSelf: 'stretch',
		borderRadius: 1,
		background: '#E7E7E9',
	},
	'& .card-heading': {
		display: 'flex',
		alignItems: 'flex-end',
		width: '199px',
		color: 'var(--color-text, #0D0C22)',
		fontFeatureSettings: "'cv11' on, 'cv01' on, 'ss01' on",
		fontFamily: 'Inter',
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 'normal',
	},
	'& .card-icon': {
		width: '25px',
		height: '25px',
	},
  '& .warning-text':{
    color: 'var(--color-feilds, #A2A2A2)',
    fontFamily: 'Inter',
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
  },
  '& .text-count':{
    color: 'var(--color-body, #111215)',
    fontFamily: 'Inter',
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
  },
	'& .custom-buttons': {
		display: 'flex',
		alignItems: 'center',
		gap: '28px',
		color: 'var(--color-caption, #6E6D7A)',
		textAlign: 'left',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 'normal',
		fontColor: 'var(--color-error, #B3261E)',
	},
	'& .btn-wrap': {
		width: '206px',
		Height: '49px',
		display: 'flex',
		gap: '26px',
		'& .btn': {
			width: '94px',
			height: '49px',
			padding: '15px 20px',
			border: 'none',
			borderRadius: '5px',
			cursor: 'pointer',
		},
		'& .cancel': {
			color: '#4ABD95',
			backgroundColor: '#fff',
			border: '1px solid #4ABD95',
		},
		'& .update': {
			color: '#fff',
			backgroundColor: '#4ABD95',
		},
	},
	[theme.breakpoints.down('sm')]: {

		  'width': '90%'
	},
}));
export const StyledDialogue = styled('div')(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {},
}));
