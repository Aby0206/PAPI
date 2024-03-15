import { styled } from '@mui/material/styles'
import { FormControl, TextField ,FormHelperText} from '@mui/material'

interface CustomInputLabelProps {
  error: boolean
}

export const StyledFormControl = styled(FormControl)(({theme}) => ({
  width: '100%',
  display:"flex",
  gap:"10px",
  justifyContent:"space-between",
  [theme.breakpoints.down('sm')]: {
		fontSize:13
	  },
}))

export const StyledFormHelperText = styled(FormHelperText)(({theme}) => ({
  width: '100%',
  fontSize:"13.5px",
  display:"flex",
  alignItems:"Center",
  marginLeft:5,
  fontWeight:400,
  marginTop:0,
  
  [theme.breakpoints.down('sm')]: {
		fontSize:11
	  },
}))

export const StyledTextField = styled(TextField)<CustomInputLabelProps>(({ theme, error,disabled }) => ({
  backgroundColor:disabled?"#D7D7D7": "#F2F4F6",
  '& .MuiOutlinedInput-root': {
    height:"49px",
    padding:"15px, 12px, 15px, 12px",
    
    '& fieldset': {
      borderColor: error ? theme.palette.error.main : "#C2C2C2",
      borderRadius: 5,
      borderWidth: 1,
    
    },
    '&:hover fieldset': {
      borderColor: error ? theme.palette.error.main : "#C2C2C2",
    },
    '&.Mui-focused fieldset': {
    }
  },
  
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root':{
      fontSize:13
    }
  },
}))


