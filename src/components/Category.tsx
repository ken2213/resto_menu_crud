import { Categories, CategoryInterface } from "@/constants"
import { Badge } from "./ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, 
} from "./ui/carousel";

const Category = () => {
  return (
    <Carousel
      className="w-[70%] sm:w-[65%] md:w-[60%] lg:w-[700px] mb-1"
    >
      <CarouselContent className="-ml-1">
        {Categories.map((category: CategoryInterface, index: number) => (
          <CarouselItem key={index} className="pl-1 basis-1/3 sm:basis-1/4 lg:basis-1/6  flex justify-center">
            <Badge key={index} className="h-8 text-gray-100 capitalize py-1 border-gray-700" variant={"outline"}>
                {category.categoryTitle}
            </Badge>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-6 w-6 border-none bg-gray-50 bg-opacity-0 text-gray-200 hover:bg-gray-300 hover:bg-opacity-50" />
      <CarouselNext className="h-6 w-6 border-none bg-gray-50 bg-opacity-0 text-gray-200 hover:bg-gray-300 hover:bg-opacity-50" />
    </Carousel>
  )
}

export default Category;