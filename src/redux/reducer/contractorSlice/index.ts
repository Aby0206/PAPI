import { createSlice } from '@reduxjs/toolkit';

interface PermissionsState {
	contractorInfo: {};
}

const initialState: PermissionsState = {
	contractorInfo: {},
};

const contractorSlice = createSlice({
	name: 'contractor',
	initialState,
	reducers: {
		setData: (state, { payload }) => {
			state.contractorInfo = payload;
		},
	},
});

export const { setData } = contractorSlice.actions;

export default contractorSlice.reducer;
