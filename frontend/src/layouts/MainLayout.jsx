import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import {fetchUser}  from '../features/authSlice';
export default function MainLayout() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUser());
  },[dispatch]);
  return (
    <>
       <Navbar/>
       <Outlet/>
    </>
  )
}
