import { styled, Theme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { FormControl} from '@mui/material'

interface StyledFileContainerProps {
	theme?: Theme;
	invalid?: boolean;
}
export const StyledFormControl = styled(FormControl)<StyledFileContainerProps>(
	({ theme, invalid }) => ({
		color: '#6E6D7A',
		display: 'flex',
		gap: '10px',
		flexDirection: 'column',
		'.MuiRating-root': {
			borderColor: invalid ? 'red' : '#C2C2C2',
			paddingTop: 0
		},
		[theme.breakpoints.down('sm')]: {},
	})
);
export const StyledRatingDesc= styled('div')(() => ({
	display: 'flex',
padding: '15px 12px',
alignItems: 'center',
borderRadius: '5px',
color: 'var(--color-body, #111215)',
background: 'var(--color-bg-form, #F2F4F6)',
fontFamily: 'Inter',
fontSize: '16px',
fontStyle: 'normal',
fontweight: '400',
lineHeight: '26px',
}));

export const StyledRatingWrapper= styled('div')(() => ({
	'&.border-show':{
		borderRadius: '5px',
		border: '1px solid rgba(231, 231, 233, 1)',
		padding: '12px',
	}
	
}));


export const StyledStar = styled(Rating)(({ theme }) => ({
	display: 'flex',
	width: '120px',
	'&.MuiRating-root': {
        paddingTop:'0 !important'
    },
	' & .MuiRating-icon': {
		color: 'rgba(74, 189, 149, 1)',
	},
	'& .MuiRating-iconFilled': {
		color: 'rgba(74, 189, 149, 1)',
		gap: '12px',
	},

	[theme.breakpoints.down('sm')]: {},
}));
