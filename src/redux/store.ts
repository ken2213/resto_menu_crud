import { configureStore } from "@reduxjs/toolkit";
import expandReducer from "./features/expand/expandSlice";
import activeLinkReducer from "./features/activeLink/activeLinkSlice";
import searchQueryReducer from "./features/search/searchSlice";

// Define the shape of your Redux State
export interface RootState {
    expander : {
        expand: boolean;
    },
    activatorLink : {
        activeLink: string;
    }
    searcherQuery : {
        searchQuery: string
    }
}

export default configureStore({
    reducer: {
        expander: expandReducer,
        activatorLink: activeLinkReducer,
        searcherQuery: searchQueryReducer,
    }
})