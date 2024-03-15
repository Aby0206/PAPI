import React, { useState } from 'react';
import { StyledBasicInfo } from '../Basic-info/styledComponents';
import FormController from '../../FormController';
import { FormControl } from '@mui/material';
import CustomFormDatePicker from '../../custom-form-datepicker';
const ProjectSchedule: React.FC = () => {
	const [sowStDate, setSowStDate] = useState<Date | null>(null);
	const [sowEDate, setSowEDate] = useState<Date | null>(null);
	const [plannedSDate, setplannedSDate] = useState<Date | null>(null);
	const [plannedEDate, setplannedEDate] = useState<Date | null>(null);
	const [actualSDate, setActualSDate] = useState<Date | null>(null);
	const [actualEDate, setActualEDate] = useState<Date | null>(null);
	return (
        <FormControl>
            <StyledBasicInfo>
                <div className='card-title'>Project Schedule</div>
               <div className="heading">Planned</div>
               <div className='half-container'>
               <div className='input-container '>
			   <div className='input-date'>
			   <FormController
						name="plannedStartDate"
						validation={{
							required: 'This is required field',
						}}
						formatValue={(value, onChange) => {
							setplannedSDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Start Date"
							hidelabel={false}
							showAsterisk={true}
							maxDate={plannedEDate}
						/>
					</FormController> 
			   </div>
				<div className='input-date'>
				<FormController
						name="plannedEndDate"
						validation={{
							required: 'This is required field',
						}}
						formatValue={(value, onChange) => {
							setplannedEDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="End Date"
							hidelabel={false}
							showAsterisk={true}
							minDate={plannedSDate}
						/>
					</FormController> 
				</div>
               </div>
               <div className="heading">Actual</div>
               <div className='input-container '>
				<div className='input-date '>
                <FormController
						name="actualStartDate"
						formatValue={(value, onChange) => {
							setActualSDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Start Date"
							hidelabel={false}
							showAsterisk={false}
							maxDate={actualEDate}
						/>
					</FormController> 
                </div>
                <div className='input-date'>
                <FormController
						name="actualEndDate"
						formatValue={(value, onChange) => {
							setActualEDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="End Date"
							hidelabel={false}
							showAsterisk={false}
							minDate={actualSDate}
						/>
					</FormController> 
                </div>
               </div>
               <div className="heading">SOW</div>
               <div className='input-container '>
                <div className='input-date '>
				<FormController
						name="sowStartDate"
						formatValue={(value, onChange) => {
							setSowStDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="Start Date"
							hidelabel={false}
							showAsterisk={false}
							maxDate={sowEDate}
						/>
					</FormController> 
                </div>
                <div className='input-date '>
				<FormController
						name="sowEndDate"
						formatValue={(value, onChange) => {
							setSowEDate(value);
							onChange(value.format('YYYY-MM-DD'));
						}}
					>
						<CustomFormDatePicker
							label="End Date"
							hidelabel={false}
							showAsterisk={false}
							minDate={sowStDate}
						/>
					</FormController> 
                </div>
               </div>

               </div>
            </StyledBasicInfo>
        </FormControl>
    )
    };
    
    export default ProjectSchedule;