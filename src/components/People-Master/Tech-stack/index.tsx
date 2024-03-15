import { FC, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import { getDefaultIfEmpty } from '../../../../src/utils/index';
import { StyledButton , StyledDiv,StyledList } from '../projectstyle';
import {  StyledLabel} from '../../../styles/global';
import Pagination from '../../pagination';
import AddIcon from '../../../assets/icons/material-symbols_add.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import edit from '../../../assets/icons/edit.svg';
import { NullableParam } from '../../../types/index';
import DeleteSkill from '../../Delete-popup/index';
import { useGlobalSnackbar } from '../../../hooks/globalHelpers';
import AddList from './Addmodal'
import PaginationComp from '../../pagination';

import {useGetTechnologyStackQuery,useDeleteTechnologyStackMutation} from '../../../redux/services/Project/stack'


const Domain: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [stackId, setStackId] = useState(0);
	const [stackData, setStackData] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { showSnackbar } = useGlobalSnackbar();
	const { data , isLoading , refetch} = useGetTechnologyStackQuery({ page: currentPage });

	const[DeleteDomain,{isLoading:deleteIsLoading}]=useDeleteTechnologyStackMutation()

	const openModal = () => {
		setIsModalOpen(true);
	};
	const totalPages = data?.totalCount?Math.ceil(data.totalCount/5) : 1;
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const openDeleteModal = (id?: NullableParam<number>) => {
		setIsDeleteModalOpen(true);
		id && setStackId(id);
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
		setStackData(item); 
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
			await DeleteDomain(stackId).unwrap();
			showSnackbar('Stack deleted successfully', 'success');
			closeEditModal();
			refetch();
		} catch (error) {
			showSnackbar('Stack deletion error!', 'error');
		}
	};


	return (
		<StyledList style={{width:"32.5%"}}>
			<div className="heading space-between">
				<text>Technology Stack</text>
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
							data?.data?.map((stack: any) => (
							  <TableRow key={stack.id} className="content-row space-between">
								<TableCell className="field-title content wrap">
								  <StyledLabel>stack</StyledLabel>
								  <>{getDefaultIfEmpty(stack.technologyStackName)}</>
								</TableCell>
								<StyledDiv>
								  <TableCell className="content-edit">
									<img
									  className="icon-edit"
									  src={edit}
									  onClick={() => handleClickUpdate('edit',stack)}
									/>
								  </TableCell>
								  <TableCell>
									<img
									  className="icon-delete"
									  src={DeleteIcon}
									  onClick={() => openDeleteModal(stack.id)}
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
					stackData={(editMode)?stackData:null}
					
				/>

			<DeleteSkill
				open={isDeleteModalOpen}
				onClose={closeEditModal}
				description="Are you sure you want to delete this Technology Stack?"
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
