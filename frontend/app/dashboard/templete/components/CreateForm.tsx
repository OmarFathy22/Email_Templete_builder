"use client";
import { EmailProps } from "@/app/emails/Welcome";
import * as React from "react";
import toast from "react-hot-toast";
import { EmailContext } from "@/hooks/useEmail";
import { handleCreate, handleDelete, handleUpdate } from "./actions";

export interface IAppProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleUpload: (setLoading: any) => Promise<string | null | undefined>;
  templete: EmailProps;
}

export default function App({
  handleChange,
  handleImageChange,
  handleContentChange,
  handleUpload,
  templete,
}: IAppProps) {
  const { email } = React.useContext(EmailContext);
  const [loading, setLoading] = React.useState(false);
  const handleUse = async () => {
    try {
      await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templete: templete,
        }),
      });
      setLoading(false);
      toast.success("Email sent successfully");
      setTimeout(() => {
        location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  const handleCrud = async (
    operation: string,
    templete: EmailProps,
    setLoading: any
  ) => {
    if (operation == "use") {
      handleUse();
    } else if (operation == "create") {
      handleCreate(templete, setLoading);
    } else if (operation == "update") {
      handleUpdate(templete, setLoading);
    } else {
      handleDelete(templete, setLoading);
    }
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    handleCrud(email.operation, templete, setLoading);
  };
  return (
    <div className="flex-1 h-full min-w-[500px] py-5 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 h-full">
        <div
          className={`flex flex-col gap-3 h-full ${
            (email.operation == "use" || email.operation == "delete") &&
            "hidden"
          }`}
        >
          <div className="flex flex-col gap-1 ">
            <input
              required = {email.operation == 'create' ? true : false}
              onChange={handleChange}
              placeholder="Templete Name"
              type="text"
              name="templeteName"
              className="rounded-sm p-3 outline-none text-black"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <input
              onChange={handleChange}
              placeholder="To"
              type="text"
              name="username"
              className="rounded-sm p-3 outline-none text-black"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <input
              onChange={handleChange}
              placeholder="From"
              type="text"
              name="sender"
              className="rounded-sm p-3 outline-none text-black"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <input
              onChange={handleChange}
              placeholder="Subject"
              type="text"
              name="subject"
              className="rounded-sm p-3 outline-none text-black"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <input
              onChange={handleChange}
              placeholder="Address"
              type="text"
              name="address"
              className="rounded-sm p-3 outline-none text-black"
            />
          </div>
          <div className="flex justify-between bg-white p-3 rounded-sm gap-1  ">
            <h1 className="text-black">
              {templete.textColor ? templete.textColor : "Text Color"}
            </h1>
            <input
              onChange={handleChange}
              placeholder="Text Color"
              type="color"
              name="textColor"
              className="cursor-pointer  sm:mr-1  w-[30px] h-[25px] py-1 px-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primaryColor]"
            />
          </div>
          <div className="flex justify-between bg-white p-3 rounded-sm gap-1  ">
            <h1 className="text-black">
              {templete.backgroundColor
                ? templete.backgroundColor
                : "Background Color"}
            </h1>
            <input
              onChange={handleChange}
              placeholder="background color "
              type="color"
              name="backgroundColor"
              className="cursor-pointer  sm:mr-1  w-[30px] h-[25px] py-1 px-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primaryColor]"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <input
              onChange={handleChange}
              placeholder="Company link"
              type="text"
              name="link"
              className="rounded-sm p-3 outline-none text-black"
            />
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-sm  gap-1 ">
            <h1 className="text-black">Ex: Company logo</h1>
            <div className="">
              <label
                htmlFor="company-logo"
                className="text-black p-2 rounded-md bg-gray-200 cursor-pointer"
              >
                choose file
              </label>
              <input
                onChange={handleImageChange}
                id="company-logo"
                placeholder="Company Logo"
                type="file"
                accept="images/*"
                name="company-logo"
                className="rounded-sm outline-none text-black hidden"
              />
              <button
                onClick={async () => {
                  const image = await handleUpload(setLoading);
                  if (image) {
                    handleChange({
                      target: { name: "image", value: image },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
                disabled={loading}
                type="submit"
                className="bg-blue-400 disabled:bg-blue-200  rounded-md py-[6px] px-4 ml-3 text-white"
              >
                upload
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1 ">
            <textarea
              onChange={handleContentChange}
              placeholder="content"
              name="content"
              className="rounded-sm p-3 min-h-[100px] outline-none text-black flex-1"
            ></textarea>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 disabled:bg-blue-200  rounded-md p-3 text-white"
        >
          {email.operation}
        </button>
      </form>
    </div>
  );
}
