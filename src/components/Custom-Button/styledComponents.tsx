import { styled, } from '@mui/material/styles'

export const StyledSubmitButton = styled('button')(({ theme}) => ({
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
    
   [theme.breakpoints.down('sm')]: {

    }
   
}))
export const StyledCancelButton = styled('button')(({ theme,disabled }) => ({
  width: "93px",
  height: "49px",
  padding: "15px 20px 15px 20px",
  borderRadius: "5px",
  border: "1px solid #4ABD95",
  backgroundColor:"#fff",
  color:"#4ABD95", 
  ":disabled": {
    backgroundColor:"fff",
    cursor: "not-allowed",
  },
    
   [theme.breakpoints.down('sm')]: {

    }
   
}))

export const StyledButton = styled('button')(({ theme}) => ({
  padding: "15px 20px 15px 20px",
  borderRadius: "5px",
  fontSize:'15px',
  fontStyle:'normal',
  fontWeight:'500',
  fontFamily:'Inter',
  "&.submit":{
    color:"white",
    minWidth: "73px",
    height: "49px",
    backgroundColor:"#4ABD95",
    padding: "15px 20px 15px 20px",
    borderRadius: "5px",
    border:"none",
    ":disabled": {
      backgroundColor:"#92d7bf",
      cursor: "not-allowed",
    }, 

  },
  "&.cancel":{
    color:"#4ABD95",
    minWidth: "93px",
    height: "49px",
    padding: "15px 20px 15px 20px",
    borderRadius: "5px",
    border: "1px solid #4ABD95",
    backgroundColor:"#fff",
    
    
      ":disabled": {
        backgroundColor:"fff",
        cursor: "not-allowed",
      },
    
  },
    
}))

