import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const CurrencyApi = createApi({
    reducerPath: 'CurrencyApi',
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
        getCurrency: builder.query({
            query: ({ id, page }) =>
            id ? `project/currency/${id}` : page ? `project/currency?page=${page}` : 'project/currency',  
              }),
        addCurrency: builder.mutation({
            query: (payload) => ({
                url: `project/currency`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateCurrency: builder.mutation({
            query: (payload) => ({
                url: `project/currency`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteCurrency: builder.mutation({
            query: (id) => ({
                url: `project/currency/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetCurrencyQuery,
    useAddCurrencyMutation,
    useUpdateCurrencyMutation,
    useDeleteCurrencyMutation} = CurrencyApi;
