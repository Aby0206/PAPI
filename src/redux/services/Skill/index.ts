import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const baseUrl = import.meta.env.VITE_BASE_URL as string;
import { NullableParam } from 'src/types';

export interface Filters {
	status?: NullableParam<boolean>;
	category?: string;
}

interface Skill {
	id: number;
	name: string;
	skill?: NullableParam<string>;
	total_employee: number;
	status: boolean;
	category: {
		id: number;
		category: string;
		status: boolean;
	};
}

interface PaginatedResponse {
	total_count: number;
	results: {
		item_count: number;
		data: Skill[];
	};
}

interface QueryParams {
	page: number;
	searchQuery?: string;
	filters?: Filters;
	orderBy?: string;
}

export const SkillApi = createApi({
	reducerPath: 'SkillApi',
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
		getPaginatedSkill: builder.query<PaginatedResponse, QueryParams>({
			query: ({ page, searchQuery, orderBy, filters }) => {
				let url = `peoples/skill-master/?page=${page}`;
				if (searchQuery?.trim())
					url += `&search=${searchQuery}`;
				if (orderBy?.trim()) url += `&ordering=${orderBy}`;
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
		addSkillCategory: builder.mutation({
			query: (payload) => ({
				url: `peoples/skills-categories/`,
				method: 'POST',
				body: payload,
			}),
		}),
		updateSkillCategory: builder.mutation({
			query: ({ id, payload }) => ({
				url: `peoples/skills-categories/${id}/`,
				method: 'PATCH',
				body: payload,
			}),
		}),
		addSkill: builder.mutation({
			query: (payload) => ({
				url: `peoples/skill/`,
				method: 'POST',
				body: payload,
			}),
		}),
		updateSkill: builder.mutation({
			query: ({ id, payload }) => ({
				url: `peoples/skill/${id}/`,
				method: 'PATCH',
				body: payload,
			}),
		}),
		getSkillCategoryList: builder.query({
			query: ({ searchQuery,id }) => {
				let url = `peoples/skill/categories/`;
				 
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				} else {
					url += `?limit=25`;
				}
				if (id) {
					url += `&skill=${id}`;
				} 
				return url;
			},
		}),
		getSkillCategory: builder.query({
			query: (id:number) => {
				let url = `peoples/skill/categories/?skill=${id}`;
				return url;
			},
		}),
		getSkillList: builder.query({
			query: ({ searchQuery,id }) => {
				let url = 'peoples/skill/';
				if (searchQuery?.trim()) {
					url += `?search=${searchQuery}`;
				} else {
					url += `?limit=25`;
				}
				if (id) {
					url += `&category=${id}`;
				} 
				return url;
			},
		}),
		deleteSkill: builder.mutation({
			query: (id) => ({
				url: `peoples/skill/${id}/`,
				method: 'DELETE',
			}),
		}),
		deleteSkillCategory: builder.mutation({
			query: (id) => ({
				url: `peoples/skills-categories/${id}/`,
				method: 'DELETE',
			}),
		}),
		deleteUserSkill: builder.mutation({
			query: (id) => ({
				url: `peoples/user/skill/${id ?? ''}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetPaginatedSkillQuery,
	useGetSkillCategoryListQuery,
	useGetSkillListQuery,
	useAddSkillCategoryMutation,
	useUpdateSkillCategoryMutation,
	useAddSkillMutation,
	useUpdateSkillMutation,
	useDeleteSkillCategoryMutation,
	useDeleteSkillMutation,
	useLazyGetSkillCategoryQuery,
	useDeleteUserSkillMutation
} = SkillApi;
