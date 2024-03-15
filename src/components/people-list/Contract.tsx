import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
} from '@mui/material';
import {
	StyledList,
	StyledWrap,
	StyledInputWrap,
} from '../../pages/skill-master/styledComponents';
import AddIcon from '../../assets/icons/material-symbols_add.svg';
import SettingIcon from '../../assets/icons/settings.svg';
import SearchIcon from '../../assets/icons/search.svg';
import EditIcon from '../../assets/icons/edit.svg';
import PaginationComp from '../pagination';
import {
	useGetPaginatedPeopleByTypeQuery,
	Filters,
} from '../../redux/services/Peoples';
import { Link} from 'react-router-dom';
import FilterModal from './FilterModal';
import NoListFound from '../No-list-found';

const ContractListing: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [filters, setFilters] = useState<Filters>({});

	const { data, isLoading, refetch } = useGetPaginatedPeopleByTypeQuery({
		userType: 'contract',
		page: currentPage,
		searchQuery,
		filters,
	});

	const applyFilters = (newFilters: Filters) => {
		setFilters(newFilters);
		setCurrentPage(1);
		toggleFilterModal();
	};
	const handleReset = () => {
		setFilters({});
		
	};

	useEffect(() => {
		refetch();
	}, [filters]);

	const totalPages = data?.total_count ? Math.ceil(data.total_count / 10) : 1;
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};
	const toggleFilterModal = () => {
		setIsFilterModalOpen(!isFilterModalOpen);
	};

	return (
		<StyledWrap>
			<StyledInputWrap>
				<div className="search-bar">
					<div className="search-div">
						<img src={SearchIcon} alt="SearchIcon" />
						<input
							className="search-input"
							placeholder="Search Employees..."
							value={searchQuery}
							onChange={handleSearchChange}
							data-qa-automation="contractSearch"
							 
						/>
					</div>
					<button className="filter-btn" onClick={toggleFilterModal} data-qa-automation="contractFilterButton">
						<img src={SettingIcon} alt="SettingIcon" />
					</button>
					<FilterModal
						isOpen={isFilterModalOpen}
						onClose={toggleFilterModal}
						onApply={applyFilters}
						onReset={handleReset}
						initialFilters={filters}
						data-qa-automation="contractfilterModal"
					/>
				</div>
				<Link to="contractor-create">
					<button className="fn-btn" data-qa-automation="addContractorButton">
						<img src={AddIcon} alt="AddIcon" />
						<span> Add Contractor</span>
					</button>
				</Link>
			</StyledInputWrap>

			<StyledList>
				{isLoading ? (
					<div style={{ textAlign: 'center' }}>
						<CircularProgress sx={{ color: '#4ABD95' }} />
					</div>
				) : (
					<>
						{(data?.results?.data?.length ?? 0) > 0 ? (
							<TableContainer component={Paper} className="custom-paper">
								<Table>
									<TableHead>
										<TableRow className="head-row">
											<TableCell className="head-title">ID</TableCell>
											<TableCell className="head-title name">Name</TableCell>
											<TableCell className="head-title title">Title</TableCell>
											<TableCell className="head-title">Department</TableCell>
											<TableCell className="head-title">Experience</TableCell>
											<TableCell className="head-title">
												Reporting Manager
											</TableCell>
											<TableCell className="head-title">
												Contact Number
											</TableCell>
											<TableCell className="head-title">Email</TableCell>
											<TableCell className="head-title status">
												Status
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data?.results?.data?.map((person) => (
											<TableRow className="content-row" key={person.id}>
												<TableCell>{person.employee_id}</TableCell>
												<TableCell className="name">
													<Link
														to={`/home/contract?id=${person.id}&type=Contract`}
													>
														{person?.full_name}
													</Link>
												</TableCell>
												<TableCell className="title">
													{person?.designation?.name || '-'}
												</TableCell>
												<TableCell>{person?.department?.name || '-'}</TableCell>
												<TableCell>{person?.experience || '-'}</TableCell>
												<TableCell>
													{person?.reporting_manager?.full_name || '-'}
												</TableCell>
												<TableCell>{person?.phone || '-'}</TableCell>
												<TableCell>{person?.email || '-'}</TableCell>
												<TableCell className="status-cell status">
													<div
														className={
															person?.status
																? 'active-button-wrap'
																: 'inactive-button-wrap'
														}
													>
														<span
															className={
																person?.status
																	? 'active-button-icon'
																	: 'inactive-button-icon'
															}
														/>
														<span
															className={
																person?.status
																	? 'active-button-text'
																	: 'inactive-button-text'
															}
														>
															{person.status ? 'Active' : 'Inactive'}
														</span>
													</div>
													<Link
														to={`contractor-edit/${person.contract_user_id}`}
													>
														<button className="edit-btn"
														data-qa-automation="contractorEditButton"
														>
															<img src={EditIcon} alt="Edit-icon" />
														</button>
													</Link>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							<NoListFound isSearch={true} />
						)}

						{(data?.results?.data?.length ?? 0) > 0 && (
							<div className="pagination-wrap">
								<PaginationComp
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={handlePageChange}
									data-qa-automation="contractEmpPagination"
								/>
							</div>
						)}
					</>
				)}
			</StyledList>
		</StyledWrap>
	);
};

export default ContractListing;
