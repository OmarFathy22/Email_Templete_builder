'use client'
import Welcome, { EmailProps } from "@/app/emails/Welcome";
import Link from "next/link";
import * as React from "react";
import { EmailContext } from "@/hooks/useEmail";
import { useRouter } from "next/navigation";

export interface IAppProps {
  specficTemplete: EmailProps;
}

 const operations = [
   {name:'use',color:'#368c11'},
    {name:'create',color:'#ffbd03'},
    {name:'update',color:'#428bca'},
    {name:'delete',color:'#d9534f'}
 ]
  
export default function App({ specficTemplete }: IAppProps) {
  const { email, setEmail } = React.useContext(EmailContext);
  const router = useRouter();
  const handleClick = (item:any) => {
    setEmail({...email , operation : item.name})
    router.push('/dashboard/templete')
  }
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-end items-center gap-4">
        {
          operations.map((item , index) => (
            <button style={{backgroundColor: item?.color , padding:"5px" , borderRadius:"5px"}} onClick={()=>handleClick(item)} key={index} >
              <h1 className={`text-white px-4  rounded-md`}>{item.name}</h1>
            </button>
          ))
        }
        
      </div>
      {/* Templete Section */}
      <div className="mt-10 max-w-[600px] mx-auto">
        <Welcome
          username={email?.username}
          address={email?.address}
          backgroundColor={email?.backgroundColor}
          content={email?.content}
          image={email?.image}
          link={email?.link}
          sender={email?.sender}
          subject={email?.subject}
          textColor={email?.textColor}
        />
      </div>
    </div>
  );
}
