import React from 'react';
import { SnackbarProvider } from './GlobalSnackbar';
import { AlertProvider } from './GlobalAlert';

interface CustomProviderProps {
	children: React.ReactNode;
}

export function CustomProvider({ children }: CustomProviderProps) {
	return (
		<SnackbarProvider>
			<AlertProvider>{children}</AlertProvider>
		</SnackbarProvider>
	);
}
