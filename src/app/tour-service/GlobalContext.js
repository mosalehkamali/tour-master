"use client";
import AuthModal from "@/components/templates/registeration/AuthModal";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    console.log("click");
    setIsModalOpen(!isModalOpen);
  }
  return (
    <GlobalContext.Provider value={{ toggleModal }}>
      {isModalOpen && <AuthModal toggleModal={toggleModal} />}
      {children}
    </GlobalContext.Provider>
  );
}

// Hook برای استفاده راحت
export const useGlobal = () => useContext(GlobalContext);
