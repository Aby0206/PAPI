import { createContext, useState, ReactNode, useMemo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';

interface ISnackbarContext {
	showSnackbar: (message: string, severity?: AlertProps['severity']) => void;
}

export const SnackbarContext = createContext<ISnackbarContext | undefined>(
	undefined
);

interface SnackbarProviderProps {
	children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertProps['severity']>('success');

	const handleClose = () => {
		setOpen(false);
	};

	const showSnackbar: ISnackbarContext['showSnackbar'] = (
		message,
		severity='success'
	) => {
		setMessage(message);
		setSeverity(severity);
		setOpen(true);
	};
	const contextValue = useMemo(() => ({ showSnackbar }), [showSnackbar]);
	return (
		<SnackbarContext.Provider value={contextValue}>
			{children}
			<Snackbar
				open={open}
				onClose={handleClose}
				autoHideDuration={2000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				sx={{ zIndex: 2001 }}
			>
				<Alert
					elevation={16}
					variant="filled"
					onClose={handleClose}
					severity={severity}
					icon={false}
					components={{ CloseIcon: CancelIcon }}
				>
					{message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
}
