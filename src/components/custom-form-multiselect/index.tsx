import React, { ChangeEvent, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
	StyledFormControl,
	StyledTextField,
	StyledSelect,
	StyledResultNotFound,
	StyledFormHelperText,
} from './styledComponents';
import { StyledFieldLabel } from '../../styles/global';
import { InputAdornment, ListSubheader, SelectChangeEvent} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


interface CustomMultiSelectProps<T> {
	label?: string;
	showAsterisk?: boolean;
	hidelabel?: boolean;
	value?: any;
	invalid?: boolean;
	search?: boolean;
	onSearchChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldname?: string) => void;
	onClose?: (fieldname?: string) => void;
	searchPlaceholder?: string;
	fieldName?: string;
	options: any;
	nameKey: keyof T;
	onChange?: (event: SelectChangeEvent<unknown>) => void;
	selected?: string;
	errorMessage?: string;
	handleItemClicked?: (item?: any) => void;
}

const CustomMultiSelect = <T extends Record<string, any>>({
	label,
	showAsterisk = true,
	hidelabel = false,
	value,
	invalid,
	search,
	onSearchChange,
	onClose,
	searchPlaceholder,
	fieldName,
	options,
	nameKey,
	onChange,
	selected,
	errorMessage,
	handleItemClicked,
	...props
}: CustomMultiSelectProps<T>) => {

	const [isOpen, setIsOpen] = useState(false);
	const [selectedName, setSelectedName] = useState(selected ?? 'Select');
	const handleOpen = () => {
		setIsOpen(true);
	};
	const handleClose = () => {
		setIsOpen(false);
		onClose?.(fieldName);
	};

	const handleChange: ((event: SelectChangeEvent<unknown>, child: React.ReactElement) => void)
		= (e, key) => {
			setSelectedName(key?.props?.children || '');
			onChange?.(e);
		};

	const handleTextFieldClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};
	const isMenuItemVisible = useMemo(() => !isOpen && !value, [isOpen, value]);
	return (
		<StyledFormControl>
			{!hidelabel && (
				<StyledFieldLabel className="input-label">
					{label} {showAsterisk && <span style={{ color: 'red' }}>*</span>}
				</StyledFieldLabel>
			)}

			<StyledSelect
				displayEmpty
				value={value ?? []}
				error={invalid as boolean}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={(e, key) => handleChange(e, key as React.ReactElement)}
				inputProps={{ 'aria-label': 'Select an option',  }}
				MenuProps={{ PaperProps: { sx: { maxHeight: 450 } }, autoFocus: false }}
				multiple
				{...props}
			>
				{search && (
					<ListSubheader>
						<StyledTextField
							size="small"
							placeholder={searchPlaceholder ?? 'Search...'}
							onChange={(e) => onSearchChange?.(e, fieldName)}
							onKeyDown={(e) => {
								if (e.key !== 'Escape') {
									e.stopPropagation();
								}
							}}
							onClick={handleTextFieldClick}
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

				{isMenuItemVisible && (
					<MenuItem disabled value="">
						Select
					</MenuItem>
				)}
				{options?.map((el: any) => (
					<MenuItem key={(el as { id: string }).id} value={(el as { id: string }).id} onClick={() => handleItemClicked?.(el)}>
						{(nameKey && el[nameKey]) || el}
					</MenuItem>
				))}
				{search && options?.length === 0 && (
					<StyledResultNotFound>Result not found</StyledResultNotFound>
				)}

			</StyledSelect>
			<StyledFormHelperText style={{ color: 'red' }}>
				{errorMessage as string}
			</StyledFormHelperText>
		</StyledFormControl>
	);
};

export default CustomMultiSelect;
