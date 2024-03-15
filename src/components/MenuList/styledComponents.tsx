import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';

export const StyledMenuList = styled('div')(({ theme }) => ({
	'& .MuiPopover-root': {
		width: '296px',
	},

	[theme.breakpoints.down('sm')]: {},
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
	'.MuiPopover-paper.MuiMenu-paper': {
		borderRadius: 0,
		width: '193px',
		maxWidth: 'unset',
	},
	'.menu-item-container':{
		gap: 15, display: 'flex'
	},
	'.label': {
		display: 'block',
		color: 'var(--color-caption, #6E6D7A)',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal'
	},
	'.menu-icon':{
		width: '25px', height: '25px'
	}
}));
