import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_BASE_URL;
import Cookies from 'js-cookie';

export const ZohoApi = createApi({
	reducerPath: 'ZohoApi',
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
		ZohoSynchronization: builder.query({
			query: () => 'peoples/',
		}),
	}),
});

export const { useLazyZohoSynchronizationQuery } = ZohoApi;
