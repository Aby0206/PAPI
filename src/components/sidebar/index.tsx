import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MuiDrawer from '@mui/material/Drawer';
import { styled, CSSObject } from '@mui/system';
import { StyledSidebar } from './styledComponents';
import ArrowDown from '../../assets/icons/arrow.svg';
import ArrowUp from '../../assets/icons/arrowup.svg';
import Bullet from '../../assets/icons/curve.svg';
import SmallLogo from '../../assets/icons/logo.png';
import PageIcon from '../../assets/icons/Page.svg'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const drawerWidth = 266;

const openedMixin = (theme: any): CSSObject => ({
	width: drawerWidth,
	transition: theme?.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: any): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: 80,
	[theme.breakpoints.up('sm')]: {
		width: 80
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
	  ...openedMixin(theme),
	  '& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
		'&:hover': {
		  width: drawerWidth, 
		},
	  }),
	}));
  
const SideBar: React.FC<{
	isSidebarOpen: boolean;
	isDrawerOpen: boolean;
	toggleDrawer: () => void;
}> = ({ isSidebarOpen, isDrawerOpen, toggleDrawer }) => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [isAdminOpen, setAdminopen] = useState(false);
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const toggleAdmin = () => {
		setAdminopen(!isAdminOpen);
	};
	
	return (
		<>
			{!isDrawerOpen && (
				<IconButton onClick={toggleDrawer} style={{ color: '#fff' }}>
					<ViewHeadlineIcon sx={{ width: 25, height: 25 }} />
				</IconButton>
			)}

		<Drawer
			variant="permanent"
			anchor="left"
			open={isDrawerOpen}
			onMouseEnter={() => {
			if (!isDrawerOpen) {
				toggleDrawer();
			}
			}}
			onMouseLeave={() => {
			if (isDrawerOpen) {
				toggleDrawer();
			}
			}}>
      		<StyledSidebar isSidebarOpen={isSidebarOpen} isDrawerOpen={isDrawerOpen}>
					<div className="main-wrap" >
						<div className="sidebar-logo-wrap">

							{isDrawerOpen &&
								<img
									src='/images/logo-simelabs.svg'
									alt="logo-simelabs"
									className='sidebar-logo'
								/>
							}
							{!isDrawerOpen && (
								<img
									src={SmallLogo}
									alt="closed-sidebar-logo"
									width={40}
									height={40}
									onClick={toggleDrawer}
								/>
							)}
							{/* <IconButton onClick={toggleDrawer} style={{ color: '#fff', }}>
								 <ViewHeadlineIcon sx={{ width: 25, height: 25, padding: 0, marginLeft:1}} />
							</IconButton> */}
						</div>
						<div className="divider" />
						<div className="menu-wrap">
				
							<Link to={'/home'} className="menu-items">
								<img src="/images/user.svg" alt="" className="menu-icon" />
								{ isDrawerOpen && <span className="menu-name">People Master</span>}
							</Link>

							<div className="menu-items" onClick={toggleAdmin} >
							<div  style={{display:"flex",gap:"12px",cursor:"pointer"}} >

									<img src="/images/reports.svg" alt="" className="menu-icon" />
									{ isDrawerOpen && <span className="menu-name">Administration</span>}
								</div>
								{ isDrawerOpen ? isAdminOpen ? (
									<span>
										<img src={ArrowUp} />
									</span>
								) : (
									<span>
										<img src={ArrowDown} />
									</span>
								) : null}
							</div>
							{isAdminOpen && (
								<div className="dropdown-menu">
									<Link to={'/coming-soon'} className='menu-items'>
										<img src="/images/user-time.svg" alt="" className="menu-icon" />
										{isDrawerOpen && <span className="menu-name">User Management</span>}
									</Link>

									{/* <Link to={'/project-master'} className='menu-items'>
										<img src={PageIcon} alt="" className="menu-icon" />
										{isDrawerOpen && <span className="menu-name">Project Master</span>}
									</Link>

									<Link to={'/project-management'} className='menu-items'>
										<img src={PageIcon} alt="" className="menu-icon" />
										{isDrawerOpen && <span className="menu-name">Project Management</span>}
									</Link> */}

									<div className="menu-items " onClick={toggleDropdown}>
									<Link to={'/skill-master'} style={{ display: "flex", gap: "12px" }}>
									<img
										src="/images/pencil-ruler.svg"
										alt=""
										className="menu-icon"
									/>
									{isDrawerOpen && <span className="menu-name">Skill Master</span>}
								</Link>
								{isDrawerOpen ? isDropdownOpen ? (
									<span>
										<img src={ArrowUp} />
									</span>
								) : (
									<span>
										<img src={ArrowDown} />
									</span>
								) : null}
								</div>
								{isDrawerOpen && (
									<>
										{isDropdownOpen && (
											<Link to={'/skill-master/proficiency-level'}>
												<div className="sub-options">
													<img src={Bullet} className="bullet-icon" />
													<span className="menu-name menu-spl">
														Proficiency Level
													</span>
												</div>
											</Link>
										)}
									</>
								)}

								</div>
							)}
						</div>
						<div className="divider" />
						<div className={`menu-title${isDrawerOpen ? ' open' : ' closed'}`}>settings</div>
						<a href="#" className="menu-items-settings">
							<img src="/images/settings.svg" alt="" className="menu-icon" />
							<Link to={'/coming-soon'}>
								{ isDrawerOpen && <span className="menu-name">Settings</span>}
							</Link>
						</a>
						<div className=" align-bottom">
							<a href="#" className="menu-items-settings">
								<img src="/images/help-circle.svg" alt="" className="menu-icon" />
								<Link to={'/coming-soon'}>
									{isDrawerOpen && <span className="menu-name">Help</span>}
								</Link>
							</a>
						</div>
					</div>
				</StyledSidebar>
			</Drawer>
		</>
	);
};

export default SideBar;
