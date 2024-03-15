import { styled,Theme } from '@mui/material/styles'

interface StyledLayoutProps {
  theme?: Theme;
}


export const StyledDashboardLayout = styled('div')<StyledLayoutProps>(({ theme}) => ({
  width:"100%",
  height:"100%",
  "& .child-container":{
    position:"relative",
    paddingLeft:292,//266+26
    paddingTop:111,//92+16
    paddingRight:26,
    paddingBottom:81,//footer width
    width:"100%",
    height:"auto",
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    background: "#EEE"
  },
  "& .closed":{
    paddingTop:70,
    paddingLeft:106,//80+26
  },
  "& .oulet-container":{
    width:"100%",
    height:"auto",
    display:"flex",
    flexDirection:"column",
  },
  [theme.breakpoints.down('md')]: {
    "& .child-container": {
      paddingLeft: 26,
      paddingTop: 92, 
    },
  },
  [theme.breakpoints.down('sm')]: {
    "& .child-container": {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 100,  
    },
  }
}));