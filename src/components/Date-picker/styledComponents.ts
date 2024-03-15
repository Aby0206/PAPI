import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers'



export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    "& .MuiInputBase-root":{
        height:"49Px",
        width:"370px",
        borderRadius:"5px",
        backgroundColor:"#F2F4F6"
    },
    [theme.breakpoints.down('sm')]: {
    }
    }))
    
    