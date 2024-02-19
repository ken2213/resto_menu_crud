import { createSlice } from "@reduxjs/toolkit";

export const activeLinkSlice = createSlice({
    name: 'activeLink',
    initialState: {
        activeLink: window.location.hash.substring(1),
    },
    reducers: {
        setActiveLink: (state, action) => {
            state.activeLink = action.payload;
        },
    },
})

export const { setActiveLink } = activeLinkSlice.actions

export default activeLinkSlice.reducer;