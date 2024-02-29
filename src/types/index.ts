export interface FoodInterface {
    __timestamp: string;
    __id_food: string;
    name: string;
    category: string;
    cost: number;
    stocks: number;
    sizeOptions: [];
    price: number;
}


export interface CategoryInterface {
    categoryTitle: string;
}