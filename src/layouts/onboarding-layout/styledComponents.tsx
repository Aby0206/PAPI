import { styled } from '@mui/material/styles'
import bgImage from "../../assets/images/onboarding-bg.png"

export const StyledOnboardingLayout = styled('div')(({ theme }) => ({
    position:"relative",
    width:"100%",
    height:"auto",
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    paddingBottom:88,//footer height
    backgroundColor:"#EEE",
    "& .main-container":{
        width:"100%",
        height:"100%",
    },
    "& .top-container":{
        width:"100%",
        height:"auto",
        //minHeight:500,
        backgroundColor:"transparent",
        marginTop:"-820px",
        zIndex:1999,
        position:"relative",
        display:"flex",
        justifyContent:"center"
    },
    [theme.breakpoints.down('sm')]: {
        
    }
}))

export const CurvedDiv = styled('div')(({ theme }) => ({
    margin: '0 auto',
    width: '100%',
    height:900,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover', 
    position: 'relative',
    overflow: 'hidden',

    '&::after': {
        content: '""',
        position: 'absolute',
        height: '200px',
        left: '-10%',
        right: '-10%',
        borderRadius: '50%',
        bottom: '-50px',
        backgroundColor:"#EEE",
    },
  }));