import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  DesignationsApiResponse,
  DepartmentsApiResponse,
  SkillsApiResponse,
  ReportingManagersApiResponse,
} from '../Contractors';
import { getCookieValue, clearCookieData } from '../../../utils/index';
import { clearCredentials } from '../../../redux/reducer/authSlice';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export interface Filters {
  title?: string;
  department?: string;
  reporting_manager?: string;
  skill?: string;
}

interface Person {
  id: number;
  employee_id: number;
  full_name: string;
  experience: string | number;
  reporting_manager: {
    id: number,
    full_name: string
  };
  phone: number;
  email: string;
  status: boolean;
  designation: { name: string };
  department: { name: string };
  contract_user_id: number
}

interface PaginatedResponse {
  total_count: number;
  results: {
    item_count: number;
    data: Person[];
  };
}

interface QueryParams {
  userType: string;
  page: number;
  searchQuery?: string;
  department?: string;
  designation?: string;
  reportingManager?: string;
  skill?: string;
  filters?: Filters;
}

export const PeopleApi = createApi({
  reducerPath: 'PeopleApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access');
      if (token) {
        headers.set('Authorization', ` ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaginatedPeopleByType: builder.query<PaginatedResponse, QueryParams>({
      query: ({ userType, page, searchQuery, filters }) => {
        let url = `peoples/list/?user_type=${userType}&page=${page}`;
        if (searchQuery?.trim()) url += `&search=${searchQuery}`;
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            let temp = value.toString();
            if (value) {
              url += `&${key}=${temp}`;
            }
          });
        }
        return url;
      },
    }),
    getDepartments: builder.query<DepartmentsApiResponse, { searchQuery?: string }>({
      query: ({ searchQuery }) => {
        let url = 'peoples/departments/';
        if (searchQuery?.trim()) {
          url += `?search=${searchQuery}`;
        }
        return url;
      },
    }),

    getDesignations: builder.query<DesignationsApiResponse, { searchQuery?: string }>({
      query: ({ searchQuery }) => {
        let url = 'peoples/designations/';
        if (searchQuery?.trim()) {
          url += `?search=${searchQuery}`;
        }
        return url;
      },
    }),
    getReportingManagers: builder.query<ReportingManagersApiResponse, { searchQuery?: string }>({
      query: ({ searchQuery }) => {
        let url = `peoples/reporting-managers/`;
        if (searchQuery?.trim()) {
          url += `?search=${searchQuery}`;
        } else {
          url += `?limit=25`;
        }
        return url;
      },
    }),


    getSkills: builder.query<SkillsApiResponse, { searchQuery?: string }>({
      query: ({ searchQuery }) => {
        let url = 'peoples/skill/';
        if (searchQuery?.trim()) {
          url += `?search=${searchQuery}`;
        }
        return url;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'peoples/logout/',
        method: 'POST',
        body: { refresh_token: getCookieValue('refresh', '') },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const { data } = response;
          if (data?.success) {
            dispatch(clearCredentials());
            clearCookieData();
          }

        } catch (error) { }
      },
    }),
  }),
});

export const {
  useGetPaginatedPeopleByTypeQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetReportingManagersQuery,
  useGetSkillsQuery,
  useLogoutMutation,
} = PeopleApi;
