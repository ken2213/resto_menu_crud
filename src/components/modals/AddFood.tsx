import { Button } from "../ui/button";
import { 
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";

import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
 } from "../ui/select";

import { ref, set, child } from "firebase/database";
import FirebaseConfig from "@/config/firebase";

import { v4 as uuidv4 } from 'uuid';

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

export function AddFoodForm() {

    // 1. Define your form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            cost: 0,
            price: 0,
            stocks: 0
        },
        /* 
            This will enable you to see error messages 
            from validation being show on <FormMessage />
            of shadcn/ui 
        */
        mode: 'onChange', 
    })

    // 2. Define a submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        const database = FirebaseConfig(); // Initialize Firebase
        // Create an object 'foodItems' on database 
        const dbRef = ref(database, 'foodItems');

        // Use uuidv4 package
        const foodId = uuidv4()

        // Generate client-side timestamp
        const clientTimestamp = Date.now();

        // Convert timestamp to a readable date format
        const readableTimestamp = new Date(clientTimestamp).toLocaleString();

        // Include the timestamp in the food data
        const foodDataWithTimestamp = {
            ...values,
            __timestamp: readableTimestamp,
            __id_food: foodId,
        }

        try{
            // Write data to firebase realtime database
            set(child(dbRef, foodId), foodDataWithTimestamp)
                .then(() => {
                    console.log("Form data submitted successfully");
                    alert("Form data submitted successfully");
                    form.reset()
                })
                .catch((error) => {
                    console.error("Error submitting form data", error)
                })
        } catch (error) {
            console.error("Error initializing Firebase:", error);
        }
    }

    return (
        
        <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-y-auto bg-main-dark text-gray-50 border-sub-dark">
            <DialogHeader>
                <DialogTitle>Add New Food</DialogTitle>
                <DialogDescription className="text-gray-300">
                    This form lets you to add a new food on your menu...
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    id="uniqueFormId"
                >
                    {/* Food Name Form Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            /* Food Name */
                            <FormItem>
                                <FormLabel>Food Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-sub-dark border-gray-400"
                                        placeholder="ex. Pancit Bihon"
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Food Category Form Field */}
                    <FormField 
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            /* Food Category */
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full bg-sub-dark">
                                            <SelectValue 
                                                placeholder="-- Choose a category --"
                                                className="bg-sub-dark" 
                                            />
                                        </SelectTrigger>

                                        <SelectContent className="bg-sub-dark">
                                            <SelectGroup className="bg-sub-dark text-gray-50">
                                                <SelectItem value={null}>-- Choose a category --</SelectItem>
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