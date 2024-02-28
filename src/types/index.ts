export type Option = 'small' | 'medium' | 'large';

export interface FoodInterface {
    __timestamp: string;
    __id_food: string;
    name: string;
    category: string;
    cost: number;
    stocks: number;
    // image?: string;
    // options?: Option[];
    price: number;
}


export interface CategoryInterface {
    categoryTitle: string;
}