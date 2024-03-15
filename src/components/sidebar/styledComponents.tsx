import { styled } from '@mui/material/styles';

export const StyledSidebar = styled('div')<{ isSidebarOpen: boolean, isDrawerOpen: boolean }>(({ theme, isSidebarOpen, isDrawerOpen}) => ({
	transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-266px)', 
	transition: 'transform 1s ease-in-out', 
	top: 0,
	width: '100%',
	maxWidth: 266,
	height: '100%',
	maxHeight: '100vh',
	backgroundColor: '#1C1D22',
	zIndex:2000,

	'& .main-wrap': {
		display: 'flex',
		flexDirection: 'column',
		width: 266,
		height: '100%',
		maxHeight:"100vh",
		padding: 24,
		alignItems: 'flex-start',
		gap: 24,
	},
	'.sidebar-logo-wrap':{
	   display:'flex',
	   flexDirection: 'row',
	   
	},
	'& .divider': {
		height: 2,
		flexShrink: 0,
		alignSelf: 'stretch',
		borderRadius: 2,
		background: '#2D2F39',
	},
	'& .sidebar-logo': {
		flexShrink: 0,
		width: '180px',
			height: '44.587px',
	},
	'& .user-name':{
		color: '#4ABD95',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 600,
		lineHeight: '20px' /* 125% */,
		letterSpacing: -0.32,
	},
	'& .menu-wrap': {
		display: 'flex',
		flexDirection: 'column',
		// padding: '0px 12px',
		alignItems: 'flex-start',
		gap: 8,
		alignSelf: 'stretch',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			width: '5px',
		},
		'&::-webkit-scrollbar-track': {
			background: '#2D2F39',
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#4ABD95',
		},
	
	},
	
	'& .align-bottom': {
		position: 'flex',
		bottom: 0,
		marginBottom: 24,
	}, 
	'& .menu-title': {
		color: 'rgba(255, 255, 255, 0.50)',
		fontFamily: 'Inter',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: 500,
		textTransform: 'uppercase',
		
		'&.closed' : {
			display: 'none',
			opacity: 0
		},
		'&.open' : {
			color: 'rgba(255, 255, 255, 0.50)',
			fontFamily: 'Inter',
			fontSize: 14,
			fontStyle: 'normal',
			fontWeight: 500,
			textTransform: 'uppercase',
			opacity: 1,
			display: "block"
		}
		
	},

	'& .menu-items': {
		display: 'flex',
		padding: '10px 7px',
		alignItems: 'center',
		gap: 8,
		alignSelf: 'stretch',
		textDecoration:'none',
		// paddingLeft: isDrawerOpen? '10px' : '20px'
	},
	'& .menu-items-settings' : {
		display: 'flex',
		padding: '10px 7px',
		alignItems: 'center',
		gap: 12,
		alignSelf: 'stretch',
		textDecoration:'none',
		paddingLeft: isDrawerOpen? '10px' : '12px'
	},
	'& .main-arrow' :{
		marginLeft: '10px'
	},
	'& .select':{
		'&:hover':{
			pointer:"cursor",
			borderRadius:"8px",
			backgroundColor:"#2D2F39"
		}	
	},
	'& .bullet-icon':{
		position:"relative",
		bottom:"4px"
	},
	'& .sub-options':{
		position:"relative",
		left:"20px",
		'&:hover':{
			pointer:"cursor",
			
		}	
	},
	'& .menu-name': {
		color: 'rgba(255, 255, 255, 0.50)',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		fontHeight: 600,
		lineHeight: '20px' /* 125% */,
		letterSpacing: -0.32,
		display:isSidebarOpen ?'':'none'
	},

	'& .logout ': {
		color: '#4ABD95',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 600,
		lineHeight: '20px' /* 125% */,
		letterSpacing: -0.32,
	},
	"& .pointer":{
		cursor:"pointer"
	},
	[theme.breakpoints.down('md')]: {
		position: 'absolute',
		top: '92px',
		left: 0,
		width: '100%',
		height: 'calc(100vh - 92px)', 
		maxHeight: 'calc(100vh - 92px)',
		zIndex: 1000,
		transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', 
		
	},
	[theme.breakpoints.up('sm')]: {
		'& .user-name':{
			display:"none"
		}
	  },
	}));

	