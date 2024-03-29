import MenuItem from "./MenuItem";
import MenuItemDetails from "./MenuItemDetails";

import { Sheet, SheetTrigger } from "./ui/sheet";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { setFood } from "@/redux/features/food/foodSlice";

import FirebaseConfig from "@/config/firebase";
import { off, onValue, ref } from "firebase/database";

import { useEffect, useState } from "react";
import { FoodInterface } from "@/types";

const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state: RootState) => state.fooder.foods);

  const [loading, setLoading] = useState(true);

  /*
    This is searchQuery state variable that uses redux,

    The value of searchQuery will be coming from the 'TopNavigation' component

    which also uses searchQuery on its input event value

    So literally, what being entered on Input component of search field of TopNavigation component is also being shared on this component.

    'ON REAL TIME' 
  */
  const searchQuery = useSelector(
    (state: RootState) => state.searcherQuery.searchQuery
  );

  // Filtered food items based on search query
  const filteredFoods = foods
    ? foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    // Initialize Firebase
    const database = FirebaseConfig();
    const dbRef = ref(database, "foodItems");

    // Retrieve data which is foods from Firebase
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the object of food items to an array
        const foodsArray = Object.values(data);
        // Set 'foodsArray' on state'setFood' setter variable
        // So technically it will be stored on 'food' state variable
        dispatch(setFood(foodsArray));
        setLoading(false);
      } else {
        console.log("No Data Fetched from firebase");
        /*
          If there's no data on foodsArray 
          set it into an empty array

          Technically speaking, when you delete the only last
          data on an array it will also delete across devices
          without the need to refresh because it will automatically
          re-render for you
        */
        dispatch(setFood([]));
        setLoading(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      off(dbRef);
    };
  }, []);

  return (
    <>
      {/* Conditionally render loading screen */}
      {loading ? (
        <div className="flex flex-col gap-y-8 justify-center items-center h-screen">
          <div
            className="inline-block h-8 w-8 lg:h-16 lg:w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
          <h4>Loading data...</h4>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center mt-[120px]">
            {/* <div className="w-[350px] sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1100px] 2xl:w-[1350px] ">
              <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-bold px-6">MENU MANAGER</h1>
            </div> */}
          </div>

          <div className="overflow-y-auto w-full flex justify-center">
            {/* 
              - This will map all of items of FoodItems 
              array variable inside of MenuItem component

              - Conditional rendering based on filteredFoodItems
            */}
            {filteredFoods.length === 0 ? (
              <div className="flex flex-col gap-y-8 justify-center items-center h-[70vh]">
                <p className="text-center text-gray-600 text-[1.2rem]">
                  No Food Items Matched...
                </p>
              </div>
            ) : (
              <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[85%] min-h-[85vh] flex justify-center">
                <div className="px-4 py-8 w-full sm:w-[80%] md:w-[85%] lg:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-auto gap-x-2 gap-y-4 justify-center items-start">
                  {filteredFoods.map((food: FoodInterface) => (
                    <Sheet key={food.__id_food}>
                      {/* This will trigger <MenuItemDetails /> component to slide in on the right part of the screen */}
                      <SheetTrigger className="flex justify-center">
                        <MenuItem key={food.__id_food} food={food} />
                      </SheetTrigger>
                      {/* A component containing all details of a clicked item */}
                      <MenuItemDetails key={food.__id_food} food={food} />
                    </Sheet>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
