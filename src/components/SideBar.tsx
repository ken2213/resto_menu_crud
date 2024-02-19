import React from 'react'
import { sideBarNavLinks } from '@/constants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveLink } from '@/redux/features/activeLink/activeLinkSlice'
import { RootState } from '@/redux/store'

const SideBar = () => {
  return (
    <aside className='h-screen w-[300px]'>
      <nav>
        <SideBarNavList />
      </nav>
    </aside>
  )
}

const SideBarNavList = () => {
  // const currentPath = window.location.hash.substring(1);
  const activeLink = useSelector((state: RootState) => state.activatorLink.activeLink)
  const dispatch = useDispatch();

  const handleLinkClick = (directory: string) => {
    dispatch(setActiveLink(directory));
  }

  // console.log(`Active link: ${activeLink}`)

  return (
    <>
      <ul className=''>

        {sideBarNavLinks.map((link) => (
          <li key={link.id} className={activeLink === link.directory ? 'bg-sky-500' : ''}>
            <Link 
              to={link.directory}
              className='flex flex-row'
              onClick={() => handleLinkClick(link.directory)}
            >
              <span>{link.icon}</span>
              {link.title}
            </Link>
          </li>
        ))}

      </ul>
    </>
  )
}

export default SideBar