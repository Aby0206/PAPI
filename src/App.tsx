import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'styles/base.css';
import { createAppTheme } from './mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import AppRouter from './routes';
import { CustomProvider } from './context/CustomProvider';

const App: React.FC = () => {
	let googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	let theme = createAppTheme();
	return (
		<GoogleOAuthProvider clientId={googleClientId}>
			<ThemeProvider theme={theme}>
				<CustomProvider>
					<AppRouter />
				</CustomProvider>
			</ThemeProvider>
		</GoogleOAuthProvider>
	);
};

export default App;
