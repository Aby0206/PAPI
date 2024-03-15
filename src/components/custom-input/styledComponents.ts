import { styled } from '@mui/material/styles'
import { FormControl, TextField ,FormHelperText} from '@mui/material'

interface CustomInputLabelProps {
  error: boolean
}

export const StyledFormControl = styled(FormControl)(() => ({
  width: '100%'
}))

export const StyledFormHelperText = styled(FormHelperText)(() => ({
  width: '100%',
  height:37
}))

export const StyledInputLabel = styled('label')<CustomInputLabelProps>(({ theme, error }) => ({
  width: '100%',
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 12,
  lineHeight: "normal",
  color: error ? theme.palette.error.main : theme.palette.text.primary,
  display:"flex",
  alignItems:"center",
  justifyContent:"space-between",
  "& .right-label":{
    color:theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 400,
    textDecoration:"none"
  },
  [theme.breakpoints.down('xl')]: {
    //fontSize: 18
  }
}))

export const StyledTextField = styled(TextField)<CustomInputLabelProps>(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    borderColor: error ? theme.palette.error.main : "#C2C2C2",
    '& fieldset': {
      borderColor: error ? theme.palette.error.main : "#C2C2C2",
      borderRadius: 5,
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: error ? theme.palette.error.main : "#C2C2C2",
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? theme.palette.error.main : "#C2C2C2",
    }
  },
  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  }
}))
