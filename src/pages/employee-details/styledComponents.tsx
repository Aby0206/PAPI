import { styled } from '@mui/material/styles'

export const StyledEmployeeContainer = styled('div')(({ theme }) => ({
  width: "100%",
  display:'flex',
  flexDirection:'column',
  gap:30,
  [theme.breakpoints.down('sm')]: {
    gap:15,
  }
}));

export const StyledInfoContainer = styled('div')(({ theme }) => ({
  width: "100%",
  display: "flex",
  height: 'auto',
  gap: 20,
  [theme.breakpoints.down('sm')]: {
     flexDirection:'column',
     gap: 15,
  }
}));