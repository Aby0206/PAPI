import { FC, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { StyledButton, StyledDiv } from './styledComponents';
import { StyledList, StyledLabel } from '../../styles/global';
import CustomRating from '../custom-rating';
import Pagination from '../pagination';
import AddIcon from '../../assets/icons/material-symbols_add.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import edit from '../../assets/icons/edit.svg';
import info from '../../assets/icons/info.svg';
import AddNewSkill from '../Add-new-skills';
import { useGetUserSkillsQuery } from '../../redux/services/EmployeeDetailsApi';
import { getDefaultIfEmpty } from '../../../src/utils/index';
import { NullableParam, Skill } from '../../types/index';
import DeleteSkill from '../Delete-popup/index';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import { useDeleteUserSkillMutation } from '../../redux/services/Skill';
import { getValueWithLabel} from '../../utils/index';
import NoListFound from '../No-list-found';
import DynamicTooltip from "../Tooltip/index";
import { useGetProficienyQuery } from '../../redux/services/Proficiency';
import Avatar from '@mui/material/Avatar';


type InfoCardProps = {
	id?: NullableParam<string>;
	userType: string;
};

const UserSkills: FC<InfoCardProps> = ({ id, userType }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [skillId, setSkillId] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [skillData, setSkillData] = useState<Skill | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [userDeleteSkill, { isLoading: deleteIsLoading }] =
		useDeleteUserSkillMutation();
	const { showSnackbar } = useGlobalSnackbar();
	const { data, isLoading, refetch } = useGetUserSkillsQuery({
		id,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
	}, [editMode, isModalOpen]);

	const skills = data?.results?.data;
	const totalPages = data?.total_count ? Math.ceil(data.total_count / 5) : 1;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const handleEditMode = () => {
		setEditMode(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};

	const openDeleteModal = (id?: NullableParam<number>) => {
		setIsDeleteModalOpen(true);
		id && setSkillId(id);
	};

	const closeEditModal = () => {
		setIsDeleteModalOpen(false);
	};

	const updateSkill = (skillDetail: Skill) => {
		setEditMode(true);
		setSkillData(skillDetail);
		openModal();
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setEditMode(false);
	};

  const { data: Proficiency } = useGetProficienyQuery(null);

	const convertExperience = (
		year?: NullableParam<number>,
		month?: NullableParam<number>
	) => {
		let years = getValueWithLabel(year, 'year', 'year(s)');
		let months = getValueWithLabel(month, 'month', 'month(s)');
		return years + ' ' + months;
	};

	function getTooltipTitle (rating?:NullableParam<number>){
		let data=Proficiency?.results?.toReversed()||[];
		return data?.[rating?(rating-1):0]?.description||'Rating details unavailable!'
		 
	}

	const onDelete = async () => {
		try {
			await userDeleteSkill(skillId).unwrap();
			showSnackbar('Skill deleted successfully', 'success');
			closeEditModal();
			refetch();
		} catch (error) {
			showSnackbar('Skill deletion error!', 'error');
		}
	};

	return (
		<StyledList>
			<div className="heading space-between">
				<text>Skills</text>
				{userType === 'Regular' && (
					<StyledDiv>
						<StyledButton onClick={openModal} data-qa-automation="addSkillbtnEmpDetails">
							<img className="icon-add" src={AddIcon} />
							<text className="button-text">Add Skill</text>
						</StyledButton>
					</StyledDiv>
				)}
			</div>
			{isLoading ? (
				<TableRow>
					<TableCell colSpan={4}>Loading...</TableCell>
				</TableRow>
			) : (
				(skills && skills.length > 0 && (
					<>
						<Table className="table">
							<col width="30%" />
							<col width="25%" />
							<col width="20%" />
							<col width="25%" />
							<TableHead>
								<TableRow className="head-row">
									<TableCell className="field-title">Skill Category</TableCell>
									<TableCell className="field-title">Skill</TableCell>
									<TableCell className="field-title">Experience</TableCell>
									<TableCell className="field-title">Proficiency</TableCell>
								</TableRow>
							</TableHead>
							<TableBody className="table-body">
								{skills.map((item: Skill) => {
									return (
										<TableRow key={item.id} className="content-row">
											<TableCell className="field-title content wrap">
												<StyledLabel>Skill Category </StyledLabel>
												{getDefaultIfEmpty(item?.category)}
											</TableCell>

											<TableCell className="field-title content wrap">
												<StyledLabel>Skill </StyledLabel>
												{getDefaultIfEmpty(item?.skill)}
											</TableCell>
											<TableCell className="field-title content wrap">
												{' '}
												<StyledLabel>Experience </StyledLabel>
												{convertExperience(
													item?.years_of_experience,
													item?.months_of_experience
												)}
											</TableCell>
											<TableCell className="field-title content wrap">
												<StyledLabel>Proficiency </StyledLabel>
												<div className="rating">
													<CustomRating
													readOnly={true}
														value={item?.rating ? item?.rating : 0}
													/>
                          <DynamicTooltip title={getTooltipTitle(item.rating)} placement="top">
                            <img className="info-icon" src={info} />
                          </DynamicTooltip>
													
												</div>
											</TableCell>
											{userType === 'Regular' && (
												<StyledDiv>
													<TableCell className="content-edit">
														<img
															className="icon-edit"
															src={edit}
															onClick={() => {
																updateSkill(item);
															}}
														/>
													</TableCell>
													<TableCell>
														<img
															className="icon-delete"
															src={DeleteIcon}
															onClick={() => openDeleteModal(item.id)}
														/>
													</TableCell>
												</StyledDiv>
											)}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
						<div className="pagination-wrap">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					</>
				)) || <NoListFound title="Skill" />
			)}
			<AddNewSkill
				open={isModalOpen}
				onClose={closeModal}
				editMode={editMode}
				handleEditMode={handleEditMode}
				skillData={editMode ? skillData : null}
				id={id}
			/>
			<DeleteSkill
				open={isDeleteModalOpen}
				onClose={closeEditModal}
				description="Are you sure you want to delete this skill?"
				onDelete={onDelete}
				isLoading={deleteIsLoading}
			/>

		</StyledList>
	);
};

export default UserSkills;
