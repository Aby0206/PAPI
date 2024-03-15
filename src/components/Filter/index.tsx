import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { StyledDialog } from '../../styles/global';
import CustomSelect from '../custom-select';
import closeIcon from '../../assets/icons/close.svg';
import Button from '../Custom-Button';
export interface CustomSelectConfig {
  label: string;
  valueKey: string;
  optionsKey: string;
  placeholder?: string;
  fieldName: string;
  search: boolean;
  displayProperty: string; 
}
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  initialFilters?: any;
  selectConfigs: CustomSelectConfig[];
  fetchOptions: any;
  searchChange?:(query:string,fieldName:string)=>void,
  loading?:boolean
}

const ReuseFilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  initialFilters,
  selectConfigs,
  fetchOptions,
  searchChange,
  loading=false
}) => {
  const [filters, setFilters] = useState<any>(initialFilters || {});
  
  const handleChange = (value: any, fieldName: string) => {
    setFilters((prevFilters:any) => ({
      ...prevFilters,
      [fieldName]: value,
      
    }));
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
    let query = event?.target?.value?.trim() || '';
      fieldName && searchChange?.(query,fieldName)
  };  
  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    setFilters({});
    onReset()
  };

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <div className='title'>
        <span>Filter</span>
        <button className='close-btn' onClick={onClose}>
        <img src={closeIcon} />
        </button>
      </div>
      <div className='divider' />

      {selectConfigs.map((config) => (
      
  <CustomSelect 
    search={config.search}
    key={config.fieldName}
    label={config.label}
    value={filters[config.fieldName] || ''}
    onChange={(e: any) => handleChange(e.target.value, config.fieldName)}
    searchPlaceholder={config.placeholder}
    fieldName={config.fieldName}
    onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e, config.fieldName)}
>
    {fetchOptions[config.optionsKey]?.results?.map((item: any) => (
      <MenuItem key={item.id} value={item[config.valueKey]}>
        {item[config.displayProperty]}
      </MenuItem>
    ))}
  </CustomSelect>
  ))}
      <div className='btn-wrap'>
        <Button
						type="submit"
						testId="submit-button-id"
						title='Search'
            showLoader={loading}
            disabled={loading}
						onClick={handleApply}
					/>
          <Button
						type="cancel"
						testId="cancel-button-id"
						disabled={loading}
						title="Reset"
						onClick={handleReset}
					/>
      </div>
    </StyledDialog>
  );
};

export default ReuseFilterModal;
