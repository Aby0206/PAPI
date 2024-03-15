import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import {StyledList,StyledLabel} from '../../styles/global';
import NoListFound from '../No-list-found';
import { Qualification } from '../../types/index';

type InfoCardProps = {
	title: string;
	data?: Qualification[];
};

const EducationListing: React.FC<InfoCardProps> = ({ title, data }) => {
	return (
		<StyledList>
			<div className="heading">{title}</div>
			{data && data.length > 0 ? (
				
					<Table className='table'>
						<col width="30%" />
								<col width="30%" />
								<col width="20%" />
								<col width="20%" />
								
						<TableHead>
							<TableRow className="head-row">
								<TableCell className="field-title">
									Educational Institution
								</TableCell>
								<TableCell className="field-title">Degree/Diploma</TableCell>
								<TableCell className="field-title">Field(s) of Study</TableCell>
								<TableCell className="field-title">Year of Completion</TableCell>
							</TableRow>
							
						</TableHead>
						<TableBody className='table-body'>
							{data.map((item:Qualification) => {
								return (
									
										<TableRow sx={{borderBottom:"solid #E7E7E9 "}}  key={item.id}  className="content-row">
											<TableCell className="field-title content wrap">
											<StyledLabel>Educational Institution </StyledLabel>
												{item?.school ? item?.school : '-'}
											</TableCell>
											<TableCell className="field-title content wrap">
											<StyledLabel>Degree/Diploma</StyledLabel>
												{item?.domain ? item?.domain : '-'}
											</TableCell>
											<TableCell className="field-title content wrap">
											<StyledLabel>Field(s) of Study</StyledLabel>
												{item?.qualification ? item?.qualification : '-'}
											</TableCell>
											<TableCell className="field-title content wrap">
											<StyledLabel>Year of Completion</StyledLabel>
												{item?.year_of_completion
													? item?.year_of_completion
													: '-'}
											</TableCell>
										</TableRow>
									
								);
							})}
						</TableBody>
					</Table>
				
			) : (
				<NoListFound title="Education" />
			)}
		</StyledList>
	);
};

export default EducationListing;
