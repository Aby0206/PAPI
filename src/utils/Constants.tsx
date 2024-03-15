import LogoutIcon from '../assets/icons/logout.svg';
import UserIcon from '../assets/icons/user.svg';
import HomePage from '../pages/home';
import EmployeeDetails from '../pages/employee-details';
import AddContractor from '../pages/add-contractor';
import SkillMaster from '../pages/skill-master';
import ProfiencyListing from '../components/Proficiency-list';
import AdminHomePage from '../pages/admin-home';
import ProjectMaster from '../pages/project-master';
import ProjectManagement from '../pages/project-management';
import AddProject from '../pages/add-project/index';

export default {
	ERROR_MESSAGE: 'Oops. Something went wrong.',
	LOGOUT_SUCCESS: 'Logout Successful',

	ROUTE_CONFIG_MAP: {
		home: 'People-Master',
		admin: 'Admin',
		employee: 'Employee Profile',
		contract: 'Contract Employee Profile',
		'contractor-create': 'Add Contractor',
		'contractor-edit': 'Edit Contractor',
		'proficiency-level': 'Proficiency Level',
		profile: 'My Profile',
		'skill-master': 'Skill Master',
	},
	
	PEOPLE_ROUTES: {
		path: '/home',
		name: 'People Master',
		component: HomePage,
		children: [
			{
				path: '/employee',
				name: 'Employee Profile',
				component: EmployeeDetails,
			},
			{
				path: '/contract',
				name: 'Contract Employee Profile',
				component: EmployeeDetails,
				children: [{
					path: '/contractor-edit/:id',
					name: 'Edit Contractor',
					component: AddContractor,
				}],
			},
			{
				path: '/contractor-create',
				name: 'Create Contractor',
				component: AddContractor,
			},
			{
				path: '/contractor-edit/:id',
				name: 'Edit Contractor',
				component: AddContractor,
			},
		],
	},
	SKILL_MASTER_ROUTES: {
		path: '/skill-master',
		name: 'Skill Master',
		component: SkillMaster,
		children: [
			{
				path: '/proficiency-level',
				name: 'Proficiency Level',
				component: ProfiencyListing,
			},
		],
	},
	PROJECT_MASTER_ROUTES:{
		path:'/project-master',
		name:'Project Master',
		component:ProjectMaster,
	},
	PROJECT_MANAGEMENT_ROUTES:{
		path:'/project-management',
		name:'Project Management',
		component:ProjectManagement,
		children:[
			{
				path: '/add-project',
				name: 'Create Project',
				component: AddProject,
			},
			
		]
	},
	HEADER_MENU: [
		{ name: 'My Profile', value: 'profile', icon: UserIcon },
		{ name: 'Logout', value: 'logout', icon: LogoutIcon },
	],

	PROFICIENCY_DATA: [
		{
			id: 1,
			rating: 5,
			description:
				' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ratione quidem magni unde quisquam et placeat sapiente, voluptas consequuntur enim vel, consequatur quaerat illum sed dolorum. Expedita laborum libero reiciendis',
		},
		{
			id: 2,
			rating: 4,
			description:
				' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ratione quidem magni unde quisquam et placeat sapiente, voluptas consequuntur enim vel, consequatur quaerat illum sed dolorum. Expedita laborum libero reiciendis',
		},
		{
			id: 3,
			rating: 3,
			description:
				' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ratione quidem magni unde quisquam et placeat sapiente, voluptas consequuntur enim vel, consequatur quaerat illum sed dolorum. Expedita laborum libero reiciendis',
		},
		{
			id: 4,
			rating: 2,
			description:
				' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ratione quidem magni unde quisquam et placeat sapiente, voluptas consequuntur enim vel, consequatur quaerat illum sed dolorum. Expedita laborum libero reiciendis',
		},
		{
			id: 5,
			rating: 1,
			description:
				' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ratione quidem magni unde quisquam et placeat sapiente, voluptas consequuntur enim vel, consequatur quaerat illum sed dolorum. Expedita laborum libero reiciendis',
		},
	],
	STATUS_DATA: {
		results: [
			{ id: 1, name: 'All', value: 'none' },
			{ id: 2, name: 'Active', value: 'true' },
			{ id: 3, name: 'InActive', value: 'false' },
		],
	},
	CURRENCY: [
		{ name: 'EUR', id: 'EUR' },
		{ name: 'INR', id: 'INR' },
		{ name: 'USD', id: 'USD' },
	],
	UNIT: [
		{ name: 'hr', id: 'hr' },
		{ name: 'day', id: 'day' },
		{ name: 'month', id: 'month' },
	],
	WORKMODES: [
		{ name: 'Remote', value: 1 },
		{ name: 'hybrid', value: 2 },
		{ name: 'Customer Office', value: 3 },
		{ name: 'Vendor Office', value: 4 },
		{ name: 'Simelabs Office', value: 5 },
	],
};
