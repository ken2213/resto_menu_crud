import { configureStore } from "@reduxjs/toolkit";
import expandReducer from "./features/expand/expandSlice";
import activeLinkReducer from "./features/activeLink/activeLinkSlice";
import searchQueryReducer from "./features/search/searchSlice";
import foodReducer from './features/food/foodSlice';
import { FoodInterface } from "@/types";

// Define the shape of your Redux State
export interface RootState {
    expander : {
        expand: boolean;
    },
    activatorLink : {
        activeLink: string;
    },
    searcherQuery : {
        searchQuery: string;
    },
    fooder : {
        foods: FoodInterface[];
    }
}

export default configureStore({
    reducer: {
        expander: expandReducer,
        activatorLink: activeLinkReducer,
        searcherQuery: searchQueryReducer,
        fooder: foodReducer,
    }
})