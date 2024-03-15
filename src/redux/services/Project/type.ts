import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const ProjectTypeApi = createApi({
    reducerPath: 'ProjectTypeApi',
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
        getprojectType: builder.query({
            query: ({ id, page }) =>
            id ? `project/projectType/${id}` : page ? `project/projectType?page=${page}` : 'project/projectType',  
              }),
        addprojectType: builder.mutation({
            query: (payload) => ({
                url: `project/projectType`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateprojectType: builder.mutation({
            query: (payload) => ({
                url: `project/projectType`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteprojectType: builder.mutation({
            query: (id) => ({
                url: `project/projectType/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetprojectTypeQuery,
    useAddprojectTypeMutation,
    useUpdateprojectTypeMutation,
    useDeleteprojectTypeMutation} = ProjectTypeApi;
