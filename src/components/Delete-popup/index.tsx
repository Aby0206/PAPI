import React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '../../assets/icons/closeButton.svg';
import { StyledBox } from './styledComponents';
import DeleteIcon from '../../assets/icons/Delete-icon.svg';
import Button from '../Custom-Button';


interface DeleteSkillProps {
	open: boolean;
	onClose: () => void;
    onDelete: () => void;
    description: string;
	isLoading: boolean;
}

const DeleteSkill: React.FC<DeleteSkillProps> = ({
	open,
	onClose,
    description,
    onDelete,
	isLoading


}) => {

	const onHandleDelete = async () => {
        onDelete()
	};

	return (
		<Modal open={open} onClose={onClose}>
			<StyledBox>
				<div className="card-header">
					<div className="card-title">
						<div className="card-text" data-testid="delete_text">Delete</div>
						<img
							className="card-icon"
							src={CloseIcon}
							alt="closeButton"
							onClick={onClose}
						/>
					</div>
					<div className="divider" />

				</div>
                <div className='content-container'>
          <img src={DeleteIcon} alt="Delete_icon" className="delete-icon" />
          <div className="select-text">{description}</div>
          <div className="btn_wrap">
            <Button
						type="submit"
						showLoader={isLoading}
						disabled={isLoading}
						testId="submit-button-id"
						title='Delete'
						onClick={onHandleDelete}
					/>
          <Button
						type="cancel"
						testId="cancel-button-id"
						disabled={isLoading}
						title="Cancel"
						onClick={onClose}
					/>
          </div>
        </div>  
     
				
			</StyledBox>
		</Modal>
	);
};

export default DeleteSkill;
