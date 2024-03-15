import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Link,
} from '@mui/material';
import { StyledTable } from './styledComponents';
import { StyledList } from '../../styles/global';
import Pagination from '../pagination';
import NoListFound from '../No-list-found';
import { useGetUserProjectsQuery } from '../../redux/services/EmployeeDetailsApi';
import { getDefaultIfEmpty } from '../../utils/index';
import { Projects,NullableParam } from '../../types/index';

type InfoCardProps = {
	title: string;
	id?: NullableParam<string>;
	noData:string;
};

const ProjectListing: React.FC<InfoCardProps> = ({ title, id ,noData}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading } = useGetUserProjectsQuery({
		id,
		page: currentPage,
	});

	const projects = data?.results?.data;
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
				(projects && projects?.length > 0 && (
					<>
						<StyledTable>
							<Table>
								<TableHead>
									<TableRow className="head-row">
										<TableCell className="head-name">Name</TableCell>
										<TableCell className="head-role">Role</TableCell>
										<TableCell className="head-project-manager">
											Project Manager
										</TableCell>
										<TableCell className="head-allocation">
											Allocation
										</TableCell>
										<TableCell className="head-date">Start Date</TableCell>
										<TableCell className="head-date">End Date</TableCell>
										<TableCell className="head-status">Status</TableCell>
										<TableCell className="head-project-link">
											Project Link
										</TableCell>
									</TableRow>
									<div className="divider" />
								</TableHead>
								<TableBody>
									{projects.map((item: Projects) => {
										return (
											<TableRow  key={item.id} className="content-row">
												<TableCell className="head-name content">
													{getDefaultIfEmpty(item?.project?.name)}
												</TableCell>
												<TableCell className="head-role content">
													{getDefaultIfEmpty(item?.role?.role)}
												</TableCell>
												<TableCell className="head-project-manager content">
													{getDefaultIfEmpty(item?.project?.project_manager)}
												</TableCell>
												<TableCell className="head-allocation content">
													{getDefaultIfEmpty(item?.project?.allocation)}
												</TableCell>
												<TableCell className="head-date status">
													{getDefaultIfEmpty(item?.project?.start_date)}
												</TableCell>
												<TableCell className="head-date status">
													{getDefaultIfEmpty(item?.project?.end_date)}
												</TableCell>
												{item?.project?.status === true ? (
													<TableCell className="head-status content">
														<div className="active-button-wrap">
															<span className="active-button-icon" />
															<span className="active-button-text">Active</span>
														</div>
													</TableCell>
												) : (
													<TableCell className="head-status content">
														<div className="inactive-button-wrap">
															<span className="inactive-button-icon" />
															<span className="inactive-button-text">
																Inactive
															</span>
														</div>
													</TableCell>
												)}
												<TableCell>
													<Link
														className="head-project-link status"
														href={item?.project?.project_link ?? ''}
													>
														{item?.project?.project_link
															? item?.project?.project_link
															: '-'}
													</Link>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</StyledTable>
						{projects && projects?.length > 0 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
					</>
				)) || <NoListFound title={noData} />
			)}
		</StyledList>
	);
};

export default ProjectListing;
