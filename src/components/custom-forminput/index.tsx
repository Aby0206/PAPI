import InputAdornment from '@mui/material/InputAdornment';
import ErrorIcon from '@mui/icons-material/Error';
import {
	StyledFormControl,
	StyledTextField,
	StyledFormHelperText,
} from './styledComponents';
import { StyledFieldLabel } from '../../styles/global';

interface CustomInputProps {
	label?: string;
	required?: boolean;
	type: 'text' | 'email' | 'number';
	disabled?:boolean,
	invalid?: boolean;
	helperText?: string;
	placeholder?: string;
	name?: string;
	link?: { label: string; to: string };
	errorMessage?: string;
	value?:string;
	labelTestid?: string;
	errorTest?: string;
}

const CustomFormInput = ({
	link,
	required,
	label,
	type,
	disabled = false,
	invalid = false,
	helperText = '',
	placeholder,
	name,
	errorMessage,
	value,
	labelTestid,
	errorTest,
	...props
}: CustomInputProps) => {

	return (
		<StyledFormControl error={invalid}>
			<StyledFieldLabel
				htmlFor={name}
				className="input-label"
				data-testid={labelTestid}
			>
				{label}
				{required && <span style={{ color: 'red' }}>*</span>}
			</StyledFieldLabel>
			<StyledTextField
				type={type}
				placeholder={placeholder}
				error={invalid}
				value={(value) ?? ''}
				disabled={disabled}
				InputProps={{
					endAdornment: invalid && (
						<InputAdornment position="end">
							<ErrorIcon style={{ color: 'red' }}  />
						</InputAdornment>
					),
				}}
				{...props}
			/>
			{
				<StyledFormHelperText style={{ color: 'red' }} data-testid="error-id">
					{errorMessage as string}
				</StyledFormHelperText>
			}
		</StyledFormControl>
	);
};

CustomFormInput.displayName = 'CustomInput';

export default CustomFormInput;
