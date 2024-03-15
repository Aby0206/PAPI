import { styled } from '@mui/material/styles'



export const StyledNoListFound = styled('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    padding: "12px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "5px",
    background: "#FFF",
    '& .content': {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
    },
    '& .content-img': {
        width: "125.056px",
        height: "101.609px"
    },
    '& .content-text': {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    },
    '& .content-primary-text': {
        color: "var(--color-text, #0D0C22)",
        fontfamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "normal"
    },
    '& .content-secondary-text': {
        color: "var(--color-caption, #6E6D7A)",
        fontFamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal"
    },

    [theme.breakpoints.down('sm')]: {

    },
}))
