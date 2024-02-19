import { Hourglass } from "lucide-react";

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
        icon: <Hourglass />
    },
    {
        id: 2,
        title: "Dashboard",
        directory: "/dashboard",
        icon: <Hourglass />
    },
    {
        id: 3,
        title: "Menu",
        directory: "/menu",
        icon: <Hourglass />
    },
    {
        id: 4,
        title: "Financial",
        directory: "/financial",
        icon: <Hourglass />
    },
    {
        id: 5,
        title: "Inventory",
        directory: "/inventory",
        icon: <Hourglass />
    },
]