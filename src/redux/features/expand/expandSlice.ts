import { createSlice } from "@reduxjs/toolkit";

export const expandSlice = createSlice({
    name: 'expand',
    initialState: {
        expand: false
    },
    reducers: {
        setExpand: (state) => {
            state.expand = !state.expand;
        },
    }
})

export const { setExpand } = expandSlice.actions

export default expandSlice.reducer;