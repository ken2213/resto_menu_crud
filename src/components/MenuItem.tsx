import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from './ui/card'

// import { FoodItem } from '@/constants';
import { FoodInterface } from '@/types';

import { HandCoins, Tag, PackageOpen, Dot } from 'lucide-react';

const MenuItem = ({ food }: { food: FoodInterface }) => {
  return (
    <>
        <Card
            className='w-[280px] bg-main-dark text-gray-300 border-gray-700 rounded-lg shadow-2xl'
        >
            <CardHeader className='p-0'>
                {/* Food Item Image */}
                <div className='w-full'>
                    <img 
                        // src={food.image}
                        src='https://honehealth.com/wp-content/uploads/2023/06/high-protein-fast-food-1.webp'
                        alt={`Maybe an image of ${food.name}`}
                        title={`${food.name}'s image`}
                        className='w-full h-[200px] object-cover rounded-md'
                    />
                </div>
            </CardHeader>
            
            <CardContent>
                {/* Food Item Name and Category */}
                <div className='pt-3 pb-2'>
                    <CardTitle 
                        className='tracking-wide font-extrabold flex justify-center'
                    >
                        <Dot className='text-gray-700' />
                        {food.name}
                        <Dot className='text-gray-700'
                        />
                    </CardTitle>
                    <CardDescription
                        className='text-md font-semibold'
                    >
                        {food.category}
                    </CardDescription>
                </div>

                {/* Horizontal Line */}
                <hr className=' border-gray-600 rounded-full border-3' />

                {/* Price, Manufacturing Cost, and Stocks */}
                <div className='pt-2 flex flex-col gap-y-1'>

                    {/* PRICE */}
                    <div className='flex justify-between'>
                        <div className='flex gap-x-1'>
                            <div className='flex items-center'>
                                <Tag 
                                    size={18}
                                />
                            </div>

                            <div className='flex items-center'>
                                <p className='text-md font-semibold'>
                                    Price
                                </p> 
                            </div>
                        </div>
                        
                        <div className='font-bold'>
                            <p>
                                <span className='text-xs text-gray-400'>$</span>
                                {food.price}
                            </p>
                        </div>
                    </div>

                    {/* MANUFACTURING COST */}
                    <div className='flex justify-between'>
                        <div className='flex gap-x-1'>
                            <div className='flex items-center'>
                                <HandCoins
                                    size={20}
                                />
                            </div>
                            
                            <div className='flex items-center'>
                                <p className='text-md font-semibold'>
                                    Manufacturing Cost
                                </p> 
                            </div>
                        </div>

                        <div className='font-bold'>
                            <p>
                                <span className='text-xs text-gray-400'>$</span>
                                {food.cost}
                            </p>
                        </div>

                    </div>

                    {/* AMOUNT OF STOCKS */}
                    <div className='flex justify-between'>
                        <div className='flex gap-x-1'>
                            <div className='flex items-center'>
                                <PackageOpen
                                    size={20}
                                />
                            </div>

                            <div className='flex items-center'>
                                <p className='text-md font-semibold'>
                                    Stocks left
                                </p> 
                            </div>
                        </div>

                        <div className='font-bold'>
                            <p>
                                {food.stocks}
                            </p>
                        </div>
                        
                    </div>

                </div>
                
            </CardContent>
            <CardFooter className='flex flex-col'>
                <p className='text-start w-full'>Available Sizes</p>
                <div className='w-full flex'>
                    {/* {foodItem.options?.map((option) => (
                        <div 
                            className='w-6 mr-1 flex justify-center items-start rounded-full font-bold px-4 py-1 hover:bg-gray-300 hover:cursor-pointer hover:text-gray-700 hover:transition-all transition-all'
                        >
                            <div 
                                className='w-fullflex justify-center items-center text-[1rem] capitalize'
                                title={option}
                            >
                                {option === 'small' && 'S'}
                                {option === 'medium' && 'M'}
                                {option === 'large' && 'L'}
                            </div>
                        </div>
                    ))} */}
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default MenuItem;