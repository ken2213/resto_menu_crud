import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Button } from "./ui/button";
import { Menu, XCircle } from "lucide-react";

const TopNavigation = () => {
    const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 640);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showCloseButton, setShowCloseButton] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const hideSidebar = () => {
        setShowSidebar(false);
        setShowCloseButton(false);
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            if (width >= 640) {
                setShowSidebar(true);
                setShowCloseButton(false);
            } else {
                setShowSidebar(showSidebar); // Keep the current state for mobile view
                setShowCloseButton(showSidebar); // Show the close button if sidebar is already open
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [showSidebar]);

    return (
        <>
            <nav className="w-full h-16 fixed flex items-center bg-main-dark">
                {windowWidth < 640 ? (
                    showCloseButton ? (
                        <Button
                            onClick={hideSidebar}
                            variant="ghost"
                            className="text-gray-300 hover:text-gray-300 hover:bg-main-dark px-2 py-1 ml-16"
                        >
                            <XCircle size={20} className="hover:text-gray-100"/>
                        </Button>
                    ) : (
                        <Button
                            onClick={() => { toggleSidebar(); setShowCloseButton(true); }}
                            variant="ghost"
                            className="text-gray-300 hover:text-gray-300 hover:bg-sub-dark px-2 py-1 ml-2"
                        >
                            <Menu />
                        </Button>
                    )
                ) : null}
            </nav>
            {showSidebar && <SideBar />}
        </>
    );
};

export default TopNavigation;