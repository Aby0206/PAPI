import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')(({ theme }) => ({
  width: "100%",
  display:'flex',
  flexDirection:'column',
  gap:30,
  [theme.breakpoints.down('sm')]: {
    gap:15,
  }
}));

export const StyledWrap = styled('div')(({ theme }) => ({
    display:"flex",
      gap:"20px",
      justifyContent:"space-between",
  [theme.breakpoints.down('sm')]: {
    gap:15,
  }
}));
