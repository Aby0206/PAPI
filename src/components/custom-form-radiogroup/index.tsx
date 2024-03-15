import React, { ChangeEvent} from 'react';
import { StyledRadio } from './styledComponents';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
interface CustomRadioGroupProps {
	options: Option[];
	value?:number;
	onChange?: (
		event: ChangeEvent<HTMLInputElement>) => void;
}
interface Option {
	name:string,
	value:number,
}

const CustomRadioGroup = ({
	options,
	value,
	onChange,
	...props
}: CustomRadioGroupProps) => {

	const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        onChange?.(e);
    }

	return (
		<RadioGroup  row onChange={(e)=>handleChange(e)}  >
			{options.map((el) => (
				<FormControlLabel
				key={el.value}
					value={el.value}
					control={<StyledRadio disableRipple  />}
					label={el.name}
					checked={el.value === value}
				/>
			))}
		</RadioGroup>
	);
};

CustomRadioGroup.displayName = 'CustomRadioGroup';

export default CustomRadioGroup;
