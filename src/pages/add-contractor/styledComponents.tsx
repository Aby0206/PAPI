import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')(({ theme }) => ({
    width: '100%',
    height: '2,001px',
    gap: "30px",
    display: 'flex',
    flexDirection:'column',
    '& .button-container':{
      width: "280px",
      height: "49px",
      display:"flex",
      gap: "28px"

  },
  '& .addcontractor-btn':{
    color:"white",
    backgroundColor:"#4ABD95",
    width: "159px",
    height: "49px",
    padding: "15px 20px 15px 20px",
    borderRadius: "5px",
    border:"none",
    ":disabled": {
      backgroundColor:"#92d7bf",
      cursor: "not-allowed",
    },
},
'& .cancel-btn':{
  fontSize:'15px',
  fontStyle:'normal',
  fontWeight:'500',
  fontFamily:'Inter',
    width: "93px",
    height: "49px",
    padding: "15px 20px 15px 20px",
    borderRadius: "5px",
    border: "1px solid #4ABD95",
    backgroundColor:"transperant",
    color:"#4ABD95",
},
  [theme.breakpoints.down('sm')]: {
    
  }
}))