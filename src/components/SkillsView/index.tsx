import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import UpIcon from '../../assets/icons/up-arrow-icon.svg';
import DownIcon from '../../assets/icons/down-arrow-icon.svg';
import NoListFound from '../No-list-found';
import {StyledLabel} from '../../styles/global'

interface SkillViewProps {
	data: SkillData | undefined;
	handleClickUpdate: (action:string,skill: Skill,) => void;
	handleSortChange: (sortingOrder: string) => void;
	searchQuery?: string;
	isSuccess?: boolean;
}

interface SkillData {
	total_count: number;
	results: {
		item_count: number;
		data: Skill[];
	};
}
interface Skill {
	id: number;
	name: string;
	total_employee: number;
	status: boolean;
	category: {
		id: number;
		category: string;
		status: boolean;
	};
}

const SkillView: React.FC<SkillViewProps> = ({
	data,
	handleClickUpdate,
	handleSortChange,
	searchQuery,
	isSuccess,
}) => {
	const [orderBy, setOrderBy] = useState('');

	useEffect(() => {
		handleSortChange(orderBy);
	}, [orderBy]);

	type skillItemProps = {
		id: number;
		name: string;
		total_employee: number;
		status: boolean;
		category: {
			id: number;
			category: string;
			status: boolean;
		};
	};
	return (
		<>
			{(data?.results?.data?.length ?? 0) > 0 ? (
				<TableContainer component={Paper} className="custom-paper">
					<Table>
						<colgroup>
							<col width="30%" />
							<col width="30%" />
							<col width="18%" />
							<col width="20%" />
							
						</colgroup>
						<TableHead>
							<TableRow className="head-row">
								<TableCell className="head-title skill">
									<div className="title-container">
										<span>Skill</span>
										<div className="icon-container">
											<img
												src={UpIcon}
												alt="sortby-name-icon"
												className={
													(orderBy == 'name' && 'active-icon-wrapper') ||
													'inactive-icon-wrapper'
												}
												onClick={() => setOrderBy('name')}
												data-qa-automation="skillListSkillSortupbtn"

											/>
											<img
												src={DownIcon}
												alt="sortby-name-icon"
												onClick={() => setOrderBy('-name')}
												className={
													(orderBy == '-name' && 'active-icon-wrapper') ||
													'inactive-icon-wrapper'
												}
												data-qa-automation="skillListSkillSortdownbtn"

											/>
										</div>
									</div>
								</TableCell>
								<TableCell className="head-title category">
									<div className="title-container">
										<span>Skill Category</span>
										<div className="icon-container">
											<img
												src={UpIcon}
												alt="sortby-category-icon"
												className={
													(orderBy == 'category' && 'active-icon-wrapper') ||
													'inactive-icon-wrapper'
												}
												onClick={() => setOrderBy('category')}
												data-qa-automation="skillListCateSortupbtn"

											/>
											<img
												src={DownIcon}
												alt="sortby-category-icon"
												onClick={() => setOrderBy('-category')}
												className={
													(orderBy == '-category' && 'active-icon-wrapper') ||
													'inactive-icon-wrapper'
												}
												data-qa-automation="skillListCateSortdownbtn"

											/>
										</div>
									</div>
								</TableCell>
								<TableCell className="head-title">Total Employees</TableCell>
								<TableCell className="head-title status">Status</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.results?.data?.map((skill: skillItemProps) => (
								<TableRow className="content-row" key={skill.id}>
									<TableCell className='skill wrap '><StyledLabel>Skill</StyledLabel>{skill.name}</TableCell>
									<TableCell className='category wrap'><StyledLabel>Skill Category </StyledLabel>{skill?.category?.category || '-'}</TableCell>
									<TableCell className='total-employee wrap'><StyledLabel>Total Employees</StyledLabel>{skill?.total_employee || '-'}</TableCell>
									<TableCell className="status-cell status wrap">
										<div className="status-wrapper">
											<div
												className={
													skill?.status
														? 'active-button-wrap'
														: 'inactive-button-wrap'
												}
											>
												<span
													className={
														skill?.status
															? 'active-button-icon'
															: 'inactive-button-icon'
													}
												/>
												<span
													className={
														skill?.status
															? 'active-button-text'
															: 'inactive-button-text'
													}
												>
													{skill.status ? 'Active' : 'Inactive'}
												</span>
											</div>
											<div className="icon-container">
											<button
												className="edit-btn"
												onClick={() => handleClickUpdate('edit', skill)}
											>
												<img src={EditIcon} alt="edit-skill-icon" />
											</button>
											<button
												className="edit-btn"
												onClick={() => handleClickUpdate('delete',skill)}
											>
												<img src={DeleteIcon} alt="delete-skill-icon" />
											</button>
										</div>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : ( isSuccess &&
				<NoListFound
					isSearch={searchQuery?.trim()?.length != 0}
				/>
			)}
		</>
	);
};

export default SkillView;
