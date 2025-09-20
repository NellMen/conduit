import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {requests} from "../../api";
import {settingsType} from "../types";


const settingsInfo: settingsType = {
    status: '',
    error: null,
};

export const settingsRequest = createAsyncThunk(
    'settings/settingsRequest',
    async function({urlImage, username, bio, email, password}: {
        urlImage: string,
        username: string,
        bio: string,
        email: string,
        password: string
    }, {rejectWithValue}) {
        try {
            const processedEmail = email.includes('@') ? email : `${email}@mail.ru`;
            return await requests.settings(urlImage, username, bio, processedEmail, password);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: settingsInfo,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(settingsRequest.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(settingsRequest.fulfilled, state => {
                state.error = null;
                state.status = 'success';
            })
            .addCase(settingsRequest.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    },
});

export default settingsSlice.reducer;