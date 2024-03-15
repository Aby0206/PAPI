import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { NullableParam } from 'src/types';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const ProjectStatusApi = createApi({
    reducerPath: 'ProjectStatusApi',
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
        getProjectStatus: builder.query({
            query: ({ id, page }) =>
            id ? `project/projectStatus/${id}` : page ? `project/projectStatus?page=${page}` : 'project/projectStatus',  
              }),
        
        addProjectStatus: builder.mutation({
            query: (payload) => ({
                url: `project/projectStatus`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateProjectStatus: builder.mutation({
            query: (payload) => ({
                url: `project/projectStatus`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteProjectStatus: builder.mutation({
            query: (id) => ({
              url: `project/projectStatus/${id}`,
              method: 'DELETE',
            }),
          }),
          
    }),
});

export const 
    {useGetProjectStatusQuery,
    useAddProjectStatusMutation,
    useUpdateProjectStatusMutation,
    useDeleteProjectStatusMutation} = ProjectStatusApi;
