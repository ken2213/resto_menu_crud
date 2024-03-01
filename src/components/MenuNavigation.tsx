// MenuNavigation.tsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/features/search/searchSlice";
import { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { AddFoodForm } from "./modals/AddFood";
import Category from "./Category";

const MenuNavigation = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.searcherQuery.searchQuery);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <div className="w-full flex flex-col ">
            <div className="w-full flex justify-end sm:justify-center items-center">
                <div className="flex md:gap-x-8 w-full sm:w-[80%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] justify-center  sm:justify-around md:justify-center lg:justify-around py-4">
                    {/* Search input */}
                    <div className="flex w-[65%] max-w-[500px] 2xl:max-w-[650px] px-4">
                        <Input 
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="text-gray-50 bg-sub-dark border-gray-700 shadow-md"
                        />
                    </div>

                    <div className="flex sm:w-[5%] justify-center items-center">
                        <Dialog>
                            <DialogTrigger>
                                <Button 
                                    className="px-3 text-[1.05rem] font-semibold bg-green-700 hover:bg-green-800 rounded-full shadow-sm text-green-100 hover:text-green-200"
                                    variant="ghost"
                                >
                                    <Plus /> Create
                                </Button>
                            </DialogTrigger>
                            <AddFoodForm />
                        </Dialog>
                    </div>
                </div>
            </div>

            <div className="w-full min-h-14 pb-2 flex justify-center items-center">
                <Category />
            </div>
        </div>
    );
};

export default MenuNavigation;