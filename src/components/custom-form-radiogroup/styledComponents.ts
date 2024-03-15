import { styled } from '@mui/material/styles'
import { Radio } from '@mui/material'

export const StyledRadio=styled(Radio)(({ theme }) => ({
    "&, &.Mui-checked":{color:"#4ABD95"},
    [theme.breakpoints.down('sm')]: {

    }
}))

