import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextFieldProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	StyledFormControl,
	StyledInputLabel,
	StyledTextField,
	StyledFormHelperText,
} from './styledComponents';

interface CustomInputProps extends Omit<TextFieldProps, 'variant'> {
	label?: string;
	type: 'text' | 'email' | 'number' | 'password';
	error?: boolean;
	helperText?: string;
	link?: { label: string; to: string };
}

const CustomInput = React.forwardRef<CustomInputProps, any>(
	(
		{ link, required, label, type, error = false, helperText = '', ...props },
		ref
	) => {
		const [showPassword, setShowPassword] = useState<boolean>(false);

		const handleClickShowPassword = () => {
			setShowPassword(!showPassword);
		};

		const handleMouseDownPassword = (
			event: React.MouseEvent<HTMLButtonElement>
		) => {
			event.preventDefault();
		};
		let labelText = '';
		if (label) {
			labelText = required ? `${label} *` : label;
		}

		return (
			<StyledFormControl error={error}>
				<StyledInputLabel error={error} htmlFor={props?.name}>
					<span>{labelText}</span>
					{link?.label && link?.to && (
						<Link className="right-label" to={link?.to}>
							{link?.label}
						</Link>
					)}
				</StyledInputLabel>
				<StyledTextField
					type={showPassword ? 'text' : type}
					{...props}
					error={error}
					ref={ref}
					InputProps={{
						endAdornment: type === 'password' && (
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<StyledFormHelperText>{helperText}</StyledFormHelperText>
			</StyledFormControl>
		);
	}
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
