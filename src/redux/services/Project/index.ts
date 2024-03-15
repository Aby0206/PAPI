import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = "http://192.168.0.7:5050/project/" as string
import Cookies from 'js-cookie';
import { NullableParam } from '../../../types'
export interface ProjectApiResponse {
    id: number;
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
type Id = NullableParam<number> | undefined;

interface PaginatedResponse {
    totalCount: number;
    data: any;
}

interface QueryParams {
    page: number;
    limit:number;
}

export const ProjectApi = createApi({
    reducerPath: 'ProjectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('access');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            // headers.set('Content-Type', 'multipart/form-data'); 
            return headers;
        },
    }),
    endpoints: (builder) => ({
        SaveProject: builder.mutation<
            ProjectApiResponse,
            { id?: Id; payload: any }
        >({
            query: ({ id, payload }) => ({
                url: `project`,
                method: (id && 'PUT') || 'POST',
                body: payload,
            }),
        }),
        getPaginatedProject: builder.query<PaginatedResponse, QueryParams>({
            query: ({ page,limit }) => {
                let url = `allProject?count=${limit}&page=${page}`;
                return url;
            },
        }),
        getProjectById: builder.query<{data:any}, { id: string }>({
			query: ({ id }) => `project?id=${id}`,
		}),
    }),
});

export const {
    useSaveProjectMutation,
    useGetPaginatedProjectQuery,
    useLazyGetProjectByIdQuery
} = ProjectApi;
