import React, { useEffect, useState } from 'react';
import AddSkills from '../Add-skills';
import { StyledSkills, StyledAddButton } from './styledComponents';
import AddIcon from '../../assets/icons/material-symbols_add.svg';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDeleteSkillMutation } from '../../redux/services/Contractors';
import { useSelector } from 'react-redux';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import { getUuid, generateUniqueIds } from '../../utils';

const Skills: React.FC = () => {
	const { getValues, reset } = useFormContext();
	const { id } = useParams();
	const is_editMode = !!id;
	const minimumSkillsCount = 1;
	const [skillsIds, setSkillIds] = useState(
		generateUniqueIds(minimumSkillsCount)
	);
	const [editSkillData, setEditSkillData] = useState([]);
	const { contractorInfo } = useSelector((state:any) => state.contractor);
	const [DeleteSkill] = useDeleteSkillMutation();
	const { showSnackbar } = useGlobalSnackbar();

	useEffect(() => {
		if (is_editMode && contractorInfo) {
			const { user_skill } = contractorInfo;
			if (user_skill) {
				setSkillIds(generateUniqueIds(user_skill.length || 0));
				setEditSkillData(JSON.parse(JSON.stringify(user_skill)));
			}
		}
	}, [contractorInfo]);

	const handleAddSkills = () => {
		setSkillIds([...skillsIds, getUuid()]);
	};

	const handleDeleteSkills = async (index: number) => {
		if (skillsIds.length > minimumSkillsCount) {
			const formSkillsData = [...getValues('user_skill')];

			const removeAtindex = () => {
				formSkillsData.splice(index, 1);
				let data = getValues();
				reset({
					...data,
					user_skill: formSkillsData,
				});
				setSkillIds(skillsIds.filter((_, i) => i != index));
			};
			if (is_editMode) {
				const id = formSkillsData?.[index]?.id || 0;
				if (id !== 0) {
					try {
						await DeleteSkill({ id: id }).unwrap();
						showSnackbar('Skill deleted successfully', 'success');
					} catch (error) {
						showSnackbar('Skill deletion error!', 'error');
					}
				}
			}
			removeAtindex();
			if (is_editMode) {
				const editedSkillData = [...editSkillData];
				editedSkillData.splice(index, 1);
				setEditSkillData(editedSkillData);
			}
		}
	};
	return (
		<StyledSkills>
			<div className="card-title">Skill</div>
			{skillsIds.map((uniqueId, index) => {
				return (
					<AddSkills
						key={uniqueId}
						onDelete={() => handleDeleteSkills(index)}
						index={index}
						editFormData={id && editSkillData}
					/>
				);
			})}
			<StyledAddButton onClick={handleAddSkills}
			data-qa-automation="adContractadskillbtn"
			
			>
				<img src={AddIcon} alt="add-icon" className="Add-icon" />
				Add New Skill
			</StyledAddButton>
		</StyledSkills>
	);
};

export default Skills;
