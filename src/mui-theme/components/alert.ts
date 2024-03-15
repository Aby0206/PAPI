import { AlertClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

type StyleOverrides =
	| Partial<
			OverridesStyleRules<
				keyof AlertClasses,
				'MuiAlert',
				Omit<Theme, 'components'>
			>
	  >
	| undefined;

export const MuiAlert: { styleOverrides: StyleOverrides } = {
	styleOverrides: {
		filledSuccess: {
			backgroundColor: '#4ABD95',
		}
	},
};
