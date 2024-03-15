import { styled } from '@mui/material/styles';

export const StyledDiv = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	width: '100%',
	'& .row': {
		flexDirection: 'row',
	},
}));

export const StyledRatingDesc = styled('div')(() => ({
	width: '100%',
	height: '100px',
	borderRadius: '5px',
	padding: '15px 12px',
	backgroundColor: 'var(--color-bg-form, #F2F4F6)',
}));
