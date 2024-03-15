import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { StyledList,StyledLabel} from '../../styles/global';
import Pagination from '../pagination';
import NoListFound from '../No-list-found';
import { useGetWorkExperienceQuery } from '../../redux/services/EmployeeDetailsApi';
import { getDefaultIfEmpty,getDate } from '../../../src/utils/index';
import { Experience, NullableParam } from '../../types/index';

type InfoCardProps = {
	title: string;
	id?: NullableParam<string>;
};

const ExperienceListing: React.FC<InfoCardProps> = ({ title, id }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading } = useGetWorkExperienceQuery({
		id,
		page: currentPage,
	});

	const educationList = data?.results?.data;
	const totalPages = data?.total_count ? Math.ceil(data.total_count / 5) : 1;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<StyledList>	
			<div className="heading">{title}</div>
			{isLoading ? (
				<TableRow>
					<TableCell colSpan={9}>Loading...</TableCell>
				</TableRow>
			) : (
				(educationList && educationList.length > 0 && (
					<>
							<Table className='table'>
								<col width="30%" />
								<col width="30%" />
								<col width="20%" />
								<col width="20%" />
								
								<TableHead>
									<TableRow className="head-row">
										<TableCell className="field-title">Organization</TableCell>
										<TableCell className="field-title">
											Designation/Role
										</TableCell>
										<TableCell className="field-title">From Date</TableCell>
										<TableCell className="field-title">To Date</TableCell>
									</TableRow>
									
								</TableHead>
								<TableBody className='table-body'>
								
									{educationList.map((item: Experience) => {
										return (
											<TableRow key={item.id} className="content-row">
												
												<TableCell className="field-title content wrap">
													<StyledLabel>Organization </StyledLabel>
													{getDefaultIfEmpty(item?.company)}
												</TableCell>
												<TableCell className="field-title content wrap">
												<StyledLabel>Designation/Role </StyledLabel>
													{getDefaultIfEmpty(item.job_title)}
												</TableCell>
												<TableCell className="field-title content wrap">
												<StyledLabel>From Date </StyledLabel>
													{getDefaultIfEmpty(getDate(item.from_date))}
												</TableCell>
												<TableCell className="field-title content wrap">
												<StyledLabel>To Date </StyledLabel>
													{getDefaultIfEmpty(getDate(item.to_date))}
												</TableCell>
												
											</TableRow>
										);
									})}
								</TableBody>
								
							</Table>
						{educationList && educationList?.length > 0 && (
							<div className='pagination-wrap'>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
							</div>
						)}
					</>
				)) || <NoListFound title="Experience" />
			)}
			
		</StyledList>
	);
};

export default ExperienceListing;
