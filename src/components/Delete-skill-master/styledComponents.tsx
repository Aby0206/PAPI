import { styled } from '@mui/material/styles'
import { Box } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "574px",
    padding: "28px 27px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.15)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: "4",
    " & .divider": {
        width: "100%",
        height: 1,
        backgroundColor: "#E7E7E9"
        

    },
    "& .card-header": {
        width:"100%",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        flexDirection: "column",
    },
    "& .card-title": {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        color: "var(--color-text, #0D0C22)",
        fontFeatureSettings: "'cv11' on, 'cv01' on, 'ss01' on",
        fontFamily: "Inter",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
        width: "100%"

    },
    "& .content-container": {
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
    },

    "& .card-container": {
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",

    },
    "& .checkbox-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    },
    "& .select-text": {
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        width: "370px",
        color: "var(--color-caption, #6E6D7A)",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHight: "normal",

    },
    "& .card-icon": {
        width: "25px",
        height: "25px"
    },

    "& .btn_wrap": {
        display: "flex",
        alignItems: "center",
        gap: "28px", 
    },
    [theme.breakpoints.down('sm')]: {
        width: '75%',
        gap: "10px",
        "& .select-text": {
            width: "auto",
            fontSize: "14px",
    
        },
    }
}))
