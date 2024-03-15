import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { StyledList, StyledInputWrap, StyledWrap, StyledContainer } from './styledComponents';
import AddIcon from '../../assets/icons/material-symbols_add.svg';
import SettingIcon from '../../assets/icons/settings.svg';
import SearchIcon from '../../assets/icons/search.svg';
import PaginationComp from '../../components/pagination';
import ErrorView from '../../components/Error';
import { useGetPaginatedSkillQuery, Filters } from '../../redux/services/Skill';
import SkillsView from '../../components/SkillsView';
import ReuseFilterModal, { CustomSelectConfig } from '../../components/Filter';
import { useGetSkillCategoryListQuery } from '../../redux/services/Contractors';
import AddNewSkill from '../../components/Add-skill-master';
import DeleteSkill from '../../components/Delete-skill-master';
import Constants from '../../../src/utils/Constants';
import Title from '../../components/Title/title';

interface State {
	currentPage: number;
	searchQuery: string;
	isLoading: boolean;
	orderBy: string;
}

const selectConfigs: CustomSelectConfig[] = [
	{
		label: 'Skill Category',
		valueKey: 'id',
		optionsKey: 'category',
		fieldName: 'category',
		search: true,
		placeholder: 'Search a Skill Category',
		displayProperty: 'category',
	},
	{
		label: 'Status',
		valueKey: 'value',
		optionsKey: 'status',
		fieldName: 'status',
		search: false,
		placeholder: 'Search a Status',
		displayProperty: 'name',
	},
];
type skillItemProps = {
	id: number;
	  name: string | null;
	category: {
		id: number;
		category: string | null;
    status: boolean;
	};
	total_employee: number;
	status: boolean;
};

const SkillMaster: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<State['currentPage']>(1);
	const [searchQuery, setSearchQuery] = useState<State['searchQuery']>('');
	const [orderBy, setOrderBy] = useState<State['orderBy']>('');
	const [filters, setFilters] = useState<Filters>({ status: true});
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [searchFilterQuery, setSearchFilterQuery] = useState({
		category: '',
	});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false) ;
	const [editMode, setEditMode] = useState(false);
	const [skillData, setSkillData] = useState<skillItemProps>();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false) ;

	const category = useGetSkillCategoryListQuery({ searchQuery: searchFilterQuery.category }).data;

	let options = { status: Constants.STATUS_DATA, category: category };

	const { data, isLoading,isFetching, refetch, isError, isSuccess, error } =
		useGetPaginatedSkillQuery({
			page: currentPage,
			searchQuery,
			orderBy,
			filters,
		});

	const totalPages =
		(data?.total_count && Math.ceil(data.total_count / 10)) || 1;
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};

	const filterSearchChange = (query:string,fieldname:string) => {
		fieldname && setSearchFilterQuery((prevQueries) => ({
			...prevQueries,
			[fieldname]: query,
		}));
	};

	const handleSortChange = (sortingOrder: string) => {
		setOrderBy(sortingOrder);
	};

	const handleApplyFilters = (newFilters: any) => {
		setFilters({ ...filters, ...newFilters });
		setSearchFilterQuery({category:''});
	};
	const handleReset = () => {
		setFilters({status:true});
		
	};
	const toggleFilterModal = () => {
		setIsFilterModalOpen(!isFilterModalOpen);
		setSearchFilterQuery({category:''});
	};
	const updateModal=()=>{
		setIsModalOpen(!isModalOpen);
	}
	const handleClickAdd = () => {
		updateModal ()
		setEditMode(false);
	};
	const handleClickUpdate = (action:string,item: skillItemProps,) => {
		setSkillData(item);
		if(action==='edit'){
			setEditMode(true);
			updateModal ()
		}else{
			setIsDeleteModalOpen(true);
		}
	};

	const closeModal = () => {
		setEditMode(false);
		updateModal ()

	};
	const closeEditModal = () => {
		 setIsDeleteModalOpen(false)
	};
	
	const onSuccess=()=>{
		refetch();
	}
	const retry = () => {
		refetch();
	};
	
	return (
		<StyledContainer>
			 <Title title='Skill Master'/>
			<StyledWrap>
				<StyledInputWrap>
					<div className="search-bar">
						<div className="search-div">
							<img src={SearchIcon} alt="SearchIcon" />
							<input
								className="search-input"
								placeholder="Search Skill..."
								value={searchQuery}
								onChange={handleSearchChange}
								data-testid="search"
								data-qa-automation="skillListSearchinput"	

							/>
						</div>
						<button className="filter-btn" onClick={toggleFilterModal} 
						data-qa-automation="skillListFilterbtn"
						>
							<img src={SettingIcon} alt="filter-icon" />
						</button>
						<ReuseFilterModal
							isOpen={isFilterModalOpen}
							onClose={toggleFilterModal}
							onApply={handleApplyFilters}
							onReset={handleReset}
							searchChange={filterSearchChange}
							initialFilters={filters}
							selectConfigs={selectConfigs}
							fetchOptions={options}
							loading={isFetching}
							data-qa-automation="skillListReuseFilter"

						/>
					</div>
					<button
						className="fn-btn"
						onClick={() => handleClickAdd()}
						data-qa-automation="skillListAddSkillbtn"
					>
						<img src={AddIcon} alt="add-icon" />
						<span> Add Skill/Skill Category</span>
					</button>
				</StyledInputWrap>
				<StyledList>
					{isLoading ? (
						<div style={{ textAlign: 'center' }}>
							<CircularProgress sx={{ color: '#4ABD95' }} />
						</div>
					) : (
						<>
							<SkillsView
								data={data}
								isSuccess={isSuccess}
								handleClickUpdate={handleClickUpdate}
								handleSortChange={handleSortChange}
								searchQuery={searchQuery}
							/>
							{isError && <ErrorView retry={retry} error={error} />}

							{(data?.results?.data?.length ?? 0) > 0 && (
								<div className="pagination-wrap">
									<PaginationComp
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
							            data-qa-automation="skillListPagination"
									/>
								</div>
							)}
						</>
					)}
					<AddNewSkill
						open={isModalOpen}
						onClose={closeModal}
						editMode={editMode}
						onSuccess={onSuccess}
						skillData={(editMode) ? skillData : null}
						data-qa-automation="skillListNewSkilModal"

					/>
					<DeleteSkill 
						open={isDeleteModalOpen}
						onClose={closeEditModal}
						skillData={skillData}
						onSuccess={onSuccess}
						data-qa-automation="skillListDeleteskilModal"

					/>
				</StyledList>

			</StyledWrap>
		</StyledContainer>
	);
};

export default SkillMaster;

