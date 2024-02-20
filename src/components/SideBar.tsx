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
    <aside className='h-screen bg-main-dark'>
      <nav className='h-full flex flex-col shadow-sm '>
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
    <div className='p-4 pb-2 flex justify-between items-center bg-main-dark'>
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
      <ul className='flex-1 pl-1 bg-main_dark'>

        {sideBarNavLinks.map((link) => (
          <li 
            key={link.id}
            className=''
          >
            <Link
              to={link.directory}
              className={`
                relative flex items-center justify-center py-2.5 my-1 font-medium rounded-l-xl cursor-pointer
                transition-colors group
                ${
                  activeLink === link.directory 
                  ? 'bg-sub-dark' 
                  : 'text-gray-300'
                }
              `}
              onClick={() => handleLinkClick(link.directory)}
            >

              <div className={`
                flex items-center p-3 rounded-lg
                ${
                  activeLink === link.directory
                  ? 'bg-indigo-800 text-indigo-50 shadow-xl'
                  : 'hover:bg-indigo-200 text-gray-500 hover:text-gray-700' 
                }
              `}>
                {link.icon}
                <span 
                  className={`overflow-hidden transition-all font-bold  ${
                    expand ? "w-40 ml-3" : "w-0"
                  }`}
                >
                  {link.title}
                </span>
              </div>
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
          <h4 className="font-semibold text-gray-50">John Doe</h4>
          <span className="text-xs text-gray-400">johndoe@gmail.com</span>
        </div>
        <MoreVertical size={20} color='white' />
      </div>
    </div>
  )
}

export default SideBar