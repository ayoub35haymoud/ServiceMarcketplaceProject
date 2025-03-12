import React from 'react';
import Header from '../components/views/Header';
import HowItWorks from '../components/views/HowItWorks';
import TopCategories from '../components/views/TopCategories';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Testimonials from '../components/views/testimonials';
import Footer from '../components/views/Footer';
export default function HomePage() {
  const {user } = useSelector((state)=>state.auth);
  return (
    <>
      {!user && <Header/> }
      {!user && <HowItWorks/> }
      {!user && <TopCategories/>}
      {!user && <Testimonials/> }
      {!user && <Footer/> }
      <Outlet/>
    </>
  )
}
