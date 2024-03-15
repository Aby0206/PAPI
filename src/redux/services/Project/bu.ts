import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const BusinessUnitApi = createApi({
    reducerPath: 'BusinessUnitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('access');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            headers.set('Content-Type', 'application/json'); 
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBusinessUnit: builder.query({
            query: ({ id, page }) =>
            id ? `project/businessUnit/${id}` : page ? `project/businessUnit?page=${page}` : 'project/businessUnit',  
              }),
        addBusinessUnit: builder.mutation({
            query: (payload) => ({
                url: `project/businessUnit`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateBusinessUnit: builder.mutation({
            query: (payload) => ({
                url: `project/businessUnit`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteBusinessUnit: builder.mutation({
            query: (id) => ({
                url: `project/businessUnit/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetBusinessUnitQuery,
    useAddBusinessUnitMutation,
    useUpdateBusinessUnitMutation,
    useDeleteBusinessUnitMutation} = BusinessUnitApi;
