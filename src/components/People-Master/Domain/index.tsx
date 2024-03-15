import { FC, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import { getDefaultIfEmpty } from '../../../../src/utils/index';
import { StyledButton , StyledDiv,StyledList} from '../projectstyle';
import { StyledLabel} from '../../../styles/global';
import AddIcon from '../../../assets/icons/material-symbols_add.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import edit from '../../../assets/icons/edit.svg';
import { NullableParam } from '../../../types/index';
import DeleteSkill from '../../Delete-popup/index';
import { useGlobalSnackbar } from '../../../hooks/globalHelpers';
import AddList from './Addmodal'
import {useGetProjectDomainQuery,useDeleteProjectDomainMutation} from '../../../redux/services/Project/domain'
import PaginationComp from '../../pagination';


const Domain: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [domainId, setDomainId] = useState(0);
	const [domainData, setDomainData] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { showSnackbar } = useGlobalSnackbar();
	const { data , isLoading , refetch} = useGetProjectDomainQuery({ page: currentPage });

	const[DeleteDomain,{isLoading:deleteIsLoading}]=useDeleteProjectDomainMutation()
	const totalPages = data?.totalCount?Math.ceil(data.totalCount/5) : 1;
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
		id && setDomainId(id);
	};

	const closeEditModal = () => {
		setIsDeleteModalOpen(false);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditMode(false);
	};
	const updateModal=()=>{
		setIsModalOpen(!isModalOpen);
	}
	const handleClickUpdate = (action: string, item: any) => {
		setDomainData(item); 
		if (action === 'edit') {
		  setEditMode(true);
		  updateModal();
		} else {
		  setIsDeleteModalOpen(true);
		}
	  };
	  useEffect(() => {
		refetch();
	}, [editMode, isModalOpen]);
	const onDelete = async () => {
		try {
			await DeleteDomain(domainId).unwrap();
			showSnackbar('Domain deleted successfully', 'success');
			closeEditModal();
			refetch();
		} catch (error) {
			showSnackbar('Domain deletion error!', 'error');
		}
	};


	return (
		<StyledList>
			<div className="heading space-between">
				<text>Domain</text>
				
					<StyledDiv>
						<StyledButton onClick={openModal}>
							<img className="icon-add" src={AddIcon} />
						</StyledButton>
					</StyledDiv>
			
			</div>

		
					<>
						<Table className="table">
							<TableBody className="table-body">
							

							{
							data?.data?.map((domain: any) => (
							  <TableRow key={domain.id} className="content-row space-between">
								<TableCell className="field-title content wrap">
								  <StyledLabel>Domain</StyledLabel>
								  <>{getDefaultIfEmpty(domain.domainName)}</>
								</TableCell>
								<StyledDiv>
								  <TableCell className="content-edit">
									<img
									  className="icon-edit"
									  src={edit}
									  onClick={() => handleClickUpdate('edit',domain)}
									/>
								  </TableCell>
								  <TableCell>
									<img
									  className="icon-delete"
									  src={DeleteIcon}
									  onClick={() => openDeleteModal(domain.id)}
									/>
								  </TableCell>
								</StyledDiv>
							  </TableRow>
							))}
				</TableBody>
				</Table>
				</>
				<AddList
					open={isModalOpen}
					onClose={closeModal}
					editMode={editMode}
					domainData={(editMode)?domainData:null}
					
				/>

			<DeleteSkill
				open={isDeleteModalOpen}
				onClose={closeEditModal}
				description="Are you sure you want to delete this Domain?"
				onDelete={onDelete}
				isLoading={deleteIsLoading}
				
			/>
			 {(data?.data.length??0) > 0 && (
	  <PaginationComp
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
   
   )}	
		</StyledList>
	);
};
export default Domain;
