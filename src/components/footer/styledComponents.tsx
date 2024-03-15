import { styled } from '@mui/material/styles'
import { Link } from "react-router-dom";

interface FooterProps {
    layout: 'onboarding' |'dashboard';
  }

export const StyledFooter = styled('div')<FooterProps>(({ theme,layout }) => ({
    position:"absolute",
    bottom:0,
    right:0,
    width:"100%",
    paddingLeft:layout==="onboarding"?0:266, //sidebar width
    paddingTop:layout==="onboarding"?20:41,
    paddingBottom:layout==="onboarding"?49:0,
    height:layout==="onboarding"?88:81,
    display:"flex",
    gap:118,
    justifyContent:"center",
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    color:"#6E6D7A",
    "& .footer-links":{
        display:"flex",
        alignItems:"center",
        "& .seperator":{
            width: '1px',
            height: '23px',
            backgroundColor: '#C2C2C2',
            marginLeft:28,
            marginRight:28
        }
    },

    [theme.breakpoints.down('sm')]: {
        position:"relative",
        bottom:"-65px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:20,
        fontSize: 14,
        padding:"20px",
        '& .rights':{
        },
        "& .footer-links": {
        }
    }
}))

export const CustomLink = styled(Link)(({ theme }) => ({
    color: '#4ABD95',
    textDecoration: 'none',
  }));


