import MenuItem from "./MenuItem"
import { FoodItem, FoodItems } from "@/constants"
import MenuItemDetails from "./MenuItemDetails"

const Menu = () => {
  return (
    <>
      <div className="w-full">
        <h1 className="text-[2rem] font-bold">MENU ITEM</h1>
      </div>

      <div className="w-full flex justify-center">
        {/* GRID CONTAINER */}
        <div 
          className="
            overflow-y-auto sm:w-[560px] md:w-[690px] lg:w-[940px] xl:w-[1300px] 2xl:w-[1350px]
            "
        >
          {/* GRID */}
          <div 
            className="w-full px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center xl:justify-items-start gap-x-4 gap-y-8"
          >
            {FoodItems.map((foodItem: FoodItem, index: number) => (
              <MenuItem key={index} foodItem={foodItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu