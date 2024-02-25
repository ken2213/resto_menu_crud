import MenuItem from "./MenuItem"
import { FoodItem, FoodItems } from "@/constants"
import MenuItemDetails from "./MenuItemDetails"

import { 
  Sheet,
  SheetTrigger,
} from "./ui/sheet"

const Menu = () => {
  return (
    <>
      <div className="w-full flex justify-center bg-red-900">
        <div className="w-[350px] sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1100px] 2xl:w-[1350px] bg-orange-900">
          <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-bold px-10">MENU MANAGER</h1>
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
              This will map all of items of FoodItems 
              array variable inside of MenuItem component
            */}
            {FoodItems.map((foodItem: FoodItem, index: number) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu