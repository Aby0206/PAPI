import React, { useEffect, useState } from 'react';
import AddQual from '../Add-Qual';
import { StyledSkills, StyledAddButton } from '../Skill/styledComponents';
import AddIcon from '../../assets/icons/material-symbols_add.svg';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
	useDeleteQualificationMutation,
} from '../../redux/services/Contractors';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import { getUuid,generateUniqueIds } from "../../utils";
import { useSelector } from 'react-redux';

const EduQual: React.FC = () => {
	const {
		reset,
		getValues,
		formState: {errors}
	} = useFormContext();
	const { id } = useParams();
	const is_editMode = !!id;
	const minimumSkillsCount = 1;
	const { showSnackbar } = useGlobalSnackbar();
	const [skillsIds, setSkillIds] = useState(
		generateUniqueIds(minimumSkillsCount)
	);
	const [DeleteQualification] = useDeleteQualificationMutation();
	const { contractorInfo } = useSelector((state:any) => state.contractor)

	useEffect(() => {
		if (is_editMode) {
			setSkillIds(generateUniqueIds(contractorInfo?.qualification?.length || 0));
		}
	}, [contractorInfo]);

	const handleAddSkills = () => {
		setSkillIds([...skillsIds, getUuid()]);
	};

	const handleDeleteSkills = async (index: number) => {
		if (skillsIds.length > minimumSkillsCount) {
			const formQualificationData = [...getValues('qualification')];

			const removeAtindex=()=>{
				formQualificationData.splice(index, 1);
			let data = getValues();
			reset({
				...data,
				qualification: formQualificationData,
			});
			setSkillIds(skillsIds.filter((_, i) => i != index));
			}

			if (is_editMode) {
				const id = formQualificationData?.[index]?.id || 0;
				if (id !== 0) {
					try {
						await DeleteQualification({ id: id }).unwrap();
						showSnackbar('Qualification deleted successfully', 'success');
						removeAtindex();
					} catch (error) {
						showSnackbar('Qualification deletion error!', 'error');
					}
				}
			}
			removeAtindex();
		}
	};
	return (
		<StyledSkills>
			<div className="card-title">Education Qualification</div>
			{skillsIds.map((uniqueId, index) => (
				<AddQual
					key={uniqueId}
					onDelete={() => handleDeleteSkills(index)}
					index={index}
				/>
			))}
			<StyledAddButton onClick={handleAddSkills}>
				<img src={AddIcon} alt="add-icon" className="Add-icon" />
				Add New Qualification
			</StyledAddButton>
		</StyledSkills>
	);
};

export default EduQual;
