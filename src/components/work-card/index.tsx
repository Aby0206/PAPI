import React from 'react';
import { StyledInfoCard, CustomLink } from '../info-card/styledComponents';
import { getDate } from '../../../src/utils/index';

type InfoType = {
	[key: string]: {
		displayName: string;
		type: string;
	};
};

type infoDataType = {
	[key: string]: string;
};

type InfoCardProps = {
	title: string;
	info: InfoType;
	data: infoDataType;
	userType: string;
};

const WorkCard: React.FC<InfoCardProps> = ({ title, info, data, userType }) => {
	return (
		<StyledInfoCard>
			<div className="card-title">{title}</div>
			{Object.keys(info).map((item, index) => {
				return (
					<>
						{index !== 0 && <div className="divider" />}
						<div className="card-item">
							<span className="row-name">{info?.[item]?.displayName}</span>
							{(info?.[item]?.type === 'boolean' && (
								<span>{data?.[item] ? 'Active' : 'Inactive'}</span>
							)) ||
								(info?.[item]?.type === 'link' && (
									<CustomLink
										href={data?.item}
										target="_blank"
										rel="noopener noreferrer"
									>
										{data?.[item]}
									</CustomLink>
								)) ||
								(info?.[item]?.type === 'date' && (
									<span>{getDate(data?.[item])}</span>
								)) || <span>{data?.[item] ? data?.[item] : '-'}</span>}
						</div>
					</>
				);
			})}
		</StyledInfoCard>
	);
};

export default WorkCard;
