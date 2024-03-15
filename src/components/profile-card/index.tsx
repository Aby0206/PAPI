import React from 'react';
import Avatar from '@mui/material/Avatar';
import { StyledProfileCard, StyledButton } from './styledComponents';
import EditIcon from '../../assets/icons/edit.png';
import { Link } from 'react-router-dom';
import { NullableParam } from '../../types/index';
import ImageBadge from '../ImageBadge';

type infoDataType = {
	id?: string;
	name?: string;
	email?: string;
	designation?: NullableParam<string>;
	status?: NullableParam<boolean>;
	image?: NullableParam<string>;
};
type InfoCardProps = {
	data?: infoDataType;
	userType: string;
	id: NullableParam<string>;
};
const ProfileCard: React.FC<InfoCardProps> = ({ data, userType, id }) => {
	return (
		<StyledProfileCard>
			<div className="bg-div" />
			<div className="bottom-container">
				<div className="profilepic-container">
					<ImageBadge
						badgeContent={
							data?.status && (
								<div
									className={`status ${data?.status ? 'active' : 'inactive'}`}
								/>
							)
						}
					>
						<Avatar
							src={data?.image||''}
							alt="profile-pic"
							className="profile-picture"
						></Avatar>
					</ImageBadge>
				</div>

				<div className="employee-name">{data?.name ? data?.name : ''}</div>
				<div className="other-info">
					<div className="info-wrap">
						<span>{data?.id ? data?.id : ''}</span>
						<span>{data?.designation ? data?.designation : ''}</span>
						<span>{data?.email ? data?.email : ''}</span>
					</div>
					{userType === 'Contract' && (
						<StyledButton>
							<Link to={`contractor-edit/${id}`}>
								{' '}
								<img src={EditIcon} alt="add-icon" className="edit-icon" />
							</Link>
						</StyledButton>
					)}
				</div>
			</div>
		</StyledProfileCard>
	);
};

export default ProfileCard;
