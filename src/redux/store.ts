import { configureStore } from "@reduxjs/toolkit";
import expandReducer from "./features/expand/expandSlice";
import activeLinkReducer from "./features/activeLink/activeLinkSlice";

// Define the shape of your Redux State
export interface RootState {
    expander : {
        expand: boolean;
    },
    activatorLink : {
        activeLink: string;
    }

}

export default configureStore({
    reducer: {
        expander: expandReducer,
        activatorLink: activeLinkReducer,
    }
})