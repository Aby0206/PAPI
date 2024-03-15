import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Constants from '../../utils/Constants';
import DownIcon from '../../assets/icons/down-arrow-icon-black.svg';
import { StyledMenu, StyledMenuList } from './styledComponents';

interface MenuListProps {
	menuClick: (value: string) => void;
}
const MenuList: React.FC<MenuListProps> = ({ menuClick }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuClick = (value: string) => {
		setAnchorEl(null);
		menuClick(value);
	};

	return (
		<StyledMenuList>
			<div
				style={{ cursor: 'pointer', width: '30px', height: '30px' }}
				onClick={handleClick}
			>
				<img src={DownIcon} alt="Down Icon" />
			</div>
			<StyledMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				sx={{ marginTop: 3, display: 'flex', opacity: '1', zIndex: 99999 }}
			>
				{Constants.HEADER_MENU.map((item) => (
					<MenuItem key={item.value} onClick={() => handleMenuClick(item.name)}>
						<div className="menu-item-container">
							<img
								className="menu-icon"
								src={item.icon}
							/>
							<span className="label">{item.name}</span>
						</div>
					</MenuItem>
				))}
			</StyledMenu>
		</StyledMenuList>
	);
};

export default MenuList;
