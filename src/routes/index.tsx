import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard-layout';
import OnboardingLayout from '../layouts/onboarding-layout';
import PrivateOutlet from './privateOutlet';
import HomePageRedirectOutlet from './HomeRedirectOutlet';
import LoginPage from '../pages/login';
import AdminHomePage from '../pages/admin-home';
import EmployeeDetails from '../pages/employee-details';
import PageNotFound from '../pages/page-404';
import PageComingSoon from '../pages/page-404/comingSoon';
import SkillMasterLayout from '../layouts/skill-master-layout';
import Constants from '../../src/utils/Constants';
import ProjectMasterLayout from '../layouts/project-master-layout';
import ProjectManagementLayout from '../layouts/project-management-layout';
interface RouteConfig {
	path: string;
	name: string;
	component: React.ComponentType;
	children?: RouteConfig[];
  }

const AppRouter: React.FC = () => {
	const configureChildRoutes = (path: string, parentModuleConfig:RouteConfig):React.ReactNode => {
		return parentModuleConfig?.children?.map((childRouteConfig:RouteConfig) => (
			<>
				<Route
					path={path + childRouteConfig.path}
					element={<childRouteConfig.component />}
				/>
				<Route
					path={path + childRouteConfig.path + '/profile'}
					element={<EmployeeDetails />}
				/>

				{childRouteConfig?.children &&
					configureChildRoutes(path + childRouteConfig.path, childRouteConfig)}
			</>
		));
	};

	const createRouteElement = (routeConfig:RouteConfig) => (
		<>
			<Route path={routeConfig.path} element={<routeConfig.component />} />
			<Route
				path={routeConfig.path + '/profile'}
				element={<EmployeeDetails />}
			/>
			{routeConfig?.children?.length !== 0 &&
				configureChildRoutes(routeConfig.path, routeConfig)}
		</>
	);
	const PeopleRoute = createRouteElement(Constants.PEOPLE_ROUTES);
	const SkillRoute = createRouteElement(Constants.SKILL_MASTER_ROUTES);
	const ProjectRoute=createRouteElement(Constants.PROJECT_MASTER_ROUTES)
	const ProjectManagementRoute=createRouteElement(Constants.PROJECT_MANAGEMENT_ROUTES)
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<HomePageRedirectOutlet />}>
					<Route element={<OnboardingLayout />}>
						<Route path="/" element={<LoginPage />} />
					</Route>
				</Route>
				<Route element={<PrivateOutlet />}>
					<Route element={<DashboardLayout />}>
						<Route path="/admin" element={<AdminHomePage />} />
						{PeopleRoute}
					</Route>
					<Route element={<SkillMasterLayout />}>{SkillRoute}</Route>
					<Route element={<ProjectMasterLayout/>}>{ProjectRoute}</Route>
					<Route element={<ProjectManagementLayout/>}>{ProjectManagementRoute}</Route>
				</Route>
				<Route path="*" element={<PageNotFound />} />
				<Route path="/coming-soon" element={<PageComingSoon />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
