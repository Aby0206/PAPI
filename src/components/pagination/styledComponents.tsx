import { styled } from '@mui/material/styles';
export const StyledPagination = styled('div')(({ theme}) => ({
     height:"32px",
     gap: "5px",	
     display: 'flex', 
    
     '& .navigate-button':{
             width: '32px', 
            height: '32px', 
            padding: '10px , 4px ,10px ,4px',
            Radius:'8px',
            border:"none",
            borderRadius: '5px',
            gap: '10px',
            background: 'transparent', 
            cursor:"pointer",
     },
     [theme.breakpoints.down('sm')]: {
        
     }
}));


    
  
