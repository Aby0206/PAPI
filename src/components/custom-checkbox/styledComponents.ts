import { styled } from '@mui/material/styles'

export const StyledCheckbox = styled('div')(({ theme }) => ({
    minWidth: "150px",
    height: "59px",
    gap: "21px",
    display:"flex",
    flexDirection:"column",
    fontWeight:500,
    color:"rgba(17, 18, 21, 1)",
    fontSize:"16px",
    "& .wrap-box":{
    minWidth:"150px",
     height:"19px",
     display:"flex",
     gap:"21px"
    },      
    "& .label":{
     display:"flex",
     gap:"12px",
},   
    
   [theme.breakpoints.down('sm')]: {
    fontSize:13,
    }
   
}))

export const StyledInput = styled('input')(({ theme }) => ({
    width: "18px",
    height: "18px",
    borderRadius: "12px",
    cursor:"pointer",
    '&:checked': {
        border: "none",
        accentColor:"rgba(74, 189, 149, 1)",
        color:"white",
        // backgroundColor:"#fff"
        // accentColor:"red",
        // backgroundColor:"red",
    },
    [theme.breakpoints.down('sm')]: {
    
    }
}))
