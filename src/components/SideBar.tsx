import React from 'react'
import { sideBarNavLinks } from '@/constants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveLink } from '@/redux/features/activeLink/activeLinkSlice'
import { RootState } from '@/redux/store'
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import { setExpand } from '@/redux/features/expand/expandSlice'

const SideBar = () => {
  return (
    <aside className='h-screen'>
      <nav className='h-full flex flex-col shadow-sm'>
        <SideBarNavHeader />
        <SideBarNavList />
        <SideBarNavFooter />
      </nav>
    </aside>
  )
}


const SideBarNavHeader = () => {
  const expand = useSelector((state: RootState) => state.expander.expand)
  const dispatch = useDispatch();

  const handleExpandToggle = () => {
    dispatch(setExpand());
  }

  // console.log(`SideBarNavHeader: ${expand}`)
  
  return (
    <div className='p-4 pb-2 flex justify-between items-center'>
      <img 
        src="https://img.logoipsum.com/243.svg" 
        alt=""
        className={`overflow-hidden transition-all ${
          expand ? "w-32" : "w-0"
        }`}
      />
      <button
        className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'
        onClick={handleExpandToggle}
      >
        {expand ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
  )
}


const SideBarNavList = () => {
  const expand = useSelector((state: RootState) => state.expander.expand)
  const activeLink = useSelector((state: RootState) => state.activatorLink.activeLink)
  const dispatch = useDispatch();

  const handleLinkClick = (directory: string) => {
    dispatch(setActiveLink(directory));
  }

  // console.log(`Active link: ${activeLink}`)

  return (
    <>
      <ul className='flex-1 pl-3'>

        {sideBarNavLinks.map((link) => (
          <li 
            key={link.id}
          >
            <Link
              to={link.directory}
              className={`
                relative flex items-center py-2 px-3 my-2
                font-medium rounded-l-xl cursor-pointer
                transition-colors group
                ${activeLink === link.directory 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'hover:bg-indigo-50 text-gray-600'}
              `}
              onClick={() => handleLinkClick(link.directory)}
            >
                {link.icon}
                <span 
                  className={`overflow-hidden transition-all ${
                    expand ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  {link.title}
                </span> 
            </Link>
            
            {/* TOOLTIP LABEL */}
            {!expand && (
              <div
                className={`
                  absolute left-full rounded-md px-2 py-1 ml-6
                  bg-indigo-100 text-indigo-800 text-sm
                  transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}

                title={link.title}
              > 
                {link.title}
              </div>
            )}
          </li>
        ))}

      </ul>
    </>
  )
}


const SideBarNavFooter = () => {
  const expand = useSelector((state: RootState) => state.expander.expand)

  // console.log(`SideBarNavFooter: ${expand}`);

  return (
    <div className="border-t flex p-3">
      <img
        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
        alt=""
        className="w-10 h-10 rounded-md"
      />
      <div
        className={`
          flex justify-between items-center
          overflow-hidden transition-all ${expand ? "w-52 ml-3" : "w-0"}
      `}
      >
        <div className="leading-4">
          <h4 className="font-semibold">John Doe</h4>
          <span className="text-xs text-gray-600">johndoe@gmail.com</span>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  )
}

export default SideBar