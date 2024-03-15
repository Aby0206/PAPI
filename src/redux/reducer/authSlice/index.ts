import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
export interface PermissionsState {
  access:string;
  access_token:string,
  refresh_token:string,
  refresh:string;
  permissions: string[];
  roles: string[];
  first_name:string,
  last_name:string,
  title:string,
  image:string,
  user_id:number,

};
export const getCookieValue = (cookieName:string, defaultValue = '') => {
  const cookieValue = Cookies.get(cookieName);
  return cookieValue ?? defaultValue;
};

const initialState: PermissionsState = {
  access: getCookieValue('access'),
  refresh: getCookieValue('refresh'),
  permissions: JSON.parse(getCookieValue('permissions', '[]')),
  roles: JSON.parse(getCookieValue('roles', '[]')),
  access_token: '',
  refresh_token: '',
  first_name:'',
  last_name:'',
  title:'',
  image:'',
  user_id:0

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<PermissionsState>) => {
      state.access=action.payload.access?action.payload.access:action.payload.access_token;
      state.refresh=action.payload.refresh?action.payload.refresh:action.payload.refresh_token;
      state.permissions = action.payload.permissions;
      state.roles = action.payload.roles;
    },
    clearCredentials:(state)=>{
      state.access='';
      state.refresh='';
      state.permissions = [];
      state.roles = [];
    }
  },
});

export const { setCredentials,clearCredentials } = authSlice.actions;

export default authSlice.reducer;