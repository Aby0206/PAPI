import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/profile-card';
import InfoCard from '../../components/info-card';
import WorkCard from '../../components/work-card';
import {
	StyledInfoContainer,
	StyledEmployeeContainer,
} from './styledComponents';
import UserSkills from '../../components/User-skills';
import ExperienceListing from '../../components/Experience-list';
import EducationListing from '../../components/Education-list';
import { useGetUserDetailsQuery } from '../../redux/services/EmployeeDetailsApi';
import Title from '../../components/Title/title';
import { NullableParam } from '../../types/index';
import Breadcrumb from '../../components/BreadCrumb';
import { useLocation } from 'react-router-dom';

const basicInfo = {
	employee_id: {
		displayName: 'Employee ID',
		type: 'string',
	},
	first_name: {
		displayName: 'First Name',
		type: 'string',
	},
	last_name: {
		displayName: 'Last Name',
		type: 'string',
	},
	email: {
		displayName: 'Email ID',
		type: 'string',
	},
	phone: {
		displayName: 'Phone Number',
		type: 'string',
	},
	linkedin: {
		displayName: 'LinkedIn Url',
		type: 'link',
	},
};

const regularWorkInfo = {
	department: {
		displayName: 'Department',
		type: 'string',
	},
	designation: {
		displayName: 'Title',
		type: 'string',
	},
	reporting_manager: {
		displayName: 'Reporting Manager',
		type: 'string',
	},
	start_date: {
		displayName: 'Date Of Joining',
		type: 'date',
	},
	end_date: {
		displayName: 'Date Of Relieving',
		type: 'date',
	},
	status: {
		displayName: 'Employee Status',
		type: 'boolean',
	},
	experience: {
		displayName: 'Experience',
		type: 'string',
	},
	// ctc: {
	// 	displayName: 'CTC per Annum',
	// 	type: 'string',
	// },
	location: {
		displayName: 'Location',
		type: 'string',
	},
};
const contractedWorkInfo = {
	department: {
		displayName: 'Department',
		type: 'string',
	},
	designation: {
		displayName: 'Title',
		type: 'string',
	},
	reporting_manager: {
		displayName: 'Reporting Manager',
		type: 'string',
	},
	email_official: {
		displayName: 'Email ID (Official)',
		type: 'string',
	},
	start_date: {
		displayName: 'Contract Start Date',
		type: 'date',
	},
	end_date: {
		displayName: 'Contract End Date',
		type: 'date',
	},
	status: {
		displayName: 'Employee Status',
		type: 'boolean',
	},
	experience: {
		displayName: 'Experience',
		type: 'string',
	},
	vendor: {
		displayName: 'Vendor Name',
		type: 'string',
	},
	availability: {
		displayName: 'Avaliability',
		type: 'string',
	},
	contract_payment: {
		displayName: 'Contracted At',
		type: 'string',
	},
	location: {
		displayName: 'Location',
		type: 'string',
	},
};
interface EducationalQualification {
	id?: number;
	school?: string;
	qualification?: string;
	domain?: string;
	year_of_completion?: string;
}

interface UserSkills {
	links?: {
		next?: NullableParam<string>;
		previous?: NullableParam<string>;
	};
	total_count?: number;
	results?: {
		item_count?: number;
		data?: {
			id?: number;
			skill?: string;
			category?: string;
			years_of_experience?: number;
			months_of_experience?: number;
			rating?: number;
			approval_status?: boolean;
		}[];
	};
	has_prev_page?: boolean;
	has_next_page?: boolean;
	data_per_page?: number;
	next_page_num?: NullableParam<number>;
	prev_page_num?: NullableParam<number>;
}

interface WorkExperience {
	links?: {
		next?: NullableParam<string>;
		previous?: NullableParam<string>;
	};
	total_count?: number;
	results?: {
		item_count?: number;
		data: {
			id?: number;
			company?: string;
			job_title?: string;
			from_date?: string;
			to_date?: NullableParam<string>;
		}[];
	};
	has_prev_page?: boolean;
	has_next_page?: boolean;
	data_per_page?: number;
	next_page_num?: NullableParam<number>;
	prev_page_num?: NullableParam<number>;
}

interface ProfessionalCertificate {
	links?: {
		next?: NullableParam<string>;
		previous?: NullableParam<string>;
	};
	total_count?: number;
	results?: {
		item_count?: number;
		data?: any[];
	};
	has_prev_page?: boolean;
	has_next_page?: boolean;
	data_per_page?: number;
	next_page_num?: NullableParam<number>;
	prev_page_num?: NullableParam<number>;
}

interface UserProject {
	links?: {
		next?: NullableParam<string>;
		previous?: NullableParam<string>;
	};
	total_count?: number;
	results?: {
		item_count?: number;
		data?: any[];
	};
	has_prev_page?: boolean;
	has_next_page?: boolean;
	data_per_page?: number;
	next_page_num?: NullableParam<number>;
	prev_page_num?: NullableParam<number>;
}

interface UserDetails {
	employee_id?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	linkedin?: NullableParam<string>;
	start_date?: string;
	end_date?: NullableParam<string>;
	status?: boolean;
	image?: string;
	experience?: string;
	// ctc?: NullableParam<number>;
	location?: string;
	user_type?: string;
	reporting_manager?: NullableParam<string>;
	designation?: NullableParam<string>;
	department?: NullableParam<string>;
}

interface User {
	id?: number;
	educational_qualifications?: EducationalQualification[];
	contract_user?: any;
	details?: UserDetails;
	user_skills?: UserSkills;
	work_experiences?: WorkExperience;
	professional_certificate?: ProfessionalCertificate;
	user_project?: UserProject;
}
interface LocationState {
	from?: string;
	to?: string;
}
type infoDataType = {
	[key: string]: string;
};

const EmployeeDetails: React.FC = () => {
	const [userType, setUserType] = useState('Regular');
	const [userDetails, setUserDetails] = useState<User>();
	const urlSearchParams = new URLSearchParams(window.location.search);
	const locationState= useLocation()?.state;
	const id = urlSearchParams.get('id');
	const type = urlSearchParams.get('type');
	const from = (locationState as any)?.from || '';

	let data = useGetUserDetailsQuery(id);
	data = data?.data;

	useEffect(() => {
		if (type) {
			setUserType(type);
		}
		if (data) {
			setUserDetails(data as User);
		}
	}, [userType, data]);

	const profileInfo = {
		id: userDetails?.details?.employee_id,
		name:
			userDetails?.details?.first_name + ' ' + userDetails?.details?.last_name,
		email: userDetails?.details?.email,
		designation: userDetails?.details?.designation,
		status: userDetails?.details?.status,
		image: userDetails?.details?.image,
	};

	const title =
		(from == 'Header' && 'My Profile') ||
		(userType == 'Regular' && 'Employee Profile') ||
		'Contract Employee Profile';

	return (
		<>
			<Breadcrumb />
			<StyledEmployeeContainer>
				<Title title={title}></Title>
				<ProfileCard data={profileInfo} userType={userType} id={id} />
				<StyledInfoContainer>
					<InfoCard
						title="Basic Info"
						info={basicInfo}
						data={userDetails?.details as infoDataType}
					/>
					<WorkCard
						title="Work"
						info={userType === 'Regular' ? regularWorkInfo : contractedWorkInfo}
						data={{ ...userDetails?.details, ...userDetails?.contract_user }}
						userType={userType}
					/>
				</StyledInfoContainer>
				<UserSkills id={id} userType={userType} />
				<ExperienceListing title="Work Experience" id={id} />
				<EducationListing
					title="Educational Qualification"
					data={userDetails?.educational_qualifications}
				/>
			</StyledEmployeeContainer>
		</>
	);
};

export default EmployeeDetails;
