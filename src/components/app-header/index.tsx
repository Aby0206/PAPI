import React from 'react';
import { StyledAppHeader } from './styledComponents';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { getCookieValue } from '../../utils/index';
import MenuList from '../MenuList';
import { useLogoutMutation } from '../../redux/services/Peoples';
import { useNavigate } from 'react-router-dom';
import { useGlobalSnackbar } from '../../hooks/globalHelpers';
import Constants from '../../utils/Constants';
import Avatar from '@mui/material/Avatar';

const AppHeader: React.FC<{ toggleSidebar: () => void, isDrawerOpen:boolean }> = ({
	toggleSidebar, isDrawerOpen
}) => {
	const navigate = useNavigate();
	const [logoutMutation] = useLogoutMutation();
	const { showSnackbar } = useGlobalSnackbar();
	const name = getCookieValue('first_name', 'Unknown');
	const image = getCookieValue('image');
	const title = getCookieValue('title');

	function stringAvatar() {
		return {
			children: `${name.split(' ')[0][0]}`,
		};
	}

	const handleLogout = async () => {
		try {
			let responseData = await logoutMutation({}).unwrap();
			if (responseData?.success) {
				showSnackbar(responseData?.detail || Constants.LOGOUT_SUCCESS);
				navigate('/');
			}
		} catch (err: any) {
			showSnackbar(err?.data?.detail || Constants.ERROR_MESSAGE, 'error');
		}
	};

	const menuClick = async (value: string) => {
		switch (value) {
			case 'Logout':
				handleLogout();
				break;
			case 'My Profile':
				const userId = getCookieValue('user_id');
				const currentPath = window.location.pathname;
				navigate(`../${currentPath}/profile?id=${userId}&type=Regular`, {
					state: {
						from: 'Header',
						to: 'profile',
					},
				});
				break;
			default:
				break;
		}
	};

	return (
		<StyledAppHeader isDrawerOpen={isDrawerOpen}>
			{!isDrawerOpen && (
				<button className="hamburger" onClick={toggleSidebar}>
				<MenuRoundedIcon sx={{ fontSize: '35px' }} />
			</button>
			)}
			<div className="left-wrap">
				
			<div className="heading" id="app-header" />
			</div>
			<div className="profile-wrap">
				<span className="icon-img-wrap">
					<img className="icon-img" src="/images/bell.svg" alt="icon_pic" />
					<span className="notification-badge">1</span>
				</span>
				<span className="profile-img-name-outer-wrap">
					<span className="profile-img-wrap">
						{image &&
						<Avatar className='profile-img' src={image}/>
							||
							<Avatar className='profile-img bg-black' {...stringAvatar()} />
						}
					</span>
					<span className="profile-name-wrap">
						<span className="profile-name-wrap name">{name}</span>
						<span className="profile-name-wrap name designation">{title}</span>
					</span>

					<MenuList menuClick={menuClick} />
				</span>
			</div>
		</StyledAppHeader>
	);
};

export default AppHeader;