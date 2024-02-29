import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Button } from "./ui/button";
import { Menu, Plus, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/features/search/searchSlice";
import { RootState } from "@/redux/store";
import { AddFoodForm } from "./modals/AddFood";

const TopNavigation = () => {
    const dispatch = useDispatch();

    /*
        This is handleSearchChange, a function the tracks the value being entered on Input component on search field.

        The value being entered is being stored on setSearchQuery setter variable to be shared of all of components (ex. Menu)
    */

    const handleSearchChange = (event: any) => {
        dispatch(setSearchQuery(event.target.value));
    }
    /*
        This is searchQuery state variable that uses redux,

        The value of searchQuery will be shared to 'Menu' component

        So literally, what being entered on Input component on search field of this component is also being shared on Menu component.

        'ON REAL TIME' 
    */
    const searchQuery = useSelector((state: RootState) => state.searcherQuery.searchQuery);


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

                <div className="w-full flex justify-end sm:justify-center items-center">
                    {/* Search and Add Button Wrapper */}
                    <div className="flex md:gap-x-8 w-full sm:w-[80%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] justify-center  sm:justify-around md:justify-center lg:justify-around">
                        {/* Search input */}
                        <div className="flex w-[85%] max-w-[500px] 2xl:max-w-[650px] px-4">
                            <Input 
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="text-gray-50 bg-sub-dark border-gray-700 shadow-md"
                            />
                        </div>

                        <div className="flex sm:w-[5%] justify-center items-center">
                            <Dialog>
                            <DialogTrigger>
                                <Button 
                                    className="p-0"
                                    variant="ghost"
                                >
                                    <Plus className="text-green-700" /> 
                                </Button>
                            </DialogTrigger>
                            <AddFoodForm />
                            </Dialog>
                        </div>
                    </div>
                </div>
            </nav>
            {showSidebar && <SideBar />}
        </>
    );
};

export default TopNavigation;