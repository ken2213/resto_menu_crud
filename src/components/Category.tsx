import { Categories, CategoryInterface } from "@/constants"
import { Badge } from "./ui/badge";

const Category = () => {
  return (
    <>
        {Categories.map((category: CategoryInterface, index: number) => (
            <Badge key={index} className="h-8 text-gray-100 capitalize py-1 border-gray-700" variant={"outline"}>
                {category.categoryTitle}
            </Badge>
        ))}
    </>
  )
}

export default Category;