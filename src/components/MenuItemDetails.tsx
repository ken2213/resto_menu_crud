import { FoodItem } from "@/constants";
import { HandCoins, Tag, PackageOpen, Trash, Pen } from "lucide-react";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FoodInterface } from "@/types";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditFoodForm from "./modals/EditFood"; 
import { DeleteFood } from "./modals/DeleteFood";

const MenuItemDetails = ({ food }: { food: FoodInterface }) => {
  return (
    <SheetContent className="bg-main-dark border-l-gray-600 pt-12 text-gray-50">
      <SheetHeader>
        {/* FOOD IMAGE */}
        <div className="w-full">
          <img 
            // src={food.image}
            src="https://honehealth.com/wp-content/uploads/2023/06/high-protein-fast-food-1.webp"
            alt={food.name}
            className="w-full h-[280px] object-cover rounded-md shadow-2xl"
          />
        </div>

        {/* FOOD NAME AND CATEGORY */}
        <div className="flex flex-col">
          <h1 className="text-[2.5rem] font-extrabold text-center tracking-wide">
            {food.name}
          </h1>

          <p className="text-gray-500 text-[1.2rem] text-center font-semibold">
            {food.category}
          </p>
        </div>
      </SheetHeader>

      {/* Horizontal Line */}
      <hr className='border-gray-700 opacity-30 rounded-full border-[2px] my-4' />

      <main className="mx-2 h-[380px] text-gray-300 overflow-y-auto">

        <div className='pt-2 flex flex-col gap-y-2 '>

          {/* PRICE */}
          <div className='flex justify-between'>
            <div className='flex gap-x-1'>
                <div className='flex items-center'>
                    <Tag 
                        size={25}
                    />
                </div>

                <div className='flex items-center'>
                    <p className='text-lg font-semibold'>
                        Price
                    </p> 
                </div>
            </div>
            
            <div className='font-bold text-lg'>
                <p>
                    <span className='text-sm text-gray-500'>$</span>
                    {food.price}
                </p>
            </div>
          </div>

          {/* MANUFACTURING COST */}
          <div className='flex justify-between'>
              <div className='flex gap-x-1'>
                  <div className='flex items-center'>
                      <HandCoins
                          size={25}
                      />
                  </div>
                  
                  <div className='flex items-center'>
                      <p className='text-lg font-semibold'>
                          Manufacturing Cost
                      </p> 
                  </div>
              </div>

              <div className='font-bold text-lg'>
                  <p>
                      <span className='text-sm text-gray-500'>$</span>
                      {food.cost}
                  </p>
              </div>

          </div>

          {/* AMOUNT OF STOCKS */}
          <div className='flex justify-between'>
              <div className='flex gap-x-1'>
                  <div className='flex items-center'>
                      <PackageOpen
                          size={25}
                      />
                  </div>

                  <div className='flex items-center'>
                      <p className='text-lg font-semibold'>
                          Stocks left
                      </p> 
                  </div>
              </div>

              <div className='font-bold text-lg'>
                  <p>
                      {food.stocks}
                  </p>
              </div>
              
          </div>

        </div>

        {/* Horizontal Line */}
        <div className="flex justify-center">
          <hr className='border-gray-700 opacity-30 w-[70%] rounded-full border-[2px] my-6' />
        </div>

        {/* AVAILABLE SIZES */}
        <div className='flex flex-col justify-center items-center font-semibold gap-y-4'>
          <h1 className='text-gray-200'>Available Sizes</h1>
          <div className='w-full flex justify-evenly'>
            {/* {foodItem.options?.map((option) => (
                <Badge
                    className='text-gray-300 bg-gray-700 shadow-sm hover:bg-gray-600 hover:cursor-pointer hover:text-gray-200 hover:shadow-lg  hover:transition-all transition-all py-2 px-4'
                    title={option}
                >
                    <div 
                        className='w-full flex justify-center items-center text-[1rem] capitalize'
                    >
                      {option}
                    </div>
                </Badge>
            ))} */}
          </div>

        </div>
            
      </main>


      <footer className="absolute bottom-0 left-0 w-full grid grid-cols-2 gap-x-4 px-6 pb-6">
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"destructive"}
              className="text-sm"
            >
              <Trash 
                className="mr-2 h-4 w-4" 
              />
              Delete
            </Button>
          </DialogTrigger>
          <DeleteFood food={food} />
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button
              variant={"default"}
              className="text-sm bg-orange-500"
            >
              <Pen 
                className="mr-2 h-4 w-4" 
              />
              Edit
            </Button>
            
          </DialogTrigger>
          <EditFoodForm food={food} />

        </Dialog>
      </footer>
    </SheetContent>
  )
}

export default MenuItemDetails