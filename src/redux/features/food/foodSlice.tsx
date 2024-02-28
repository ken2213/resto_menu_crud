import { createSlice } from "@reduxjs/toolkit";

export const foodSlice = createSlice({
    name: 'food',
    initialState: {
        foods: [],
    },
    reducers: {
        setFood: (state, action) => {
            state.foods = action.payload
        }
    }
})

export const { setFood } = foodSlice.actions;

export default foodSlice.reducer;