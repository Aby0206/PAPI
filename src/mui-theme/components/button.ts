import { ButtonClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

type StyleOverrides =
	| Partial<
			OverridesStyleRules<
				keyof ButtonClasses,
				'MuiButton',
				Omit<Theme, 'components'>
			>
	  >
	| undefined;

export const MuiButton: { styleOverrides: StyleOverrides } = {
	styleOverrides: {
		root: {
			borderRadius: 5,
			minHeight: 50,
			textTransform: 'capitalize',
			fontFamily: 'Inter',
			fontStyle: 'normal',
			fontWeight: 500,
			fontSize: 16,
			background: '#4ABD95',
			color: '#FFFFFF',
			display: 'flex',
			alignItems: 'center',
			width: 'auto',
			'&:hover': {
				background: '#78deba',
			},
		},
		containedPrimary: {
			color: '#FFFFFF',
			'& .MuiSvgIcon-root': {
				fill: '#FFFFFF',
			},
		},
		outlined: {
			border: `1px solid #4ABD95`,
			background: 'transparent',
			color: '#4ABD95',
			'&:hover': {
				background: 'transparent',
				color: '#78deba',
				border: `1px solid #78deba`,
			},
		},
	},
};
