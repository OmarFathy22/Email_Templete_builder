"use client";
import { EmailProps } from "@/app/emails/Welcome";
import { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";


export interface IAppProps {
  templetes: EmailProps[];
  setSpecficTemplete?: any;
}


export default function App({templetes , setSpecficTemplete}: IAppProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleTemplete = (templete: EmailProps) => {
    setSpecficTemplete(templete);
  }
  const list = ["welcome" , 'verify-email' , 'notification' , 'receipt']
  return (
    <div>
      <div
        onClick={handleOpen}
        className="flex items-center gap-1 cursor-pointer"
      >
        <div>
          {open ? <FaFolderOpen color="white" size={25}/> : <FaFolder color="white" size={25} />}
        </div>
        <h1 className="text-white text-[25px]">Templetes</h1>
      </div>
      <div>
        {open && (
          <ul className="pl-3 pt-1 flex flex-col gap-1">
            {templetes.map((item , index) => (
              <li onClick={()=>handleTemplete(item)} key={index} className="text-white flex items-center gap-1 cursor-pointer">
                <h1><FaFile size={18}/></h1>
                <h1 className="text-[18px]">{item?.templeteName}</h1>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
