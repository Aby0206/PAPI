import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = "http://192.168.0.7:5050/" as string
interface Project {
	id?: number;
	name?: string;
}

export const BillingTypeApi = createApi({
    reducerPath: 'BillingTypeApi',
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
        getBillingType: builder.query({
            query: ({ id, page }) =>
            id ? `project/billingType/${id}` : page ? `project/billingType?page=${page}` : 'project/billingType',  
              }),
        addBillingType: builder.mutation({
            query: (payload) => ({
                url: `project/billingType`,
                method: 'POST',
                body: payload,
            }),
        }),
        updateBillingType: builder.mutation({
            query: (payload) => ({
                url: `project/billingType`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteBillingType: builder.mutation({
            query: (id) => ({
                url: `project/billingType/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { 
useGetBillingTypeQuery,    
useAddBillingTypeMutation,
useDeleteBillingTypeMutation,
useUpdateBillingTypeMutation
} = BillingTypeApi;
