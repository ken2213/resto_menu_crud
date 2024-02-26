import MenuItem from "./MenuItem"
import { FoodItem, FoodItems } from "@/constants"
import MenuItemDetails from "./MenuItemDetails"

import { 
  Sheet,
  SheetTrigger,
} from "./ui/sheet"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { setSearchQuery } from "@/redux/features/search/searchSlice"

const Menu = () => {
  const searchQuery = useSelector((state: RootState) => state.searcherQuery.searchQuery)
  const dispatch = useDispatch();

  const handleSearchChange = (event: any) => {
    dispatch(setSearchQuery(event.target.value))
  }

  // Filtered food items based on search query
  const filteredFoodItems = FoodItems.filter(foodItem =>
    foodItem.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <>
      <div className="w-full flex justify-center bg-red-900">
        <div className="w-[350px] sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1100px] 2xl:w-[1350px] bg-orange-900">
          <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-bold px-10">MENU MANAGER</h1>
        </div>

      </div>

      {/* Search input */}
      <div className="w-full flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="w-full flex justify-center">
        {/* GRID CONTAINER */}
        <div 
          className="
            overflow-y-auto sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1200px] 2xl:w-[1350px]
            "
        >
          {/* GRID */}
          <div 
            className="w-full px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center xl:justify-items-start gap-x-4 gap-y-8"
          >
            {/* 
              - This will map all of items of FoodItems 
              array variable inside of MenuItem component

              - Conditional rendering based on filteredFoodItems
            */}

              {filteredFoodItems.length === 0 ? (
                <p className="text-center text-gray-600">No Food Items Matched...</p>
              ) : (     
              filteredFoodItems.map((foodItem: FoodItem, index: number) => (
                <Sheet>
                  {/*
                    This will trigger <MenuItemDetails /> component
                    to slide in on right part of screen
                  */}
                  <SheetTrigger>
                    <MenuItem key={index} foodItem={foodItem} />
                  </SheetTrigger>

                  {/* 
                    A component containing all details of a 
                    clicked item.
                  */}
                  <MenuItemDetails key={index} foodItem={foodItem} />
                </Sheet>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu