import { BadgeDollarSign, Boxes, Home, Hourglass, LayoutDashboard, Truck, Users, UtensilsCrossed } from "lucide-react";

import { barnacleChips, cannedBread, coralBits, exploadingPie, goofyGooberSundae, jellyPatty, kelpJerky, kelpShake, krabbyPatty, krustyKrabPizza, nastyPatty, prettyPatty, salad } from "@/assets/food";

interface SideBarNavItem {
    id: number,
    title: string,
    directory: string,
    icon: JSX.Element;
}

export const sideBarNavLinks: SideBarNavItem[] = [
    {
        id: 1,
        title: "Home",
        directory: "/",
        icon: <Home size={20} />
    },
    {
        id: 2,
        title: "Dashboard",
        directory: "/dashboard",
        icon: <LayoutDashboard size={20} />
    },
    {
        id: 3,
        title: "Menus",
        directory: "/menu",
        icon: <UtensilsCrossed size={20} />
    },
    {
        id: 4,
        title: "Employees",
        directory: "/employees",
        icon: <Users size={20} />
    },
    {
        id: 5,
        title: "Inventory",
        directory: "/inventory",
        icon: <Boxes size={20} />
    },
    {
        id: 6,
        title: "Orders",
        directory: "/orders",
        icon: <Truck size={20} />
    },
]



export type Option = 'small' | 'medium' | 'large';

export interface FoodItem {
    category: string;
    name: string;
    options?: Option[];
    price: number;
    cost: number;
    amountInStock: number;
    image: string
}

export const FoodItems: FoodItem[] = [
    {
        category: 'entree',
        name: 'Krabby Patty',
        options: ['small', 'medium', 'large'],
        price: 3.99,
        cost: 1.75,
        amountInStock: 200,
        image: krabbyPatty
    },
    {
        category: 'beverages',
        name: 'Kelp Shake',
        options: ['small', 'medium', 'large'],
        price: 2.49,
        cost: 0.75,
        amountInStock: 150,
        image: kelpShake
    },
    {
        category: 'snack',
        name: 'Canned Bread',
        options: ['small', 'medium', 'large'],
        price: 2,
        cost: 0.5,
        amountInStock: 200,
        image: cannedBread,
    },
    {
        category: 'snack',
        name: 'Coral Bits',
        options: ['small', 'medium'],
        price: 1.49,
        cost: 0.50,
        amountInStock: 100,
        image: coralBits,
    },
    {
        category: 'entree',
        name: 'Krusty Krab Pizza',
        options: ['small', 'medium', 'large'],
        price: 4.99,
        cost: 2.25,
        amountInStock: 180,
        image: krustyKrabPizza,
    },
    {
        category: 'entree',
        name: 'Nasty Patty',
        options: ['small', 'medium', 'large'],
        price: 1,
        cost: 0.5,
        amountInStock: 80,
        image: nastyPatty,
    },
    {
        category: 'snack',
        name: 'Kelp Jerky',
        options: ['small', 'medium', 'large'],
        price: 2,
        cost: 0.5,
        amountInStock: 200,
        image: kelpJerky,
    },
    {
        category: 'entree',
        name: 'Pretty Patty',
        options: ['small', 'medium', 'large'],
        price: 3.49,
        cost: 1.50,
        amountInStock: 120,
        image: prettyPatty,
    },
    {
        category: 'entree',
        name: 'Jelly Patty',
        options: ['small', 'medium', 'large'],
        price: 2.99,
        cost: 1.25,
        amountInStock: 200,
        image: jellyPatty,
    },
    {
        category: 'dessert',
        name: 'Goofy Goober Sundae',
        options: ['small', 'medium', 'large'],
        price: 3.79,
        cost: 1.50,
        amountInStock: 100,
        image: goofyGooberSundae,
    },
    {
        category: 'snack',
        name: 'Barnacle Chips',
        options: ['small', 'medium', 'large'],
        price: 1.99,
        cost: 0.75,
        amountInStock: 100,
        image: barnacleChips,
    },
    {
        category: 'salad',
        name: 'Salad',
        options: ['small', 'medium'],
        price: 3.99,
        cost: 1.75,
        amountInStock: 80,
        image: salad,
    },
    {
        category: 'desert',
        name: 'Exploding Pie',
        options: ['small', 'medium', 'large'],
        price: 20.99,
        cost: 3.75,
        amountInStock: 80,
        image: exploadingPie,
    },
    
]
