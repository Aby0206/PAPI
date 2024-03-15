import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Link,
} from '@mui/material';
import { StyledButton, StyledTable } from './styledComponents';
import { StyledList } from '../../styles/global';
import AddIcon from "../../assets/icons/material-symbols_add.svg";
import Pagination from '../pagination';
import NoListFound from '../No-list-found';
import { useGetCertificateListQuery } from '../../redux/services/EmployeeDetailsApi';
import { getDefaultIfEmpty } from '../../../src/utils/index';
import { NullableParam } from "../../types/index";


type InfoCardProps = {
	id: number
};
type Certificate = {
	id?: NullableParam<number>;
	name?: NullableParam<string>
	issuingOrganization?:NullableParam<string>
	issueDate?: NullableParam<string>
	expirationDate?: NullableParam<string>
	credentialId?:NullableParam<string>
	credentialLink?: NullableParam<string>
};

const CertificateListing: React.FC<InfoCardProps> = ({ id }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading } = useGetCertificateListQuery({
		id,
		page: currentPage
	});
	const certificates = data?.results?.data;
	const totalPages = data?.total_count ? Math.ceil(data.total_count / 5) : 1;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	return (
		<StyledList>
			<div className='heading'>
				<text>Professional Certificates</text>
				<StyledButton>
					<img className="icon-add" src={AddIcon} />
					<text className="text-add-certificate">Add Certificate</text>
				</StyledButton>
			</div>
			{isLoading ? (
				<TableRow>
					<TableCell colSpan={9}>Loading...</TableCell>
				</TableRow>
			) : (
				(certificates && certificates?.length > 0) && <>
					<StyledTable >
						<Table>
							<TableHead>
								<TableRow   className="head-row">
									<TableCell className="head-name">Name</TableCell>
									<TableCell className="head-organization">Issuing Organization</TableCell>
									<TableCell className="head-date">Issue Date</TableCell>
									<TableCell className="head-date">Expiration Date</TableCell>
									<TableCell className="head-credential-id">Credential ID</TableCell>
									<TableCell className="head-creadential-link">Credential Link</TableCell>
								</TableRow>
								<div className="divider" />
							</TableHead>
							<TableBody>
								{certificates.map((item :Certificate) => {
									return (
										
											<TableRow  key={item.id} className="content-row">
												<TableCell className="content-name">{getDefaultIfEmpty(item?.name)}</TableCell>
												<TableCell className="content-organization">{getDefaultIfEmpty(item?.issuingOrganization)}</TableCell>
												<TableCell className="content-date">{getDefaultIfEmpty(item?.issueDate)}</TableCell>
												<TableCell className="content-date">{getDefaultIfEmpty(item?.expirationDate)}</TableCell>
												<TableCell className="content-credential-id">{getDefaultIfEmpty(item?.credentialId)}</TableCell>
												<TableCell >
													<Link className="content-credential-link" href={item?.credentialLink ?? ''}>{getDefaultIfEmpty(item?.credentialLink)}</Link>
												</TableCell>
											</TableRow>
										
									)
								})}
							</TableBody>
						</Table>
					</StyledTable>
					<Pagination currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange} />
				</> ||
					
						<NoListFound
							title='Certificate'
						/>
					)}
		</StyledList>
	);
};

export default CertificateListing;
