import { styled } from '@mui/material/styles'
import { Radio } from '@mui/material'

export const StyledWork = styled('div')(({ theme }) => ({
    width: "100%",
    height: "1246px",
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

    "& .container-box":{
        width:"100%",
        height: "78px",
        gap: "33px",
        display:"flex",
    },
    
    "& .container-box-1":{
        width:"100%",
        height: "78px",
        gap: "43px",
        display:"flex",
    },
    "& .container-box-2":{
        width:'calc(50% - 16.5px)',
        height: "78px",
        gap: "33px",
        display:"flex",
        
    },
    "& .container-box-3":{
        width:"75%",
        height: "78px",
        gap: "33px",
        display:"flex",
    },

    "& .container-item":{
        width: "auto",
        minHeight: "78px",
        gap: "10px",
        display:"flex",
        flexDirection:"column",
        
    },
    "& .container-item-1":{
        width: "auto",
        minHeight: "78px",
        gap: "10px",
        display:"flex",
        flex:1,
        flexDirection:"column",
        
    },

    "& .input-field": {

        width: '350px',
        height: "49px",
        padding: "15px 12px 15px 12px",
        borderRadius: "5px",
        border: "1px",
        gap: "10px",
        backgroundColor: "rgba(242, 244, 246, 1)",
    },
    

    "& .radiobtn":{
        width:"805px",
        height: "20px",
        gap: "28px",
        display:"flex",
        fontSize:"16px",
        fontWeight: "500",
        lineHeight: "19px",
        textAlign:"left",
        color:"rgba(17, 18, 21, 1)",
        backgroundColor:"cyan",
    },

    "& .heading":{
        width:"123px",
        height:"13px",
        fontSize:"18px",
        fontWeight:"600",
        color:"rgba(17, 18, 21, 1)"
    },
    "& .checkbox-container":{
        width: "30%",
        minWidth:'450px',
        height: "78px",
        display:"flex",
        gap: "50px",
        //marginTop:'48px'
            // backgroundColor:"cyan",
    },
    '& .button-container':{
        width: "280px",
        height: "49px",
        display:"flex",
        gap: "28px"

    },
    '& .addcontractor-btn':{
        color:"white",
        backgroundColor:"#4ABD95",
        width: "159px",
        height: "49px",
        padding: "15px 20px 15px 20px",
        borderRadius: "5px",
        border:"none"
    },
    '& .cancel-btn':{
        width: "93px",
        height: "49px",
        padding: "15px 20px 15px 20px",
        borderRadius: "5px",
        border: "1px solid #4ABD95",
        backgroundColor:"white",
        color:"#4ABD95",

    },
    '& .upload-container':{
        width:'auto',
        height:"284px",
        display:"grid",
        gridTemplateColumns: "1fr 1fr",
        gap:"35px",
        justifyContent:"space-between",
    },
    ".MuiFormControl-root":{
		flex: 1
	 },
     
    [theme.breakpoints.down('sm')]: {

    }
}))


export const StyledWorkMode = styled('div')(({ theme }) => ({
    width:"100%",
    height: "20px",
    gap: "28px",
    display:"flex",
    fontSize:"16px",
    fontWeight: "500",
    lineHeight: "19px",
    textAlign:"left",
    alignItems: 'center',

    "& .title":{
        color:"rgba(17, 18, 21, 1)",

    },
    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledTextArea=styled('textarea')(({ theme }) => ({
    width:'773px',
    maxWidth: "773px",
    height: "121px",
    padding: "12px",
    fontSize:"16px",
    borderRadius:" 5px",
    border: "1px solid rgba(194, 194, 194, 1)",
    gap: "10px",
    font:"inter",
    backgroundColor:"rgba(242, 244, 246, 1)",
    color:"rgba(162, 162, 162, 1)",
    resize:"none",
    "::placeholder":{
        color:"rgba(162, 162, 162, 1)",
    },
    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledRadio=styled(Radio)(({ theme }) => ({
    "&, &.Mui-checked":{color:"#4ABD95"},
    [theme.breakpoints.down('sm')]: {

    }
}))


