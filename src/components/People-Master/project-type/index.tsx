import { FC, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import { getDefaultIfEmpty } from '../../../../src/utils/index';
import { StyledButton , StyledList , StyledDiv} from '../projectstyle';
import {  StyledLabel} from '../../../styles/global';
import PaginationComp from '../../pagination';
import AddIcon from '../../../assets/icons/material-symbols_add.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import edit from '../../../assets/icons/edit.svg';
import { NullableParam } from '../../../types/index';
import DeleteSkill from '../../Delete-popup/index';
import { useGlobalSnackbar } from '../../../hooks/globalHelpers';
import AddList from './Addmodal'
import {useDeleteprojectTypeMutation, useGetprojectTypeQuery} from '../../../redux/services/Project/type'

const ProjectType: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [typeId, setTypeId] = useState(0);
	const [typeData, setTypeData] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { showSnackbar } = useGlobalSnackbar();
	const { data, isLoading, refetch } = useGetprojectTypeQuery({ page: currentPage });

	const[DeleteDomain,{isLoading:deleteIsLoading}]=useDeleteprojectTypeMutation()

	const openModal = () => {
		setIsModalOpen(true);
	};

	const openDeleteModal = (id?: NullableParam<number>) => {
		setIsDeleteModalOpen(true);
		id && setTypeId(id);
	};
	const totalPages = data?.totalCount?Math.ceil(data.totalCount/5) : 1;
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
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
		setTypeData(item); 
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
			await DeleteDomain(typeId).unwrap();
			showSnackbar('Project Type deleted successfully', 'success');
			closeEditModal();
			refetch();
		} catch (error) {
			showSnackbar('Project Type deletion error!', 'error');
		}
	};


	return (
		<StyledList>
			<div className="heading space-between">
			<text>Project Type</text>
			<StyledDiv>
			  <StyledButton onClick={openModal}>
				<img className="icon-add" src={AddIcon} alt="Add Icon" />
			  </StyledButton>
			</StyledDiv>
		  </div>
			<Table className="table">
			  <TableBody className="table-body">
			  {data?.data?.map((type:any) => (
					<TableRow key={type.id} className="content-row space-between">
					  <TableCell className="field-title content wrap">
						<StyledLabel>Project Type </StyledLabel>
						{getDefaultIfEmpty(type.projectTypeName)}
					  </TableCell>
					  <StyledDiv>
						<TableCell className="content-edit">
						  <img
							className="icon-edit"
							src={edit}
							alt="Edit Icon"
							onClick={() => handleClickUpdate('edit', type)}
						  />
						</TableCell>
						<TableCell>
						  <img
							className="icon-delete"
							src={DeleteIcon}
							alt="Delete Icon"
							onClick={() => openDeleteModal(type.id)}
						  />
						</TableCell>
					  </StyledDiv>
					</TableRow>
				 ))}
				
			  </TableBody>
			</Table>
		  <AddList
			open={isModalOpen}
			onClose={closeModal}
			editMode={editMode}
			typeData={editMode ? typeData : null}
		  />
		  <DeleteSkill
			open={isDeleteModalOpen}
			onClose={closeEditModal}
			description="Are you sure you want to delete this Project Type?"
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
	  
	)};
	
	export default ProjectType;