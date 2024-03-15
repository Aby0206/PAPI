import { FC, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import { getDefaultIfEmpty } from '../../../../src/utils/index';
import { StyledButton , StyledDiv,StyledList , StyledWrap} from '../projectstyle';
import { StyledLabel} from '../../../styles/global';
import Pagination from '../../pagination';
import AddIcon from '../../../assets/icons/material-symbols_add.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import edit from '../../../assets/icons/edit.svg';
import { NullableParam} from '../../../types/index';
import DeleteSkill from '../../Delete-popup/index';
import { useGlobalSnackbar } from '../../../hooks/globalHelpers';
import AddList from './Addmodal'
import {useGetBillingTypeQuery,useDeleteBillingTypeMutation} from '../../../redux/services/Project/billing'
import PaginationComp from '../../pagination';


const BillingType: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [billingId, setBillingId] = useState(0);
	const [billingData, setBillingData] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { showSnackbar } = useGlobalSnackbar();
	const { data , isLoading , refetch} = useGetBillingTypeQuery({ page: currentPage });

	const[DeleteDomain,{isLoading:deleteIsLoading}]=useDeleteBillingTypeMutation()
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
		id && setBillingId(id);
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
		setBillingData(item); 
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
			await DeleteDomain(billingId).unwrap();
			showSnackbar('Billing Type deleted successfully', 'success');
			closeEditModal();
			refetch();
		} catch (error) {
			showSnackbar('Billing Type deletion error!', 'error');
		}
	};


	return (
					<StyledList>
					<div className="heading space-between">
				<text>Billing Type</text>
					<StyledDiv>
						<StyledButton onClick={openModal}>
							<img className="icon-add" src={AddIcon} />
						</StyledButton>
					</StyledDiv>
			
			    </div>
						<Table className="table">
							<TableBody className="table-body">
							

							{
							data?.data?.map((billing: any) => (
							  <TableRow key={billing.id} className="content-row space-between">
								<TableCell className="field-title content wrap">
								  <StyledLabel>billing</StyledLabel>
								  <>{getDefaultIfEmpty(billing.billingTypeName)}</>
								</TableCell>
								<StyledDiv>
								  <TableCell className="content-edit">
									<img
									  className="icon-edit"
									  src={edit}
									  onClick={() => handleClickUpdate('edit',billing)}
									/>
								  </TableCell>
								  <TableCell>
									<img
									  className="icon-delete"
									  src={DeleteIcon}
									  onClick={() => openDeleteModal(billing.id)}
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
					billingData={(editMode)?billingData:null}
					
				/>
			<DeleteSkill
				open={isDeleteModalOpen}
				onClose={closeEditModal}
				description="Are you sure you want to delete this Billing Type?"
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
export default BillingType;
