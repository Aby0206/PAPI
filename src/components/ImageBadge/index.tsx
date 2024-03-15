import React, { ReactNode } from 'react';
import Badge from '@mui/material/Badge';

interface ImageBadgeProps {
	children?: ReactNode;
	badgeContent?: ReactNode | number;
}
const ImageBadge: React.FC<ImageBadgeProps> = ({ children, badgeContent}) => {
    const badgeColor = typeof badgeContent === 'number' ? 'primary' : 'default';

	return (
		<Badge
           color={badgeColor}
            data-testid="badge-id"
			overlap="circular"
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			badgeContent={badgeContent}
		>
			{children}
		</Badge>
	);
};

export default ImageBadge;
