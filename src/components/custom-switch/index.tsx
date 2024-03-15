import * as React from 'react';
import Switch from '@mui/material/Switch';
import { StyledFormControl} from './styledComponents';

interface CustomCheckboxProps {
  labelContent: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: boolean;
	hidelabel?: boolean;
}
export const CustomSwitch: React.FC<CustomCheckboxProps> = ({
  labelContent,
  onChange,
  required,
  value,
	hidelabel = false,
 }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <StyledFormControl>
			{!hidelabel && (
				<label className="input-label">
					{labelContent}{' '}
					{required&& <span style={{ color: 'red' }}>*</span>}
				</label>
			)}
		 <Switch
      data-testid="switch"
     className='switch-btn'
      checked={value}
      value={value}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
		</StyledFormControl>
   
  );
}
export default CustomSwitch;