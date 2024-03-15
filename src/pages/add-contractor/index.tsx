import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import BasicInfo from '../../components/BasicInfo';
import Skills from '../../components/Skill';
import Work from '../../components/Work';
import { StyledContainer } from './styledComponents';
import EduQual from '../../components/EduQual';
import SubmitSection from '../../components/FormSubmit';
import { useParams } from 'react-router-dom';
import { useLazyGetContractorQuery } from '../../redux/services/Contractors';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Title from '../../components/Title/title';
import Breadcrumb from '../../components/BreadCrumb';

const AddContractor: React.FC = () => {
	const methods = useForm({ mode: 'onChange', shouldFocusError: true });
	const { id } = useParams();
	const { reset } = methods;
	const isEditMode = !!id;
	const [trigger, { data, isFetching }] = useLazyGetContractorQuery();

	useEffect(() => {
		if (isEditMode) {
			fetchContractor();
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [data]);

	const loadData = () => {
		if (isEditMode && data) {
			const { user, user_skill } = data;
			const updatedData = {
				...data,
				user: {
					...user,
					department: user?.department_id,
					reporting_manager: user?.reporting_manager_id,
					designation: user?.designation_id,
					work_mode: user?.work_mode_id,
				},
				user_skill: user_skill?.map(
					({ id, name, experience, category, rating }) => ({
						id: id,
						skill: name?.id,
						category: category?.id,
						experience,
						rating,
						approval_status: false,
					})
				),
			};

			reset(updatedData);
		}
	};

	const fetchContractor = async () => {
		id && (await trigger({ id: +id }).unwrap());
	};

	return (
		<>  <Breadcrumb/>
			<Title title={id ? 'Edit Contractor' : 'Add Contractor'}></Title>
			<FormProvider {...methods}>
				{isFetching ? (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',

							height: '100vh',
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<StyledContainer>
						<BasicInfo />
						<Skills />
						<Work data={data} />
						<EduQual />
						<SubmitSection isEditMode={isEditMode} contractorId={+(id ?? 0)} />
					</StyledContainer>
				)}
			</FormProvider>
		</>
	);
};

export default AddContractor;
