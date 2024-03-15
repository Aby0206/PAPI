import { styled } from '@mui/material/styles'
import { Button } from "@mui/material";

export const StyledLoginpage = styled('div')(({ theme }) => ({
    width:"100%",
    maxWidth:640,
    height:"auto",
    padding:"53px 40px",
    backgroundColor:"#FFFFFF",
    boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.05)",
    borderRadius:20,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    "& .login-label":{
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
        marginTop:42,
        marginBottom:50,
        color:"#0D0C22"
    },
    "& .signin-email":{
        width:"100%",
        marginTop:45,
        marginBottom:45,
        fontSize: 16,
        fontWeight: 400,
        color:"#6E6D7A",
        display:"flex",
        alignItems:"center",
        gap:20
    },
    "& .line":{
        height:1,
        width:"20px",
        flex:1,
        background: "#E7E7E9"
    },
    [theme.breakpoints.down('sm')]: {
        position:"relative",
        top:"-30px",
        padding: "40px 25px",
        "& .login-label": {
            fontSize: 18,
            marginTop: 23,
            marginBottom: 40,
        },
        "& .signin-email": {
            marginTop: 25,
            marginBottom: 35,
            fontSize: 14,
        },
        '& .pswd-div':{
            position:"relative",
            top:"-15px"

        },
    },
    [theme.breakpoints.down('xs')]: {
        padding: "30px 20px",
        "& .login-label": {
            fontSize: 18,
            marginTop: 25,
            marginBottom: 30,
        },
        "& .signin-email": {
            marginTop: 30,
            marginBottom: 30,
            fontSize: 12,
        }
    }
}))

export const StyledGoogleBtn = styled(Button)(({ theme }) => ({
    background:"transparent",
    width:"100%",
    height:67,
    borderRadius: 5,
    border: "1px solid #C2C2C2",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:10,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    color:"#0D0C22",
    textTransform:"capitalize",
    "&:hover":{
        background:"transparent",
    },
    [theme.breakpoints.down('sm')]: {
        height: 55,
        fontSize: 18,
        marginTop:-7,
    },

    [theme.breakpoints.down('xs')]: {
        height: 50,
        fontSize: 16,
    }
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    width:"100%",
    height:68,
    background: "#0D0C22",
    color:"#FFFFFF",
    borderRadius:5,
    gap:10,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    textTransform:"capitalize",
    "&:hover":{
        background: "#0D0C22",
    },
    "&:disabled": {
        background: "#232121",
        color: "#787878",
        cursor: "not-allowed",
      },
    [theme.breakpoints.down('sm')]: {
        position:"relative",
        top:"-18px",
        height: 55,
        fontSize: 18,
    },

    [theme.breakpoints.down('xs')]: {
        position:"relative",
        top:"-18px",
        height: 50,
        fontSize: 16,
    }
}))

export const StyledErrorDiv = styled('div')(({ theme }) => ({
    width:"100%",
    maxWidth:640,
    height:"auto",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    color:"red",
    marginTop:10,
    [theme.breakpoints.down('sm')]: {
        
    }
}))