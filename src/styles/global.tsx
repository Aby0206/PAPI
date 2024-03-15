import { Theme } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Dialog, Box} from '@mui/material';

interface StyledButtonProps {
	theme?: Theme;
	isLoading?: boolean;
}

export const StyledList = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	padding: '12px',
	flexDirection: 'column',
	alignItems: 'flex-end',
	borderRadius: '5px',
	background: '#FFF',
	'& .heading': {
		display: 'flex',
		width: '100%',
		height: '56px',
		padding: '10px 12px',
		alignItems: 'center',
		gap: '10px',
		background: 'rgba(74, 189, 149, 0.20)',
		color: ' var(--color-secondary, #4ABD95)',
		leadingTrim: 'both',
		textEdge: 'cap',
		fontFeatureSettings: " 'clig' off, 'liga' off",
		fontFamily: 'Inter',
		fontSize: '18px',
		fontStyle: 'normal',
		fontWeight: '600',
		lineHeight: 'normal',
		'&.space-between': {
			justifyContent: 'space-between',
		},
	},
	'& .head-row': {
		borderBottom:"1px solid #E7E7E9"
	},
	'& .field-title': {
		flexShrink: '0',
		height:'auto',
		color: 'var(--color- text, #0D0C22)',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		borderBottom:"1px solid #E7E7E9",
		fontWeight: 600,
		lineHeight: 'normal',
		'&.content': {
			color: 'var(--color-body, #111215)',
			fontWeight: 400,
		},
	},
	'& .content-row': {
		borderBottom:"1px solid #E7E7E9",
	},
	'& .space-between': {
        display:"flex",
		justifyContent:"space-between"
	},
	'& .pagination-wrap': {
		marginTop: '20px',
	},
	'.rating': {
		display: 'flex',
		flexDirection: 'row',
		gap: 3,
		alignItems: 'center',
	},
	'.update': {
		display: 'flex',
		gap: 30,
		alignItems: 'center',
	},
	" & .divider":{
        width:"1500px",
        height:1,
        backgroundColor:"#E7E7E9"
    },

	[theme.breakpoints.down('sm')]: {
		'.head-row': {
			display: 'none',
		},
		'.table': {
			display: 'block',
		},
		'.heading': {
			fontSize: 16,
		},
		'.table-body': {
			display: 'block',
		},
		'& .content-row': {
			padding: '0',
			display: 'flex',
			flexDirection: 'column',
			'.wrap': {
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
			},
		},
		'& .field-title': {
			'&.content': {
				fontSize: 14,
				leadingTrim: 'both',
				border:0
			},
		},
		'.update': {
			display: 'flex',
			gap: 10,
			justifyContent: 'flex-end',
		},
	},
}));

export const StyledButton = styled('button')<StyledButtonProps>(
	({ theme, isLoading }) => ({
		color: '#fff',
		height: '100%',
		padding: '15px 20px',
		borderRadius: '5px',
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		backgroundColor: isLoading
			? 'rgba(165, 222, 202, 1)'
			: 'rgba(74, 189, 149, 1)',
		border: 'none',
		cursor: 'pointer',
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {},
	})
);

export const StyledDialog = styled(Dialog)(({ theme }) => ({
	'.MuiPaper-root': {
		position: 'fixed',
		display: 'flex',
		gap: '19px',
		top: '48px',
		right: -31,
		height: '100%',
		padding: '30px 20px',
	},
	'& .divider': {
		height: 1,
		flexShrink: 0,
		alignSelf: 'stretch',
		borderRadius: 1,
		background: '#E7E7E9',
	},
	'& .title': {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '20px',
		display: 'flex',
		justifyContent: 'space-between',
		height: '25px',
		'& .close-btn': {
			backgroundColor: 'transparent',
			border: 'none',
			cursor: 'pointer',
		},
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
		'& .reset': {
			color: '#4ABD95',
			backgroundColor: '#fff',
			border: '1px solid #4ABD95',
		},
		'& .search': {
			color: '#fff',
			backgroundColor: '#4ABD95',
		},
	},
	[theme.breakpoints.down('sm')]: {
		'.MuiPaper-root': {
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			height: 'auto',
			margin: '0 auto',
			width: '75%',
		},
		'& .title': {
			fontSize: '17px',
		},
	},
}));

export const StyledFieldLabel = styled('label')(({ theme }) => ({
	color: 'var(--color-caption, #6E6D7A)',
	fontFamily: 'Inter',
	justifyContent: 'flex-start',
	fontSize: '16px',
	fontStyle: 'normal',
	fontWeight: '500',
	lineHight: 'normal',
	[theme.breakpoints.down('sm')]: {
		fontSize: 13,
	},
}));

export const StyledLabel = styled('label')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down('sm')]: {
		display: 'inline-block',
		fontSize: 14,
		fontWeight: 400,
		color: '#6E6D7A',
	},
}));

export const StyledButtonsWrapper = styled('div')(({ theme }) => ({
	width: 'auto',
	maxHeight: '49px',
	display: 'flex',
	gap: '26px',
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		alignItems: 'center',
	},
}));

export const StyledBox = styled(Box)(({ theme }) => ({
	display: 'inline-flex',
	padding: ' 28px 27px',
	flexDirection: 'column',
	gap: ' 20px',
	width: '420px',
	background: ' #FFF',
	boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.15)',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	p: '4',
	'&.top-fixed': {
		transform: 'translate(-50%, -250px)',
	},
	'& .card-title': {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		color: 'var(--color-text, #0D0C22)',
		fontFeatureSettings: "'cv11' on, 'cv01' on, 'ss01' on",
		fontFamily: 'Inter',
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 'normal',
		width: '100%',
	},
	'& .card-header': {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '12px',
		flexDirection: 'column',
		width: '100%',
	},
	' & .divider': {
		width: '100%',
		height: 1,
		backgroundColor: '#E7E7E9',
	},

	'& .card-icon': {
		width: '25px',
		height: '25px',
	},
	'& .css-1dwdrxd': {
		gap: 0,
		height: 'auto',
	},
	[theme.breakpoints.down('sm')]: {
		padding: '22px 21px',
		width: '75%',
		gap: '10px',

		'& .card-title': {
			fontSize: '16px',
		},
		'& .card-icon': {
			width: '23px',
			height: '23px',
		},
	},
}));
