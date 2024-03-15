import React from 'react';
import {useState} from 'react';
import { StyledBasicInfo } from './styledComponents';
import {  StyledTextArea } from '../../Work/styledComponent';
import FormSelect from '../../custom-form-select';
import { useFormContext } from 'react-hook-form';
import CustomFormInput from '../../custom-forminput';
import FormController from '../../FormController';
import { FormControl } from '@mui/material';
import {useGetProjectStatusQuery} from '../../../redux/services/Project/status'
import {useGetCurrencyQuery} from '../../../redux/services/Project/currency'
const BasicInfo: React.FC = () => {
	const {data:status}=useGetProjectStatusQuery({})
	const { data:currency}=useGetCurrencyQuery({})
	const { setValue } =useFormContext();
	return (
        <FormControl>
            <StyledBasicInfo>
                <div className='card-title'>Basic Information</div>
                <div className='input-container'>
                    <div className='input-caption1'>
                       <FormController
							name="projectName"
							validation={{
								required: 'This is required field.',
								maxLength: {
									value: 75,
									message: 'This input exceed maxLength.',
								},
                                minLength:{
                                    value:25,
                                    message:"Minimum 25 characters"
                                },
							}}
						>
							<CustomFormInput
								type="text"
								label="Project Name"
								placeholder="Project Name"
                                required
							/>
						</FormController> 
                    </div>
                  
                </div>
                <div className='input-container'>
				<div className='input-caption'>
                       <FormController
							name="projectManager"
							validation={{
								required: 'This is required field.',
                                minLength:{
                                    value:5,
                                    message:"Minimum 5 characters"
                                },
								maxLength: {
									value: 50,
									message: 'This input exceed maxLength.',
								},
							}}
						>
							<CustomFormInput
								type="text"
								label="Project Manager"
								placeholder="Project Manager"
                                required
							/>
						</FormController> 
                    </div>
                    <div className='input-caption'>
                       <FormController
							name="clientName"
							validation={{
								required: 'This is required field.',
                                minLength:{
                                    value:5,
                                    message:"Minimum 5 characters"
                                },
								maxLength: {
									value: 100,
									message: 'This input exceed maxLength.',
								},
							}}
						>
							<CustomFormInput
								type="text"
								label="Client Name"
								placeholder="Client Name"
                                required
							/>
						</FormController> 
                    </div>
                    <div  style={{width:"20%"}}>
                    <FormController
					name="projectStatusId"
					validation={{
						required: 'This is required field.',
					}}
				>
					<FormSelect
						label="Project Status"
						showAsterisk={true}
						options={status?.data ?? []}
						nameKey="statusName"
						selected={status?.id}
					></FormSelect>
				</FormController>

                    </div>
				</div>
               <div style={{width:"49%" , display:"flex",flexDirection:"column",gap:20}}>
               <div className="heading">Expected Revenue</div>
                <div className='input-container '>
                <div style={{width:"16%"}}>
					
				<div className='input-caption'>
                <FormController
					name="revenueCurrencyId"
				>
					<FormSelect
						label="Currency"
						showAsterisk={false}
						options={currency?.data ?? []}
						nameKey="currencyName"
						selected={currency?.id}
					></FormSelect>
				</FormController>
                </div>
				</div>
				<div style={{width:"45%"}}>
				<div className='input-caption'>
                <FormController
					name="revenueText"
					validation={{
						maxLength: {
							value: 20,
							message: 'This input exceed maxLength.',
						},
						pattern: {
							value: /^\d+$/,
							message: 'Please enter a whole number.',
						  }
					}}
				>
					<CustomFormInput
						label="Value"
						type="number"
						placeholder="value"
					/>
				</FormController>
                </div>
				</div>
		

                </div>
               </div>
               <div className='container-item'>
                <>Description</>
                <FormController
					name="projectDescription"
					validation={{
						maxLength: {
							value: 2500,
							message: 'This input exceed maxLength.',
						},
                        minLength: {
							value: 100,
							message: 'Minimum of 100 Characters.',
						},
					}}
					formatValue={(e, onChange) => {
						onChange(e)
						setValue("projectDescription",e?.target?.value)
					}}
				>
					<StyledTextArea placeholder='if any...'/>
				</FormController>
                </div>
            </StyledBasicInfo>
       </FormControl>
    )
    };
    
    export default BasicInfo;