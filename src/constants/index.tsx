import { BadgeDollarSign, Boxes, Home, Hourglass, LayoutDashboard, Truck, Users, UtensilsCrossed } from "lucide-react";

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