import { styled } from '@mui/material/styles'
import CustomInput from '../../custom-input'
export const StyledBasicInfo = styled('div')(({ theme }) => ({
    width: "100%",
    minHeight: "100px",
    padding: "12px 12px 20px 12px",
    borderRadius: "5px",
    gap: "28px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    fontSize:"16px",
    color:"rgba(110, 109, 122, 1)",
    lineHeight:"19.36px",
    fontWeight:"500",

    "& .heading":{
        fontSize:"18px",
        fontWeight:"600",
        color:"rgba(17, 18, 21, 1)"
    },

    "& .card-title": {
        width: "100%",
        height: "56px",
        padding: "10px 12px 10px 12px",
        gap: "10px",
        background: "rgba(74, 189, 149, 0.20)",
        color: "#4ABD95",
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        fontSize: 18,

    },
    "& .container-box-3":{
        width:"75%",
        // height: "78px",
        // gap: "33px",
        // display:"flex",
    },
    "& .container-item":{
        width: "auto",
        minHeight: "78px",
        gap: "10px",
        display:"flex",
        flexDirection:"column",
        
    },
    "& .half-container":{
        width:"50%",
        display:"flex",
        flexDirection:"column",
        gap:15
    },

    "& .input-container": {
        width: "auto",
        height: "78px",
        gap: "33px",
        display: "flex",

    },
    
    "& .input-caption": {
        flex:1,
        width: "auto",
        color: "rgba(110, 109, 122, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    "& .input-currency": {
        // flex:1,
        width: "25%",
        color: "rgba(110, 109, 122, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    "& .input-date": {
        // flex:1,
        width: "35%",
        color: "rgba(110, 109, 122, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    "& .input-caption1": {
        // flex:1,
        width: "50%",
        color: "rgba(110, 109, 122, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    "& .input-field": {

        width: "100%",
        height: "49px",
        padding: "15px 12px 15px 12px",
        borderRadius: "5px",
        border: "1px",
        gap: "10px",
        backgroundColor: "rgba(242, 244, 246, 1)",
    },

    "& .url": {
        flex:1,
        width: "auto",
        color: "rgba(110, 109, 122, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    ".MuiFormControl-root":{
       width: "100%"
    },
    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledCustomInput = styled( CustomInput)(({ theme }) => ({
    width: "100%",
    height: "49px",
    padding: "15px 12px 15px 12px",
    borderRadius: "5px",
    border: "1px",
    gap: "10px",
    backgroundColor: "rgba(242, 244, 246, 1)",



    [theme.breakpoints.down('sm')]: {

    }
}))