import { styled } from '@mui/material/styles'

export const StyledButton = styled('button')(({ theme }) => ({
    width: "auto",
    display: "flex",
    fontWeight: 500,
    padding: "8px",
    gap: "3px",
    alignItems: "center",
    borderRadius: "5px",
    background: "var(--color-secondary, #4ABD95)",
    color: "white",
    fontSize: "16px",
    border: "none",
    margin: "0 0 0 auto",
    '&. icon-edit': {
        width: "80px",
        height: "40px"
    },
    '&. icon-delete': {
        width: "20px",
        height: "20px"
    },
    '&. button-text': {
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontweight: "500",
        lineHeight: "normal",
    },
    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width:'100%',
    }
}))