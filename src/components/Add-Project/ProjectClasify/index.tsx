import React, { useState } from 'react';
import { StyledBasicInfo } from '../Basic-info/styledComponents';
import FormSelect from '../../custom-form-select';
import FormMultiSelect from "../../custom-form-multiselect"
import FormController from '../../FormController';
import { FormControl } from '@mui/material';
import {useGetBusinessUnitQuery} from '../../../redux/services/Project/bu'
import {useGetprojectTypeQuery} from '../../../redux/services/Project/type'
import {useGetBillingTypeQuery} from '../../../redux/services/Project/billing'
import {useGetTechnologyStackQuery,useGetSearchTechnologyStackQuery} from '../../../redux/services/Project/stack'
import {useGetProjectDomainQuery} from '../../../redux/services/Project/domain'

const ProjectClasify: React.FC = () => {
	const [searchQuery ,setSearchQuery]=useState({
		stackName:'',
	})
	const {data:bu}=useGetBusinessUnitQuery({})
	const {data:type}=useGetprojectTypeQuery({})
	const {data:billing}=useGetBillingTypeQuery({})
	const stack=useGetSearchTechnologyStackQuery({stackName:searchQuery.stackName}).data
	const {data:domain}=useGetProjectDomainQuery({})
	const handleSearchChange = (
		event:any,
		fieldname?: string,
	) => {
		let query = event?.target?.value?.trim() || '';
		fieldname && setSearchQuery((prevQueries) => ({
			...prevQueries,
			[fieldname]: query,
		}));
	};
	const onClose = (fieldName?: string) => {
		fieldName && setSearchQuery((prevQueries) => ({
		  ...prevQueries,
		  [fieldName]: '',
		}));
	  };
	return (
        <FormControl>
            <StyledBasicInfo>
				<div className='card-title'>Project Classification</div>
                <div className='input-container'>
                    <div className='input-caption' >
                    <FormController
					name="businessUnitId"
				    >
					<FormSelect
						label="Business Unit"
						showAsterisk={false}
						options={bu?.data??[]}
						nameKey="businessUnit"
						selected={bu?.id}
					></FormSelect>
				   </FormController>

                    </div>
                    <div className='input-caption'>
                    <FormController
					name="projectTypeId"
				    >
					<FormSelect
						label="Project Type"
						showAsterisk={false}
						options={type?.data??[]}
						nameKey="projectTypeName"
						selected={type?.id}
					></FormSelect>
				   </FormController>

                    </div>
                    <div className='input-caption'>
                    <FormController
					name="billingTypeId"
				    >
					<FormSelect
						label="Billing Type"
						showAsterisk={false}
						options={billing?.data??[]}
						nameKey="billingTypeName"
						selected={billing?.id}
					></FormSelect>
				   </FormController>

                    </div>
                    <div className='input-caption'>
                    <FormController
					name="technologyStackId"
				    >
					<FormMultiSelect
						label="Technology Stack"
						showAsterisk={false}
						options={stack?.data ?? []}
						nameKey="technologyStackName"
						fieldName='stackName'
						selected={stack?.id}
						searchPlaceholder='search for a Stack'
						search
						onSearchChange={handleSearchChange}
						onClose={onClose}
					></FormMultiSelect>
				   </FormController>

                    </div>
                    <div className='input-caption'>
                    <FormController
					name="domainId"
				    >
					<FormSelect
						label="Domain"
						showAsterisk={false}
						options={domain?.data??[]}
						nameKey="domainName"
						selected={domain?.id}
					></FormSelect>
				   </FormController>

                    </div>
                </div>
            </StyledBasicInfo>
        </FormControl>
		
    )
    };
    
    export default ProjectClasify;