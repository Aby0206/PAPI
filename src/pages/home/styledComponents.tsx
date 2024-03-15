import { styled } from '@mui/material/styles';


export const StyledTab = styled('div')(({ theme}) => ({
     display:"flex",
     flexDirection:"column",
	width:"100%",
     height:"fit-content",
     backgroundColor:"#FFF",

     '& .MuiTab-root': {
          fontSize: 20, 
          textTransform: 'none',
        },

     [theme.breakpoints.down('sm')]: {
          width:'105%',
          justifyContent: 'center', 
          alignItems: 'center', 
          '& .MuiTabs-root': { 
               justifyContent: 'center', 
               width: '100%', 
          },
          
          '& .MuiTab-root': { 
            minWidth: 'auto', 
            padding: '10px', 
          },
        },
      }));