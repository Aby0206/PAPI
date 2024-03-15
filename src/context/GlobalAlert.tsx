import { createContext, useState, ReactNode, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import Alert, { AlertProps } from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';
import { AlertTitle } from '@mui/material';
import {capitalizeFirst} from '../utils/index'

interface IAlertContext {
	showAlert: (
		message: string,
		severity?: AlertProps['severity'],
		variant?: AlertProps['variant'],
		onClose?: () => void
	) => void;
}

export const AlertContext = createContext<IAlertContext | undefined>(undefined);

interface AlertProviderProps {
	children: ReactNode;
}

export function AlertProvider({ children }: Readonly<AlertProviderProps>) {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertProps['severity']>('success');
	const [variant, setVariant] = useState<AlertProps['variant']>('standard');
	const [onClose, setOnClose] = useState<() => void>(() => {});

	const handleClose = () => {
		setOpen(false);
		onClose();
	};

	const showAlert: IAlertContext['showAlert'] = (
		message,
		severity = 'success',
		variant = 'standard',
		onClose = () => {}
	) => {
		setMessage(message);
		setSeverity(severity);
		setVariant(variant);
		setOnClose(() => onClose);
		setOpen(true);
	};

	const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

	return (
		<AlertContext.Provider value={contextValue}>
			{children}
			<Dialog open={open} onClose={handleClose}>
				<Alert
					elevation={1}
					variant={variant}
					onClose={handleClose}
					severity={severity}
					icon={false}
					components={{ CloseIcon: CancelIcon }}
				>
					<AlertTitle>{severity && capitalizeFirst(severity)}</AlertTitle>
					{message}
				</Alert>
			</Dialog>
		</AlertContext.Provider>
	);
}
