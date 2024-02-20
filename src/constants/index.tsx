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
        icon: <Home />
    },
    {
        id: 2,
        title: "Dashboard",
        directory: "/dashboard",
        icon: <LayoutDashboard />
    },
    {
        id: 3,
        title: "Menus",
        directory: "/menu",
        icon: <UtensilsCrossed />
    },
    {
        id: 4,
        title: "Employees",
        directory: "/employees",
        icon: <Users />
    },
    {
        id: 5,
        title: "Inventory",
        directory: "/inventory",
        icon: <Boxes />
    },
    {
        id: 6,
        title: "Orders",
        directory: "/orders",
        icon: <Truck />
    },
]