import { BadgeDollarSign, Boxes, Home, Hourglass, LayoutDashboard, Truck, Users, UtensilsCrossed } from "lucide-react";

import { coralBits, kelpShake, krabbyPatty } from "@/assets/food";

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
        category: 'Entree',
        name: 'Krabby Patty',
        options: ['small', 'medium', 'large'],
        price: 3.99,
        cost: 1.75,
        amountInStock: 200,
        image: krabbyPatty
    },
    {
        category: 'Beverages',
        name: 'Kelp Shake',
        options: ['small', 'medium', 'large'],
        price: 2.49,
        cost: 0.75,
        amountInStock: 150,
        image: kelpShake
    },
    {
        category: 'Snack',
        name: 'Coral Bits',
        options: ['small', 'medium'],
        price: 1.49,
        cost: 0.50,
        amountInStock: 100,
        image: coralBits,
    },
]
