import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const ProjectDomainApi = createApi({
    reducerPath: 'ProjectDomainApi',
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
        getProjectDomain: builder.query({
            query: ({ id, page }) =>
            id ? `project/domain/${id}` : page ? `project/domain?page=${page}` : 'project/domain',  
              }),
        addProjectDomain: builder.mutation({
            query: (payload) => ({
                url: `project/domain`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateProjectDomain: builder.mutation({
            query: (payload) => ({
                url: `project/domain`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteProjectDomain: builder.mutation({
            query: (id) => ({
                url: `project/domain/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetProjectDomainQuery,
    useAddProjectDomainMutation,
    useUpdateProjectDomainMutation,
    useDeleteProjectDomainMutation} = ProjectDomainApi;
