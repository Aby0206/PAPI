import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const TechnologyStackApi = createApi({
    reducerPath: 'TechnologyStackApi',
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
        getTechnologyStack: builder.query({
            query: ({ id, page }) =>
            id ? `project/technologyStack/${id}` : page ? `project/technologyStack?page=${page}` : 'project/technologyStack',  
              }),
        getSearchTechnologyStack:builder.query({
            query:({stackName})=>
            `project/technologyStackSearch?stackName=${stackName}`
        }),
        addTechnologyStack: builder.mutation({
            query: (payload) => ({
                url: `project/technologyStack`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateTechnologyStack: builder.mutation({
            query: (payload) => ({
                url: `project/technologyStack`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteTechnologyStack: builder.mutation({
            query: (id) => ({
                url: `project/technologyStack/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { 
useGetTechnologyStackQuery,
useGetSearchTechnologyStackQuery,    
useAddTechnologyStackMutation,
useDeleteTechnologyStackMutation,
useUpdateTechnologyStackMutation
} = TechnologyStackApi;
