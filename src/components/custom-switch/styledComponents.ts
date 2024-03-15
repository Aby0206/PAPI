import { styled } from '@mui/material/styles'

export const StyledFormControl = styled('div')(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    color: "var(--color-caption, #6E6D7A)",
    '&:input-label': {
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHight: "normal",
    },
    '&:switch-btn': {
        width: "50px",
        height: "25px",
        flexShrink: "0",
        borderRadius: "50px",
        color:"green",
        backgroundColor: "var(--color-secondary, #4ABD95)",
    },
    [theme.breakpoints.down('sm')]: {
        '&:input-label': {
            fontSize: 15,
            
        },
    }
}))