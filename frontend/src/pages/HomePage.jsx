import React from 'react';
import Header from '../components/views/Header';
import HowItWorks from '../components/views/HowItWorks';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Testimonials from '../components/views/testimonials';
export default function HomePage() {
  const {user } = useSelector((state)=>state.auth);
  return (
    <>
      {!user && <Header/> }
      {!user && <HowItWorks/> }
      {!user && <Testimonials/> }
      <Outlet/>
    </>
  )
}
