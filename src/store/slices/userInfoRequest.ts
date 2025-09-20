import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {requests} from "../../api";
import {userType} from "../types";


const userInfo: userType = {
	email: '',
	password: '',
	username: '',
	bio: '',
	image: '',
	status: null,
	error: null,
};

export const fetchUser = createAsyncThunk(
	'userInfo/fetchUser',
	async function(_, {rejectWithValue}) {
		try {
			return await requests.login()
		} catch {
			return rejectWithValue("Ошибка сервера");
		}
	}
)


export const counterSlice = createSlice({
	name: 'userInfoRequest',
	initialState: userInfo,
	reducers: {
		removeUser(state) {
			state.email = '';
			state.password = '';
			state.username = '';
			state.bio = '';
			state.image = '';
			localStorage.clear();
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<userType>) => {
				state.email = action.payload.email;
				state.password = action.payload.password;
				state.username = action.payload.username;
				state.bio = action.payload.bio;
				state.image = action.payload.image;
				state.error = null;
				state.status = 'success';
			})
			.addCase(fetchUser.rejected, (state) => {
				state.status = 'error';
				state.error = "Ошибка сервера";
			})
	},
});

export const { removeUser } = counterSlice.actions;

export default counterSlice.reducer;
