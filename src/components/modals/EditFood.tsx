import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { FoodInterface } from '@/types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import FirebaseConfig from '@/config/firebase'
import { child, ref, update } from 'firebase/database'



const formSchema = z.object({
    /* 
        Validate entered data as string
        min data set to 3 characters or else
        it will show error message
    */
    name: z.string().min(3, {
        message: "Food name must be atleast 3 characters.",
    }),

    /*
        Validate entered data as string
        min data set to 1 character or else
        it will show error message
    */
    category: z.string().min(1, {
        message: "Please select 1 category"
    }),
    
    /* 
        Validate entered data as number
        maximum data set to 100,000,
        data is set to positive numbers only
    */
    cost: z.coerce.number({
        required_error: "Cost is required",
        invalid_type_error: "Cost must be a number"
    }).lte(100000, {
        message: "this cost is too big",
    }).positive(),

    /* 
        Validate entered data as number
        maximum data set to 100,000
        data is set to positive numbers only
    */
    price: z.coerce.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).lte(100000, {
        message: "this price is too big"
    }).positive(),

    /* 
        Validate entered data as number
        maximum data set to 100,000
        only from 0 to positive numbers only
    */
    stocks: z.coerce.number({
        required_error: "Stock is required",
        invalid_type_error: "Price must be a number"
    }).lte(100000, {
        message: "this stock is too big"
    }).nonnegative(),
})

const EditFoodForm = ({ food } : { food: FoodInterface }) => {

    // Define your form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: food.name,
            category: food.category,
            cost: food.cost,
            price: food.price,
            stocks: food.stocks
        },
        /* 
            This will enable you to see error messages 
            from validation being show on <FormMessage />
            of shadcn/ui 
        */
        mode:  'onChange',
    })

    // 2. Define a submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const database = FirebaseConfig();
        const dbRef = ref(database, 'foodItems');

        try {
            // Construct the data object to be updated
            const updatedFood = {
                name: values.name,
                category: values.category,
                cost: values.cost,
                price: values.price,
                stocks: values.stocks
            }

            // Update data to Firebase Realtime Database
            update(child(dbRef, food.__id_food), updatedFood)
            .then(() => {
                alert("Food item updated successfully");
            })
            .catch(error => {
                console.error("Error updating food item:", error);
                alert("An error occured while updating food item. Please try again.")
            })
        } catch (error) {
            console.error("Error updating food item:", error);
            alert("An error occurred while updating food item. Please try again.");
        }
    }

    return (
        <DialogContent className='sm:max-w-[425px] max-h-[600px] overflow-y-auto bg-main-dark text-gray-50 border-sub-dark'>
            <DialogHeader>
                <DialogTitle>Edit Food</DialogTitle>
                <DialogDescription className="text-gray-300">
                    Update the details of the selected food item...
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    {/* Food Name Form Field */}
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Food Name</FormLabel>
                            <FormControl>
                                <Input className="bg-sub-dark border-gray-400" placeholder="ex. Pancit Bihon" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    {/* Food Category Form Field */}
                    <FormField 
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            /* Food Category */
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select 
                                        onValueChange={field.onChange}
                                        // Automatically select a  default value base on current value.
                                        defaultValue={food.category} 
                                    >
                                        <SelectTrigger className="w-full bg-sub-dark">
                                            <SelectValue 
                                                placeholder="-- Choose a category --"
                                                className="bg-sub-dark" 
                                            />
                                        </SelectTrigger>

                                        <SelectContent className="bg-sub-dark">
                                            <SelectGroup className="bg-sub-dark text-gray-50">
                                                <SelectItem value=" ">-- Choose a category --</SelectItem>
                                                <SelectItem value="entree">Entree</SelectItem>
                                                <SelectItem value="beverages">Beverages</SelectItem>
                                                <SelectItem value="snack">Snack</SelectItem>
                                                <SelectItem value="dessert">Dessert</SelectItem>
                                                <SelectItem value="salad">Salad</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>

                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Food Cost Form Field */}
                    <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel>Food Cost</FormLabel>

                                <Input
                                    className="bg-sub-dark border-gray-400"
                                    placeholder="12" 
                                    {...field}
                                />
                                <FormDescription>
                                    Enter how much the manufacturing cost of food.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Food Price Form Field */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel>Food Price</FormLabel>

                                <Input
                                    className="bg-sub-dark border-gray-400"
                                    placeholder="12" 
                                    {...field} 
                                />
                                <FormDescription>
                                    Enter price of food.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Food Stocks Form Field */}
                    <FormField 
                        control={form.control}
                        name="stocks"
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel>Food Stocks</FormLabel>

                                <Input 
                                    className="bg-sub-dark border-gray-400"
                                    placeholder="12"
                                    {...field}
                                />
                                <FormDescription>
                                    Enter stocks available
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <DialogFooter>
                        <DialogClose 
                        disabled={!form.formState.isValid || !form.formState.dirtyFields}
                        >
                            <Button 
                                type="submit"
                                disabled={!form.formState.isValid || !form.formState.dirtyFields}
                            >
                                Submit
                            </Button>
                        </DialogClose>
                    </DialogFooter>

                </form>
            </Form>

        </DialogContent>

    )
}

export default EditFoodForm