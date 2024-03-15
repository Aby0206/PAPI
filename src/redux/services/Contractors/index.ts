import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_BASE_URL;
import Cookies from 'js-cookie';
import { ContractorInputs, NullableParam } from '../../../types';
import {setData} from '../../reducer/contractorSlice';

export interface ContractorApiResponse {
	id: number;
	user: UserResponse;
	sow: string;
	cv: string;
	simelabs_cv: string;
	vendor: string;
	email_official: string;
	availability: number;
	contracted_currency: string;
	contract_payment: number;
	contracted_unit: string;
	msa_signed: boolean;
	msa_expiry_date: NullableParam<string>;
	sow_signed: boolean;
	sow_expiry_date: NullableParam<string>;
	remarks: NullableParam<string>;
}
type Id = NullableParam<number>|undefined;
interface UserResponse extends ContractorInputs {
	user_type: string;
}
export interface Category {
	id: number;
	category: string;
}
export interface SkillCategorysApiResponse {
	count: number;
	next: NullableParam<boolean>;
	previous: NullableParam<boolean>;
	results: Category[];
}
export interface Skill {
	id: number;
	name: string;
	status: boolean;
	parent: string | null;
}
export interface SkillsApiResponse {
	count: number;
	next: NullableParam<boolean>;
	previous: NullableParam<boolean>;
	results: Skill[];
}

export interface Department {
	id: number;
	name: string;
}
 export interface DepartmentsApiResponse {
	count: number;
	next: NullableParam<boolean>;
	previous: NullableParam<boolean>;
	results: Department[];
}

export interface ReportingManager {
	id: number;
	full_name: string;
}
export interface ReportingManagersApiResponse {
	count: number;
	next: NullableParam<string>;
	previous: NullableParam<boolean>;
	results: ReportingManager[];
}

export interface Designation {
	id: number;
	name: string;
}
export interface DesignationsApiResponse {
	count: number;
	next: NullableParam<string>;
	previous: NullableParam<boolean>;
	results: Designation[];
}
export interface GetContractorApiResponse {
	id?: number;
	user?: {
		id?: number;
		first_name?: string;
		last_name?: string;
		email?: string;
		user_type?: string;
		employee_id?: string;
		experience?: string;
		start_date?: string;
		end_date?: string;
		ctc?: NullableParam<number>;
		reporting_manager_id?: number;
		address?: string;
		work_mode_id?: NullableParam<number>;
		phone?: string;
		status?: boolean;
		linkedin?: NullableParam<string>;
		department_id?: number;
		designation_id?: number;
		reporting_manager?: {
			id?: number;
			full_name?: string;
		};
		department?: {
			id?: number;
			name?: string;
		};
		designation?: {
			id?: number;
			name?: string;
		};
	};
	user_skill?: {
		id?: number;
		name?: {
			id?: number;
			skill?: string;
		};
		experience?: string;
		category?: {
			id?: number;
			name?: string;
		};
		rating?: number;
		approval_status?: boolean;
	}[];
	qualification?: {
		id?: number;
		school?: string;
		qualification?: string;
		domain?: string;
		year_of_completion?: string;
	}[];
	vendor?: string;
	email_official?: string;
	availability?: NullableParam<string>;
	contracted_currency?: string;
	contract_payment?: number;
	contracted_unit?: string;
	sow?: string;
	cv?: string;
	simelabs_cv?: string;
	msa_signed?: boolean;
	msa_expiry_date?: string;
	sow_signed?: boolean;
	sow_expiry_date?: string;
	remarks?: NullableParam<string>;
}

export const ContractorApi = createApi({
	reducerPath: 'ContractorApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers) => {
			const token = Cookies.get('access');
			if (token) {
				headers.set('Authorization', ` ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		SaveContractor: builder.mutation<
			ContractorApiResponse,
			{ id?: Id; payload: ContractorInputs }
		>({
			query: ({ id, payload }) => ({
				url: `peoples/contractor/${id ?? ''}`,
				method: (id && 'PATCH') || 'POST',
				body: payload,
			}),
		}),
		getContractor: builder.query<GetContractorApiResponse, { id: number }>({
			query: ({ id }) => `peoples/contractor/${id}`,async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const response = await queryFulfilled;
					const { data } = response;
					dispatch(setData(data||{}));
				} catch (error) {
				}
			},
		}),
		getSkillCategoryList: builder.query<
			SkillCategorysApiResponse,
			{ searchQuery?: string }
		>({
			query: ({searchQuery}) => {
				let url = 'peoples/skill/categories/';
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				} else {
					url += `?limit=25`;
				}
				return url;
			},
		}),
		getSkills: builder.query<SkillsApiResponse, { searchQuery?: string }>({
			query: ({searchQuery}) => {
				let url = 'peoples/skill/';
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				} else {
					url += `?limit=25`;
				}
				return url;
			},
		}),

		getDepartments: builder.query<
			DepartmentsApiResponse,
			{ searchQuery?: string }
		>({
			query: ({searchQuery}) => {
				let url = 'peoples/departments/';
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				} else {
					url += `?limit=25`;
				}
				return url;
			},
		}),
		getReportingManagers: builder.query<
			ReportingManagersApiResponse,
			{ searchQuery?: string }
		>({
			query: ({searchQuery}) => {
				let url = `peoples/reporting-managers/`;
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				} else {
					url += `?limit=25`;
				}
				return url;
			},
		}),
		getDesignations: builder.query<
			DesignationsApiResponse,
			{ searchQuery?: string }
		>({
			query: ({searchQuery}) => {
				let url = 'peoples/designations/';
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				}else {
					url += `?limit=25`;
				}
				return url;
			},
		}),
		deleteSkill: builder.mutation<null,
			{ id?: Id}
		>({
			query: ({ id}) => ({
				url: `peoples/user/skill/${id ?? ''}`,
				method: 'DELETE',
			}),
		}),
		deleteQualification: builder.mutation<null,
			{ id?: Id}
		>({
			query: ({ id}) => ({
				url: `peoples/educational-qualification/${id ?? ''}`,
				method: 'DELETE',
			}),
		})
	}),
});

export const {
	useSaveContractorMutation,
	useLazyGetContractorQuery,
	useGetContractorQuery,
	useGetSkillCategoryListQuery,
	useGetSkillsQuery,
	useGetDepartmentsQuery,
	useGetReportingManagersQuery,
	useGetDesignationsQuery,
	useDeleteQualificationMutation,
	useDeleteSkillMutation,
} = ContractorApi;
