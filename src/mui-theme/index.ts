import { ThemeOptions, createTheme } from '@mui/material/styles';
import { MuiButton, MuiTab, MuiAlert } from './components';
import palette from './palette';

const OVERIDE_DEFAULTS: ThemeOptions = {
	components: {
		MuiButton,
		MuiTab,
		MuiAlert,
	},
	typography: {
		h1: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: '36px',
		}
	},
};

export const createAppTheme = () => {
	return createTheme({
		palette: palette,
		...OVERIDE_DEFAULTS,
	});
};
