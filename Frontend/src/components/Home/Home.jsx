import React, { useContext } from 'react';
import {Context} from '../../main'
import { Navigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import PopularCategory from './PopularCategory';

const Home = () => {

  const {isAuthorized} = useContext(Context);
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }

  return (
    <>
      <HeroSection/>
      <HowItWorks/>
      <PopularCategory/>
    </>
  )
}

export default Home