import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import FirebaseConfig from "@/config/firebase"
import { setFood } from "@/redux/features/food/foodSlice"
import { RootState } from "@/redux/store"
import { FoodInterface } from "@/types"
import { child, ref, remove } from "firebase/database"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"



export function DeleteFood({ food } : { food: FoodInterface }) {
  const dispatch = useDispatch();
  const foods = useSelector((state: RootState) => state.fooder.foods)

  // Define your form
  const { handleSubmit } = useForm();

  // Define a submit handler
  const onSubmit = () => {
    const database = FirebaseConfig();
    const dbRef = ref(database, 'foodItems');

    try {
      remove(child(dbRef, food.__id_food))
      .then(() => {
        alert("Food item deleted successfully");
        // After deletion, update the state to trigger re-render
        const updatedFoods = foods.filter((f) => f.__id_food !== food.__id_food);;
        dispatch(setFood(updatedFoods));
      })
      .catch((error) => {
        console.error("Error deleting food item:", error);
        alert("An error occurred while deleting food item. Please try again.");
      })
    } catch (error) {
      console.error("Error deleting food item:", error);
      alert("An error occurred while deleting food item. Please try again.");
    }
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-y-auto bg-main-dark text-gray-50 border-sub-dark">
          <DialogHeader>
              <DialogTitle>Delete Food</DialogTitle>
              <DialogDescription>
                  Are you sure you want to delete {food.name}?
              </DialogDescription>
          </DialogHeader>
          
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogFooter className="gap-x-2 gap-y-4 flex-col">
              <DialogClose>
                <Button 
                  type="submit"
                  variant="destructive"
                  className="w-[60%] sm:w-auto"
                >
                  Delete
                </Button>
              </DialogClose>

              <DialogClose>
                <Button
                  className="w-[60%] sm:w-auto"
                  variant="ghost"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>

            </DialogFooter>
          </form>
          
      </DialogContent>
    </>
  )
}
