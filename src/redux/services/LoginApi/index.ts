import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, PermissionsState } from '../../reducer/authSlice';
import { setCookieValue,getCookieValue} from '../../../utils/index';
const baseUrl = import.meta.env.VITE_BASE_URL;

interface LoginApiResponse {
	refresh: string;
	access: string;
	refresh_token: string;
	access_token: string;
	permissions: string[];
	roles: string[];
	first_name: string;
	last_name: string;
	title: string;
	image: string;
	user_id: number;
}
interface LoginApiInput {
	email: string;
	password: string;
}
interface LoginGoogleApiInput {
	id_token: string;
	access_token: string;
}

const setData = (data: LoginApiResponse, loginType: string):void => {
	try {
    const cookieMappings: Record<string, string |number| string[]> = {
      'access': loginType === 'google' ? data.access_token : data.access,
      'refresh': loginType === 'google' ? data.refresh_token : data.refresh,
      'access_token': data.access_token,
      'refresh_token': data.refresh_token,
      'permissions': data.permissions,
      'roles': data.roles,
      'first_name': data.first_name,
      'last_name': data.last_name,
      'title': data.title,
      'user_id': data.user_id,
      'image': data.image,
    };
  
    for (const [key, value] of Object.entries(cookieMappings)) {
      setCookieValue(key, value);
    }
	} catch (error) {}
};

export const LoginApi = createApi({
	reducerPath: 'LoginApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		login: builder.mutation<LoginApiResponse, LoginApiInput>({
			query: ({ email, password }) => ({
				url: 'peoples/login/',
				method: 'POST',
				body: { email, password },
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const response = await queryFulfilled;
					const { data } = response;
					dispatch(setCredentials(data as PermissionsState));
					setData(data, 'normal');
				} catch (error) {}
			},
		}),
		loginGoogle: builder.mutation<LoginApiResponse, LoginGoogleApiInput>({
			query: ({ id_token, access_token }) => ({
				url: 'peoples/login/google/',
				method: 'POST',
				body: {
					id_token,
					access_token,
				},
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const response = await queryFulfilled;
					const { data } = response;
					dispatch(setCredentials(data as PermissionsState));
					setData(data, 'google');
				} catch (error) {}
			},
		}),
	}),
});

export const { useLoginMutation, useLoginGoogleMutation} = LoginApi;
