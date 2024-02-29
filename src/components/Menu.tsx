import MenuItem from "./MenuItem"
import MenuItemDetails from "./MenuItemDetails"

import { Sheet, SheetTrigger } from "./ui/sheet"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"

import { setSearchQuery } from "@/redux/features/search/searchSlice"
import { setFood } from "@/redux/features/food/foodSlice"

import Category from "./Category"
import { PlusCircle } from "lucide-react"

import FirebaseConfig from "@/config/firebase";
import { off, onValue, ref } from "firebase/database"

import { AddFoodForm } from "./modals/AddFood"

import { useEffect } from "react"
import { FoodInterface } from "@/types"

const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state: RootState) => state.fooder.foods)

  useEffect(() => {
    // Initialize Firebase
    const database = FirebaseConfig();
    const dbRef = ref(database, 'foodItems');


    // Retrieve data which is foods from Firebase
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the object of food items to an array
        const foodsArray = Object.values(data);
        console.log("Fetched foods from firebase:", foodsArray); // Log fetched data
        // Set 'foodsArray' on state'setFood' setter variable
        // So technically it will be stored on 'food' state variable
        dispatch(setFood(foodsArray))
      } else {
        console.log("No data fetched from firebase");
        dispatch(setFood([])); // Ensure Redux store is updated with an empty array
      }
    })

    // Clean up the listener when the component unmounts
    return () => {
      off(dbRef)
    }
  }, []);


  const searchQuery = useSelector((state: RootState) => state.searcherQuery.searchQuery)


  const handleSearchChange = (event: any) => {
    dispatch(setSearchQuery(event.target.value))
  }

  // Filtered food items based on search query
  const filteredFoods = foods ? foods.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  ) : [];

  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-[350px] sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1100px] 2xl:w-[1350px] ">
          <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-bold px-6">MENU MANAGER</h1>
        </div>

      </div>

      {/* Search input */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-[350px] sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1200px] 2xl:w-[1350px] px-8 flex justify-between ">
          <div className="flex w-[50%]">
            <Input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="text-gray-50 bg-sub-dark border-gray-700 shadow-md"
            />
          </div>

          <div className="flex justify-center items-center">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-green-900">
                  <PlusCircle /> <span>Add Food</span>
                </Button>
              </DialogTrigger>
              <AddFoodForm />
            </Dialog>
          </div>
        </div>
      </div>

      <div className="w-full min-h-10 flex justify-center items-center mt-1">
        <div className="w-[350px] sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1200px] 2xl:w-[1350px] px-8 pt-2 pb-4 flex justify-start gap-x-4 overflow-y-auto">
          <Category />
        </div>
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

              {filteredFoods.length === 0 ? (
                <p className="text-center text-gray-600">No Food Items Matched...</p>
              ) : (     
              filteredFoods.map((food: FoodInterface) => (
                <Sheet>
                  {/*
                    This will trigger <MenuItemDetails /> component
                    to slide in on right part of screen

                    Pass '__id_food' as key value and 
                    pass state variable 'food' as food prop value  
                  */}
                  <SheetTrigger>
                    <MenuItem key={food.__id_food} food={food} />
                  </SheetTrigger>

                  {/* 
                    A component containing all details of a 
                    clicked item.

                    Pass '__id_food' as key value and 
                    pass state variable 'food' as food prop value
                  */}
                  <MenuItemDetails key={food.__id_food} food={food} />
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