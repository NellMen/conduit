import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/userInfoRequest';
import { useDispatch, useSelector } from 'react-redux';
import settingsTag from "./slices/settingsTagsRequests";
import settingsRequest from "./slices/settingsRequest";

const store = configureStore({
	reducer: {
		userInfoRequest: counterReducer,
		settingsTagReq: settingsTag,
		settingsReq: settingsRequest,
	},
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useUppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
