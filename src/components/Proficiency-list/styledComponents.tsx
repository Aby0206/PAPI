import { styled } from '@mui/material/styles';

export const StyledWrap = styled('div')(({ theme }) => ({

    display:"flex",
    flexDirection:"column",
    gap:29,
    padding:"20px 12px",
    backgroundColor:"#FFFFFF",
    minHeight:"595px",
    borderRadius:"5px",
    [theme.breakpoints.down('sm')]: {
      
      
    },
}));

export const StyledList = styled('div')(({ theme }) => ({
    '& .table':{
        border:"2px solid #E7E7E9",
       
    },
    '& .head-row': {
		borderRadius: '5px 5px 0px 0px',
		background: 'rgba(74, 189, 149, 0.20)',
	},
    '& .head-title': {
		color: 'var(--color-secondary, #4ABD95)',
		fontFamily: 'Inter',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: 600,
		lineHeight: 'normal',
	},
	'& .content-row': {
        minHeight: '100px',	
        borderBottom: '2px solid  rgba(0, 0, 0, 0.1)',
	},  
    '& .info-cell':{
        display:"flex",
        alignItems:"center",
        gap:20,
        padding:"24px",

    },
    '& .rating-cell':{
      minWidth:200

  },
    '& .info':{
        width: '100%', 
        whiteSpace: 'normal',
        fontSize: 16,
        fontStyle: 'normal',
         
    },
    '& .rating':{
      height:"25px",
     backgroundColor:"lightcyan",

    },
    '& .edit-btn': {
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},

    [theme.breakpoints.down('sm')]: {
     
      '& .child-container': {
        'padding-left':0
     },
       '& .table': {
         maxWidth: 'full-content',
         overflowX: 'auto',
       },
       '& .head-row': {
         display: 'none',
       },
       '& .content-row': {
         display: 'flex',
         flexDirection: 'column',
       },
       '& .info-cell': {
         display: 'block',
       },
       '& .edit-btn': {
         marginTop: '10px',
       },

      },
    }));

    