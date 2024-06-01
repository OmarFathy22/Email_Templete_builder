"use client"


import { createContext, useContext, useEffect, useState } from "react";
import { EmailProps } from "@/app/emails/Welcome";


export const EmailContext = createContext<EmailProps | any>(null);

interface EmailProviderProps {
  children: React.ReactNode;
}

export const EmailProvider = ({ children }: EmailProviderProps) => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<any>({
    username:"{username}",
    subject: "subject",
    sender:"{your company}",
    content:"{content} Ex: Welcome to our company!",
    image:'',
    link:"https://www.avrelinex.com/",
    textColor:"",
    backgroundColor:"",
    address:"{address} Ex: 470 Noor Ave STE B #1148, South San Francisco, CA 94080",
    operation : 'use'
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
}