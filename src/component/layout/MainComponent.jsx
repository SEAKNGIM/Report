import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ContentCompont from './ContentCompont'
import Slidebaes from './Slidebaes'
import AdminSlidebar from './AdminSlidebar'
import { isTokenValid } from '../../utils/auth'

export default function MainComponent() {

  const token = localStorage.getItem("token");
useEffect(()=>{
  if (token && !isTokenValid(token)) {
    // Token has expired, perform logout or other action
    console.log('Token has expired');
    <NavLink to="/singin"/>
    // You may want to trigger a logout action or redirect the user to the login page
  } else {
    // Token is still valid
    console.log('Token is still valid');
  }
},[])

  const user_role = localStorage.getItem("user_role")
  const isUser = user_role === "USER"
  const isAdmin = user_role === "ADMIN"
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-[#F7F8FC]'>
      <div className="flex flex-row flex-grow overflow-y-scroll">
        {
          isAdmin && <AdminSlidebar />
        }
        {isUser &&
          <Slidebaes />
        }


        <div className="px-3 sm:px-6 md:px-8 lg:px-6 xl:px-12 3xl:px-14 py-8 flex-grow overflow-y-scroll">
          <ContentCompont />
        </div>
      </div>
    </div>
  )
}
