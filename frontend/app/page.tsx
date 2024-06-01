"use client";
import Image from "next/image";
import React from "react";
import toast from 'react-hot-toast';


export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    email: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!user.name || !user.email) return;
    try{
      await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: user.name,
        }),
      });
      setLoading(false);
      toast.success('Email sent successfully');
    }catch(error){
      console.error(error);
      setLoading(false);
      toast.error('Something went wrong');
    }
  };
  return (
    <main className="h-[100vh] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col  gap-5">
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Name"
          className="p-3 rounded-md outline-none text-black"
        />
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          className="p-3 rounded-md outline-none text-black"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 disabled:bg-blue-200  rounded-md p-3 w-fit text-white"
        >
          Send
        </button>
      </form>

    
    </main>
  );
}
