import React, { useState, useEffect } from 'react';
import { StyledCheckbox, StyledInput } from './styledComponents';

interface CustomCheckboxProps {
  labelContent?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: boolean;
  data?: [string, string];
  checked?: boolean;
  handleCheckBox?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  labelContent,
  onChange,
  required,
  value,
  data,
  checked,
  handleCheckBox
}) => {
  const [isChecked, setIsChecked] = useState<boolean | null>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    onChange?.(event);
    handleCheckBox?.(event);
  };

  useEffect(() => {
    if (value === undefined) {
      setIsChecked(null);
    } else {
      setIsChecked(value);
    }
  }, [value]);

  useEffect(() => {
    if (checked === null) {
      setIsChecked(true);
    }
  }, [checked]);

  return (
    <StyledCheckbox>
      <div>
        <span>{labelContent}</span>
        {required && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div className="wrap-box">
        <label className="label">
          <StyledInput
            type="checkbox"
            value={'true'}
            data-testid="checkbox-component-yes"
            checked={isChecked === true}
            data-checked-value={false}
            onChange={handleCheckboxChange}
          />
          {data ? <>{data[0]}</> : <>yes</>}
        </label>
        <label className="label">
          <StyledInput
            type="checkbox"
            value={'false'}
            data-checked-value={false}
            checked={isChecked === false}
            onChange={handleCheckboxChange}
            data-testid="checkbox-component-no"
          />
          {data ? <>{data[1]}</> : <>No</>}
        </label>
      </div>
    </StyledCheckbox>
  );
};

export default CustomCheckbox;
