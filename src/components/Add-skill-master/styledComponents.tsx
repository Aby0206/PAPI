import { styled } from '@mui/material/styles'
import { Box } from "@mui/material";

export const StyledDiv = styled(Box)(({ theme }) => ({
    display: "inline-flex",
    width:'100%',
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
    background: "#fff",
  
    
    [theme.breakpoints.down('sm')]: {

    }
}))