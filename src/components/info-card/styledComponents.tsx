import { styled } from '@mui/material/styles'

export const StyledInfoCard = styled('div')(({ theme }) => ({
    width:"100%",
    backgroundColor:"#FFFFFF",
    borderRadius:5,
    padding:12,
    "& .card-title":{
        width:"100%",
        height:56,
        background: "rgba(74, 189, 149, 0.20)",
        display: "flex",
        padding: "10px 12px",
        alignItems: "center",
        fontWeight:600,
        fontSize:18,
        color:"#4ABD95"
    },
    "& .card-item":{
        height:50,
        width:"100%",
        padding: "16px 12px",
        display:"flex",
        alignItems:"center",
        fontSize:16,
        fontWeight:400,
        color:"#111215",
    },
    "& .row-name":{
        color:"#6E6D7A",
        minWidth:230,
    },
    " & .divider":{
        width:"100%",
        height:1,
        backgroundColor:"#E7E7E9"
    },
    [theme.breakpoints.down('sm')]: {
        "& .card-title":{
            fontSize:16,
        },
        "& .card-item":{
            fontSize:14,
            justifyContent:'space-between'
        },
        "& .row-name":{
            minWidth:100,
        },
    }
}))

export const CustomLink = styled('a')(({ theme }) => ({
    color: '#4ABD95',
    textDecoration: 'none',
  }));