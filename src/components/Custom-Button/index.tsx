
import { StyledButton } from './styledComponents';
import CircularProgress from '@mui/material/CircularProgress';

interface CustomSubmitButtonProps {
	type?:string,
	title?: string;
	disabled?: boolean;
	onClick?: () => void;
	showLoader?: boolean;
	testId?:string,
}

const SubmitButton = ({
	type='submit',
	title,
	disabled =false,
	showLoader = false,
	testId,
	onClick
}: CustomSubmitButtonProps) => {
	return (
		<StyledButton className={type==='submit'?'submit':'cancel'} disabled={disabled} data-testid={testId} onClick={onClick}>
			{(showLoader && disabled && <CircularProgress  size="1rem"/>) || title}
		</StyledButton>
	);
};

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
