import { styled } from '@mui/material/styles';
import profileImg from '../../assets/images/profile-bg.png';

export const StyledProfileCard = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	padding: '5px 5px 18px 5px',
	borderRadius: 5,
	backgroundColor: '#FFFFFF',

	'& .bg-div': {
		paddingTop: 105,
		width: '100%',
		flex: 1,
		backgroundImage: `url(${profileImg})`,
	},
	'& .bottom-container': {
		width: '100%',
		flex: 1,
		paddingLeft: 17,
		paddingRight: 14,
		display: 'flex',
		flexDirection: 'column',

		'& .profilepic-container': {
			marginTop: -84.5,
			borderRadius: '50%',
			' .status': {
				width: '20px',
				height: '20px',
				border: '4px solid white',
				borderRadius: '50%',
				'&.active': {
					backgroundColor: 'green',
				},
				'&.inactive': {
					backgroundColor: 'red',
				},
				'&.white': {
					backgroundColor: 'green',
				},
			},
		},
		'& .profile-picture': {
			width: 122,
			height: 122,
			border: '3px solid white',
			borderRadius: '50%',
		},
		'& .employee-name': {
			marginTop: 17,
			fontSize: 18,
			fontWeight: 600,
			color: '#111215',
		},
		'& .other-info': {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			marginTop: 23,
			fontSize: 16,
			fontWeight: 400,
			color: '#6E6D7A',
			gap: 25,
		},
		'& .info-wrap': {
			display: 'flex',
			gap: '10px',
			alignItems: 'flex-start',
		},
	},

	[theme.breakpoints.down('sm')]: {
		'& .bg-div': {
			paddingTop: 75,
		},
		'& .info-wrap': {
			flexDirection: 'column',
			gap: 20,
			fontSize: 15,
		},
		'& .bottom-container': {
			'& .profile-picture': {
				width: 90,
				height: 90,
				border: '3px solid #FFF',
			},
			'& .profilepic-container': {
				marginTop: -54.5,
			},
			'& .employee-name': {
				marginTop: 10,
				fontSize: 16.5,
			},
			'& .other-info': {
				marginTop: 15,
			},
		},
	},
}));
export const StyledButton = styled('button')(({ theme }) => ({
	display: 'flex',
	width: '40px',
	height: '40px',
	padding: '8px 7px 7px 8px',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '100px',
	background: 'var(--color-secondary, #4ABD95)',

	'& .edit-icon': {
		width: '25px',
		height: '25px',
		flexShrink: '0',
	},
	[theme.breakpoints.down('sm')]: {
		width: '30px',
		height: '30px',
		'& .edit-icon': {
			width: '15px',
			height: '15px',
			flexShrink: '0',
		},
	},
}));
