import { styled } from '@mui/material/styles';

export const StyledWrap = styled('div')(({ theme }) => ({
        position:"relative",
        top:"100px",
        display:"flex",
        flexDirection:"column",
        gap:6,
        alignItems:"center",
        justifyContent:"center",
        
		fontFamily: 'Inter',
	[theme.breakpoints.down('sm')]: {},
}));


export const StyledButton = styled('button')(({ theme }) => ({
    fontSize:"16px",
    position:"relative",
    top:"10px",
    padding:"15px 20px",
    cursor:"pointer",
    color:"#fff",
    backgroundColor:"#4ABD95",
    border:"none",
    borderRadius:"5px",
	[theme.breakpoints.down('sm')]: {},
}));
