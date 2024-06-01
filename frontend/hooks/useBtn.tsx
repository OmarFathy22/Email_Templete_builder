"use client"


import { createContext, useContext, useEffect, useState } from "react";


export const BtnContext = createContext<boolean | any>(null);

interface BtnProviderProps {
  children: React.ReactNode;
}

export const BtnProvider = ({ children }: BtnProviderProps) => {
  const [mounted, setMounted] = useState(false);
  const [btn, setBtn] = useState('use')
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <BtnContext.Provider value={{ btn, setBtn }}>
      {children}
    </BtnContext.Provider>
  );
};

export const useBtn = () => {
  const context = useContext(BtnContext);
  if (context === undefined) {
    throw new Error("useBtn must be used within a BtnProvider");
  }
  return context;
}