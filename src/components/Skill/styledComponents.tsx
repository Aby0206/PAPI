import { styled } from '@mui/material/styles'

export const StyledSkills = styled('div')(({ theme }) => ({
    width: "100%",
    minHeight: "395px",
    padding: "12px 12px 20px 12px",
    borderRadius: "5px",
    gap: "25px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",


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

    "& .heading":{
        width:"100%",
        height: "90px",
        gap: "33px",
        display:"flex",
        color:"rgba(110, 109, 122, 1)",
        fontSize:"16px",
    },

    
    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledHeader = styled('div')(({ theme }) => ({
    width:" 1,499px",
    height: "19px",
    gap: "33px",
    display:"flex",
    color:"rgba(110, 109, 122, 1)",
    fontSize:"16px",

    "& .container":{
        width: "350px",
        height: "19px",
        gap: "10px",

    },
   [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledAddSkills = styled('div')(({ theme }) => ({
    width: "146px",
    height: "30px",
    gap: "10px",
    // backgroundColor:"cyan",
    display:"flex",
    alignItems:"center",

    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledAddButton =styled('button')(({ theme }) => ({
    minwidth: "146px",
    maxWidth:"211px",
    fontSize:"16px",
    height: "30px",
    padding: "5px",
    borderRadius: "100px",
    border:"none",
    display:"flex",
    alignItems:"center",
    backgroundColor:"#ffff",
    fontWeight:"500",
    marginTop:"25px",
    cursor:"pointer",
    gap:"10px",
    "& .Add-icon":{
        backgroundColor:"rgba(74, 189, 149, 1)",
        borderRadius:"100%",
    },

    [theme.breakpoints.down('sm')]: {

    }
}))