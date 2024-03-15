import { styled, Theme} from '@mui/material/styles';
import { FormHelperText} from '@mui/material'
interface StyledFileContainerProps {
	theme?: Theme;
	invalid?: boolean;
}

export const StyledUpload = styled('div')<StyledFileContainerProps>(
	({ theme, invalid }) => ({
		height: '49px',
		width:'auto',
		padding: '0px 0px 0px 12px',
		borderRadius: '5px',
		gap: '12px',
		display: 'flex',
		backgroundColor: 'rgba(242, 244, 246, 1)',
		alignItems: 'center',
		border: '1px solid',
		borderColor: invalid ? 'red' : '#C2C2C2',
		fontSize: '16px',
		justifyContent: 'space-between',
		marginTop: '12px',
		position: 'relative',

		'.button': {
			width: '150px',
			height: '49px',
			padding: ' 15px 31px 15px 32px',
			borderRadius: '0px 5px 5px 0px',
			border: 'none',
			backgroundColor: 'rgba(74, 189, 149, 1)',
			color: 'rgba(255, 255, 255, 1)',
		},
		'.file-name': {
			width: 'auto',
			height: '19px',
			gap: '10px',
			color: 'rgba(162, 162, 162, 1)',
			
		},
		'.file-limit-message': {
			color: '#A2A2A2',
			fontSize: '14px',
			fontWeight: '400',
			wordWrap: 'break-word',
		},
		'.file-input': {
			opacity: 0,
			position: 'absolute',
			inset: 0,
		},
		a: {
			textDecoration: 'underline',
		},
		[theme.breakpoints.down('sm')]: {},
	})
);

export const StyledButton = styled('button')(({ theme }) => ({
	width: '150px',
	height: '49px',
	padding: ' 15px 31px 15px 32px',
	borderRadius: '0px 5px 5px 0px',
	border: 'none',
	backgroundColor: 'rgba(74, 189, 149, 1)',
	color: 'rgba(255, 255, 255, 1)',
	cursor: 'pointer',
	position: 'relative',
}));
export const StyledInputLabel = styled('label')(({ theme }) => ({
	lineHeight: '19.36px',
	color: '#C2C2C2',
	//color: theme.palette.text.primary,
	fontSize: 13,
	fontWeight: 400,

	[theme.breakpoints.down('xl')]: {
		//fontSize: 18
	},
}));

export const StyledFormHelperText = styled(FormHelperText)(() => ({
	
	height:10,
	fontSize:"13.5px",
	lineHeight:"1.94px",
	display:"flex",
	alignItems:"center",
	fontWeight:400
  }))
  
