import { useNavigate, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Constants from '../../utils/Constants';
import DynamicTooltip from "../Tooltip/index";

const Breadcrumb = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathSegments = location.pathname
		.split('/')
		.filter((segment) => segment && !/^\d+$/.test(segment));
	const endingIndex = pathSegments.length - 1;
	const currentRoute = pathSegments[endingIndex];
	const handleNavigation = (index: number) => {
		
		navigate(index - endingIndex);
	};
	const getSegmentTitle = (
		segment: keyof typeof Constants.ROUTE_CONFIG_MAP
	) => {
		return Constants.ROUTE_CONFIG_MAP[segment] || segment;
	};
	return (
		<div style={{marginBottom:12}}>
			<Breadcrumbs aria-label="breadcrumb">
				{pathSegments?.map(
					(segment, index) =>
						(index < pathSegments.length - 1 && (
							<DynamicTooltip title={getSegmentTitle(
								segment as keyof typeof Constants.ROUTE_CONFIG_MAP
							)} placement="bottom">
							<Link
								underline="hover"
								color="inherit"
								onClick={() => handleNavigation(index)}
							>
								{getSegmentTitle(
									segment as keyof typeof Constants.ROUTE_CONFIG_MAP
								)}
							</Link>
							</DynamicTooltip>
						)) || (
							<DynamicTooltip title={getSegmentTitle(
								segment as keyof typeof Constants.ROUTE_CONFIG_MAP
							)} placement="bottom">
							<Typography color="text.primary">
								{getSegmentTitle(
									currentRoute as keyof typeof Constants.ROUTE_CONFIG_MAP
								)}
							</Typography>
							</DynamicTooltip>
						)
				)}
			</Breadcrumbs>
		</div>
	);
};

export default Breadcrumb;
