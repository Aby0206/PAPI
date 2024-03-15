import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import EditIcon from '../../assets/icons/edit.svg';
import CustomRating from '../custom-rating';


interface Proficiency{
	id:number,
    rating: number;
    description: string;

}

 interface TableviewProps {
	data: Proficiency[] | undefined; onItemClick: (item: Proficiency) => void
 }
const TableView: React.FC <TableviewProps>= ({ data, onItemClick }) => {

	
	return (
		<Table className="table">
			<TableHead>
				<TableRow className="head-row">
					<TableCell className="head-title">Rating</TableCell>
					<TableCell className="head-title">Description</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data?.map((item) => (
					<TableRow key={item.id} className="content-row">
						<TableCell className='rating-cell'>
							<CustomRating 
								value={item.rating}
								readOnly={true}
								showBorder={false}
								style={{ gap: 10 }}
							/>
						</TableCell>
						<TableCell className="info-cell">
							<div className="info">{item.description}</div>
							<button className="edit-btn" onClick={() => onItemClick(item)}>
								<img src={EditIcon} alt="edit-icon" />
							</button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TableView;