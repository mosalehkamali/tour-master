"use client"
import React, { useState } from "react";
import TourServicesNav from "@/components/templates/tour-service/nav/Navbar"
import AuthModal from "@/components/templates/registeration/AuthModal";


export default function RootLayout({ children }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal(){
    setIsModalOpen(!isModalOpen)
  }

  return (
  
      <div style={{paddingTop:"3rem"}} suppressHydrationWarning={true}>
        <TourServicesNav toggleModal={toggleModal}/>
        {isModalOpen&&<AuthModal toggleModal={toggleModal}/>}
        {React.Children.map(children, (child) =>
        React.cloneElement(child, { isModalOpen, setIsModalOpen })
      )}
      </div>
  );
}
