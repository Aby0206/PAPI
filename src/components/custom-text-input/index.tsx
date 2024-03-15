import {
	StyledFormControl,
	StyledInputLabel,
	StyledFormHelperText,
	StyledTextArea,
} from './styledComponents';

interface CustomInputProps {
	label?: string;
	required?: boolean;
	invalid?: boolean;
	helperText?: string;
	placeholder?: string;
	name?: string;
	link?: { label: string; to: string };
	errorMessage?: string;
	value?: string;
	testid?: string;
}

const CustomTextInput = ({
	link,
	required,
	label,
	invalid = false,
	helperText = '',
	placeholder,
	name,
	errorMessage,
	value,
	testid,
	...props
}: CustomInputProps) => {
	return (
		<StyledFormControl error={invalid}>
			<StyledInputLabel className="input-label">
				{label}
				{required && <span style={{ color: 'red' }}> *</span>}
			</StyledInputLabel>
			<StyledTextArea
				data-testid={testid}
				placeholder={placeholder}
				error={invalid}
				value={value ?? ''}
				{...props}
			/>
			{
				<div
					style={{
						flexDirection: 'row',
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<StyledFormHelperText
						data-testid="error-message"
						style={{ color: (errorMessage && 'red') || '#A2A2A2' }}
					>
						{(invalid && (errorMessage as string)) || helperText}
					</StyledFormHelperText>

					<label data-testid="count" className="text-count">
						{value?.length ?? 0}/299
					</label>
				</div>
			}
		</StyledFormControl>
	);
};

CustomTextInput.displayName = 'CustomTextInput';

export default CustomTextInput;
