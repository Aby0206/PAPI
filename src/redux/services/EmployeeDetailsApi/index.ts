import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const EmployeeDetailsApi = createApi({
    reducerPath: 'EmployeeDetailsApi',
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
        addSkill: builder.mutation({
            query: (payload) => ({
                url: `peoples/user/skill/`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateSkill: builder.mutation({
            query: ({ id, payload }) => ({
                url: `peoples/user/skill/${id}/`,
                method: 'PATCH',
                body: payload,
            }),
        }),
        getUserDetails: builder.query({
            query: (id) => `peoples/${id}`
        }),
        getUserProjects: builder.query({
            query: ({id,page}) => `peoples/${id}/user-projects/?page=${page}`
        }),
        getUserSkills: builder.query({
            query: ({id,page}) => `peoples/${id}/user-skills/?page=${page}`
        }),
        getWorkExperience: builder.query({
            query: ({id,page}) => `peoples/${id}/work-experience/?page=${page}`
        }),
        getCertificateList: builder.query({
            query: ({id,page}) => `peoples/${id}/certificates/?page=${page}`
        }),
    }),
});

export const {
    useGetUserDetailsQuery,
    useGetUserProjectsQuery,
    useGetUserSkillsQuery,
    useAddSkillMutation,
    useUpdateSkillMutation,
    useGetWorkExperienceQuery,
    useGetCertificateListQuery
} = EmployeeDetailsApi;