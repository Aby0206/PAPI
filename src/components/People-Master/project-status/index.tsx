import { FC, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import PaginationComp from '../../pagination';
import { StyledButton , StyledDiv,StyledList } from '../projectstyle';
import {  StyledLabel} from '../../../styles/global';
import AddIcon from '../../../assets/icons/material-symbols_add.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import edit from '../../../assets/icons/edit.svg';
import DeleteSkill from '../../Delete-popup/index';
import { useGlobalSnackbar } from '../../../hooks/globalHelpers';
import AddList from './Addmodal'
import { getDefaultIfEmpty } from '../../../../src/utils/index';
import {useGetProjectStatusQuery ,useDeleteProjectStatusMutation } from '../../../redux/services/Project/status'

interface ProjectStatus{
	id:number;
	statusName:string;
}


const ProjectStatus: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusId,setStatusId]=useState(0)
	const [editMode, setEditMode] = useState(false);
	const [statusData, setStatusData] = useState();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { showSnackbar } = useGlobalSnackbar();
	const { data , isLoading , refetch} = useGetProjectStatusQuery({ page: currentPage });
	const[DeleteStatus,{isLoading:deleteIsLoading}]=useDeleteProjectStatusMutation()
	const totalPages = data?.totalCount?Math.ceil(data.totalCount/5) : 1;
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const openDeleteModal = (id:number) => {
		setIsDeleteModalOpen(true);
		 id && setStatusId(id);
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
		setStatusData(item); 
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
			await DeleteStatus(statusId).unwrap();
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
				<text>Project Status</text>
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
    data?.data
      ?.slice()
      .sort((a:any, b:any) => a.id === 1 ? -1 : b.id === 1 ? 1 : 0)
      .map((status: any) => (
        <TableRow key={status.id} className="content-row space-between">
          <TableCell className="field-title content wrap">
            <StyledLabel>Project Status</StyledLabel>
            <>{getDefaultIfEmpty(status.statusName)}</>
          </TableCell>
          <StyledDiv>
            <TableCell className="content-edit">
              {status.id === 1 ? (
               <>{null}</>
              ) : (
                <img
                  className="icon-edit"
                  src={edit}
                  alt="Edit"
                  onClick={() => handleClickUpdate('edit', status)}
                />
              )}
            </TableCell>
            <TableCell>
              {status.id === 1 ? (
               <>{null}</>
              ) : (
                <img
                  className="icon-delete"
                  src={DeleteIcon}
                  alt="Delete"
                  onClick={() => openDeleteModal(status.id)}
                />
              )}
            </TableCell>
          </StyledDiv>
        </TableRow>
      ))
  }
</TableBody>


				</Table>
				</>
				<AddList
					open={isModalOpen}
					onClose={closeModal}
					editMode={editMode}
					statusData={(editMode)?statusData:null}
					
				/>

			<DeleteSkill
				open={isDeleteModalOpen}
				onClose={closeEditModal}
				description="Are you sure you want to delete this Project Status?"
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
export default ProjectStatus;
