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
import { useDispatch, useSelector } from "react-redux"



export function DeleteFood({ food } : { food: FoodInterface }) {
  const dispatch = useDispatch();

  const foods = useSelector((state: RootState) => state.fooder.foods)

  function handleDelete(foodId : string) {
    const database = FirebaseConfig();
    const dbRef = ref(database, 'foodItems');

    try {
      remove(child(dbRef, food.__id_food))
      .then(() => {
        alert("Food item deleted successfully");
        // After deletion, update the state to trigger re-render
        dispatch(setFood(foods.filter(food => food.__id_food !== foodId)))
      })
      .catch(error => {
        console.error("Error updating food item:", error);
        alert("An error occurred while deleting food item. Please try again.")
      })
    } catch (error) {
      console.error("Error updaing food item:", error);
      alert("An error occurred while deleting food item. Please try again.")
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
          
          <DialogFooter>
            <DialogClose>
              <Button type="submit" onClick={() => handleDelete(food.__id_food)}>Delete</Button>
            </DialogClose>

            <DialogClose>
              <Button>Cancel</Button>
            </DialogClose>

          </DialogFooter>
      </DialogContent>
    </>
  )
}
