import React, { useState } from 'react';
import { StyledWrap, StyledList } from './styledComponents';
import EditProficiencyModal from '../EditProficiency';
import TableView from './TableView';
import {
	useUpdateProficienyMutation,
	useGetProficienyQuery,
	PayloadProps,
} from '../../redux/services/Proficiency';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import Constants from '../../../src/utils/Constants';
import ErrorView from '../Error';
import { CircularProgress } from '@mui/material';
import Title from '../../components/Title/title';
import Breadcrumb from '../BreadCrumb';
interface Proficiency {
	id: number;
	rating: number;
	description: string;
}

const ProfiencyListing: React.FC = () => {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
	const [selectedData, setSelectedData] = useState<Proficiency | null>(null);

	const { showSnackbar } = useGlobalSnackbar();
	const [EditProficiency] = useUpdateProficienyMutation();

	const { data, isLoading, isError, error, refetch } =
		useGetProficienyQuery(null);

	const onItemClick = (item: Proficiency) => {
		setSelectedData(item);
		setFilterModal();
	};

	const setFilterModal = () => {
		setIsFilterModalOpen(!isFilterModalOpen);
	};

	const updateProficiency = async (id: number, data: PayloadProps) => {
		const responseData = await EditProficiency({
			id: id,
			payload: data,
		}).unwrap();
		if (responseData) {
			showSnackbar(
				responseData?.detail ?? '',
				responseData?.success ? 'success' : 'error'
			);
			refetch();
		} else {
			showSnackbar(Constants.ERROR_MESSAGE, 'error');
		}
	};

	const retry = () => {
		refetch();
	};
	return (
		<>
			<Breadcrumb />
			<StyledWrap>
				<Title title="Proficiency Level"></Title>
				<StyledList>
					{isError && <ErrorView retry={retry} error={error} />}
					{isLoading ? (
						<div style={{ textAlign: 'center' }}>
							<CircularProgress sx={{ color: '#4ABD95' }} />
						</div>
					) : (
						<TableView data={data?.results} onItemClick={onItemClick} />
					)}

					<EditProficiencyModal
						isOpen={isFilterModalOpen}
						onClose={setFilterModal}
						data={selectedData as Proficiency}
						updateProficiency={updateProficiency}
						data-qa-automation="skillProfiEditModal"

					/>
				</StyledList>
			</StyledWrap>
		</>
	);
};
export default ProfiencyListing;
