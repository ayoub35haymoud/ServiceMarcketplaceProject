import React from 'react';
import Header from '../components/views/Header';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function HomePage() {
  const {user } = useSelector((state)=>state.auth);
  return (
    <>
      {!user && <Header/> }
      <Outlet/>
    </>
  )
}
