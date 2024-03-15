import { useContext } from 'react';
import { SnackbarContext } from '../../context/GlobalSnackbar';
import { AlertContext } from '../../context/GlobalAlert';

export const useGlobalSnackbar = () => {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error('useSnackbar must be used within a SnackbarProvider');
	}
	return context;
};
export const useGlobalAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useAlert must be used within a AlertProvider');
	}
	return context;
};
