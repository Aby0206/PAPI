import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { ApiResponse, NullableParam,Proficiency } from 'src/types';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export type PayloadProps = {
	rating: number;
	description: string;
};
interface ProficiencyResponse {
	count: number;
	next: NullableParam<boolean>;
	previous: NullableParam<boolean>;
	results: Proficiency[];
}

export const ProficiencyApi = createApi({
	reducerPath: 'ProficiencyApi',
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
		getProficieny: builder.query<ProficiencyResponse, null>({
			query: (id) => `peoples/proficiency`,
		}),

		updateProficieny: builder.mutation<
			ApiResponse,
			{ id?: number; payload: PayloadProps }
		>({
			query: ({ id, payload }) => ({
				url: `peoples/proficiency/${id ?? ''}/`,
				method: 'PATCH',
				body: payload,
			}),
		}),
	}),
});

export const { useUpdateProficienyMutation, useGetProficienyQuery } =
	ProficiencyApi;
