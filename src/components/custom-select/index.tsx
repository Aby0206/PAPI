import React, { ReactNode } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
	StyledFormControl,
	StyledSelect,
	StyledTextField
} from './styledComponents';
import { SelectChangeEvent, InputAdornment, ListSubheader } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


interface CustomSelectProps {
	label?: string;
	showAsterisk?: boolean;
	hidelabel?: boolean;
	value?: any;
	invalid?: boolean;
	children: React.ReactNode;
	onChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
	search?: boolean;
	searchPlaceholder?: string;
	onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => void;
	fieldName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	label,
	showAsterisk = false,
	hidelabel = false,
	value,
	invalid,
	children,
	onChange,
	search,
	onSearchChange,
	searchPlaceholder,
	fieldName,
	...props
}) => {
	const handleTextFieldClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<StyledFormControl>
			{!hidelabel && (
				<label className="input-label">
					{label}{' '}
					{showAsterisk && <span style={{ color: 'red' }}>*</span>}
				</label>
			)}
			<StyledSelect
				data-testid="select-id"
				displayEmpty
				value={value || ''}
				error={invalid as boolean}
				MenuProps={{ PaperProps: { sx: { maxHeight: 450 } }, autoFocus: false }}
				{...props} onChange={onChange}
				{...props}

			>
				{search && (
					<ListSubheader>
						<StyledTextField
							size="small"
							onChange={(e: any) => onSearchChange?.(e, fieldName)} onKeyDown={(e) => {
								if (e.key !== 'Escape') {
									e.stopPropagation();
								}
							}}
							onClick={handleTextFieldClick}

							placeholder={searchPlaceholder ?? 'Search...'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
							fullWidth
						/>
					</ListSubheader>
				)}

				<MenuItem disabled value="">
					Select
				</MenuItem>
				{children}
			</StyledSelect>
		</StyledFormControl>
	);
};

export default CustomSelect;
