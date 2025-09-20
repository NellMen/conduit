import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypeSetTags} from "../types";


const settingsTagsInfo: TypeSetTags = {
    tagName: '',
};



export const settingsTag = createSlice({
    name: 'settingsTagReq',
    initialState: settingsTagsInfo,
    reducers: {
        setSettingsTagsInfo(state, action: PayloadAction<string>) {
            state.tagName = action.payload;
        },
        removeSettingTag(state) {
            state.tagName = '';
        },
    },
});

export const { setSettingsTagsInfo, removeSettingTag } = settingsTag.actions;

export default settingsTag.reducer;
