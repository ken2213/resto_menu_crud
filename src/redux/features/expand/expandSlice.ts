import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'expand',
    initialState: {
        expand: true
    },
    reducers: {
        setExpand: (state) => {
            state.expand = false;
        },
    }
})

export const { setExpand } = counterSlice.actions

export default counterSlice.reducer;