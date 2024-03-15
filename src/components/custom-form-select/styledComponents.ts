import { styled } from '@mui/material/styles';
import { FormControl, Select, TextField,FormHelperText } from '@mui/material';

interface CustomInputLabelProps {
	error: boolean;
}
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
	width: "100%",
	flex:1,
	height: 'auto',
	gap: '10px',
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.down('sm')]: {
		fontSize:13
	  },
}));

export const StyledSelect = styled(Select)<CustomInputLabelProps>(
	({ theme, error }) => ({
		width: 'auto',
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
			fontSize: '13px',
		},
	})
);

export const StyledTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		border: 'none',
	},
	'& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
		{
			'-webkit-appearance': 'none',
			margin: 0,
		},
		[theme.breakpoints.down('sm')]: {
			fontSize:13
		  },
}));
export const StyledResultNotFound = styled('label')(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
	color: 'grey',
  fontSize:'12px'
}));
export const StyledFormHelperText = styled(FormHelperText)(({theme}) => ({
	width: '100%',
  fontSize:"13.5px",
  lineHeight:"1.94px",
  display:"flex",
  alignItems:"Center",
  marginLeft:5,
  fontWeight:400,
  marginTop:0,
  [theme.breakpoints.down('sm')]: {
	fontSize:11
  },
  
  }))
