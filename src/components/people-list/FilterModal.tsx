import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { StyledDialog } from '../../styles/global';
import closeIcon from '../../assets/icons/close.svg';
import CustomSelect from '../custom-select';
import {
  useGetDesignationsQuery,
  useGetDepartmentsQuery,
  useGetReportingManagersQuery, 
  useGetSkillsQuery,
  Filters 
  }
  from '../../redux/services/Peoples';
  interface SearchQueryProps {
    managers?: string;
    designations: string;
    departments: string;
    skills:string;
  }

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  initialFilters?: Filters;
}

const FilterModal: React.FC<Props> = ({ isOpen, onClose, onApply,onReset, initialFilters }) => {
	const [searchQuery, setSearchQuery] = useState<SearchQueryProps>({
		managers: '',
		designations: '',
		departments: '',
    skills:'',
	});

  const [title, setTitle] = useState<string>(initialFilters?.title ?? '');
  const [department, setDepartment] = useState<string>(initialFilters?.department ?? '');
  const [reporting_manager, setReportingManager] = useState<string>(initialFilters?. reporting_manager ?? '');
  const [skill, setSkill] = useState<string>(initialFilters?.skill ?? '');

  const departments = useGetDepartmentsQuery({searchQuery:searchQuery.departments}).data;
	const reportingManagers = useGetReportingManagersQuery({searchQuery:searchQuery.managers}).data;
  const skills = useGetSkillsQuery({searchQuery:searchQuery.skills}).data;
  const designation = useGetDesignationsQuery({searchQuery:searchQuery.designations}).data;

  const handleApply = () => {
  const filters = { title,designation:title , department, reporting_manager, skill };
  onApply(filters);
};

useEffect(() => {
  if (initialFilters) {
    setTitle(initialFilters.title  ?? '');
    setDepartment(initialFilters.department ?? '');
    setReportingManager(initialFilters.reporting_manager ?? '');
    setSkill(initialFilters.skill ?? '');
  }
}, [initialFilters]);

const handleSearchChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  fieldname?: string,
) => {
  let query = event?.target?.value?.trim() || '';
  fieldname && setSearchQuery((prevQueries) => ({
    ...prevQueries,
    [fieldname]: query,
  }));
};
  const handleReset = () => {
    setTitle('');
    setDepartment('');
    setReportingManager('');
    setSkill('');
    onReset()
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <div className='title'>
        <span>Filter</span>
        <button className='close-btn' onClick={onClose}>
          <img src={closeIcon} />
        </button>
      </div>
      <div className='divider' />

      <CustomSelect label='Title' 
      search
      searchPlaceholder="Search a Title"
      value={title}
      onChange={(e: any) => setTitle(e.target.value)}
      onSearchChange={handleSearchChange} 
      fieldName="designations"
       >
      {designation?.results?.map(dept => (
          <MenuItem  key={dept.id}  value={dept.name}>
            {dept.name}
          </MenuItem>
        ))}
      </CustomSelect>

      <CustomSelect label='Department' value={department} onChange={(e: any) => setDepartment(e.target.value)}
      search 
      searchPlaceholder="Search a Department"
      onSearchChange={handleSearchChange} 
      fieldName="departments"
      >
        {departments?.results?.map(dept=> (
          <MenuItem  key={dept.id}  value={dept.name}>
            {dept.name}
          </MenuItem>
        ))}
      </CustomSelect>

      <CustomSelect 
      label='Reporting Manager' 
      value={reporting_manager}
      onChange={(e: any) => setReportingManager(e.target.value)}
      searchPlaceholder="Search a Reporting Manager"
      onSearchChange={handleSearchChange}  
      fieldName="managers" 
      search
     >
      {reportingManagers?.results?.map(rm => (
          <MenuItem key={rm.id} value={rm.full_name}>
            {rm.full_name}
          </MenuItem>
        ))}
      </CustomSelect>

      <CustomSelect label='Skill' value={skill} onChange={(e: any) => setSkill(e.target.value)}
      search
      searchPlaceholder="Search a Skill"
      onSearchChange={handleSearchChange}  
      fieldName="skills" 
      >
        {skills?.results?.map(skill => (
          <MenuItem key={skill.id} value={skill.name}>
            {skill.name}
          </MenuItem>
        ))}
      </CustomSelect>
      
      <div className='btn-wrap'>
        <button className="btn search" onClick={handleApply}>Search</button>
        <button className="btn reset" onClick={handleReset}>Reset</button>
      </div>
    </StyledDialog>
  );
};

export default FilterModal;
