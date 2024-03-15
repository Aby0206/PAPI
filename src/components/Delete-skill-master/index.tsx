import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '../../assets/icons/closeButton.svg';
import { StyledBox } from './styledComponents';
import {
	useDeleteSkillCategoryMutation,
	useDeleteSkillMutation,
} from '../../redux/services/Skill';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import DeleteView from './DeleteView';
import Constants from '../../../src/utils/Constants';

type infoDataType = {
	id: number;
	name: string | null;
	category: {
		id: number;
		category: string | null;
		status: boolean;
	};
	total_employee: number;
	status: boolean;
};
interface DeleteSkillProps {
	open: boolean;
	onClose: () => void;
	skillData?: infoDataType | null;
	onSuccess?: () => void;
}

const DeleteSkill: React.FC<DeleteSkillProps> = ({
	open,
	onClose,
	skillData,
	onSuccess,
}) => {
	const [checked, setChecked] = useState('skill');
	const [isLoading, setLoading] = useState(false);
	const { showSnackbar } = useGlobalSnackbar();
	const [DeleteSkill] = useDeleteSkillMutation();
	const [DeleteSkillCategory] = useDeleteSkillCategoryMutation();

	const handleClose = () => {
		onClose();
		setChecked('skill');
	};
	const handleOptionChange = (value: string) => {
		setChecked(value);
	};

	const onDelete = async () => {
		setLoading(true);
		try {
			let message = '';
			if (checked === 'skill') {
				let id = skillData?.id;
				await DeleteSkill(id)?.unwrap();
				message = 'Skill Deleted Successfully';
			} else {
				let id = skillData?.category?.id;
				await DeleteSkillCategory(id)?.unwrap();
				message = '"Skill Category Deleted Successfully';
			}

			showSnackbar(message, 'success');
			handleClose();
			onSuccess?.();
		} catch (err: any) {
			showSnackbar(
				err?.data?.non_field_error?.string || Constants.ERROR_MESSAGE,
				'error'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<StyledBox>
				<div className="card-header">
					<div className="card-title">
						<text className="card-text">Delete</text>
						<img
							className="card-icon"
							src={CloseIcon}
							alt="closeButton"
							onClick={handleClose}
						/>
					</div>
					<div className="divider" />
				</div>
				<DeleteView
					open={open}
					isLoading={isLoading}
					onClose={handleClose}
					onDelete={onDelete}
					handleOptionChange={handleOptionChange}
				/>
			</StyledBox>
		</Modal>
	);
};

export default DeleteSkill;
