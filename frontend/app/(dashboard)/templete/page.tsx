"use client";
import { useState, useContext } from "react";
import Templete from "./components/templete";
import CreateForm from "./components/CreateForm";
import { EmailProps } from "@/app/emails/Welcome";
import { EmailContext } from "@/hooks/useEmail";
import upload from "@/utils/upload";
import toast from "react-hot-toast";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [templete, setTemplete] = useState<EmailProps>({
    username: "{username}",
    subject: "subject",
    sender: "{your company}",
    content: "{content} Ex: Welcome to our company!",
    image: "",
    link: "https://www.avrelinex.com/",
    textColor: "",
    backgroundColor: "",
    address:
      "{address} Ex: 470 Noor Ave STE B #1148, South San Francisco, CA 94080",
  });
  const [ImageFile, setImageFile] = useState(null); 
  const { email, setEmail } = useContext(EmailContext);
  const [updatingEmail, setUpdatingEmail] = useState<EmailProps>(email);
  const [selectedImage, setSelectedImage] = useState(email?.operation == 'create' ? "" : email.image);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setSelectedImage("");
    }
  };
  const handleUpload = async (setLoading:any) => {
    setLoading(true);
    try{
      if (ImageFile) {
        const url = await upload(ImageFile);
        if(url){
          toast.success("Image uploaded successfully");
          setLoading(false);
          return url;
        }
        else{
          toast.error("Something went wrong");
          setLoading(false);
          return null;
        }
      }
    }catch(error){
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong");
      return null;
    }
  };
  const handleContentChange = (eo: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplete({
      ...templete,
      [eo.target.name]: eo.target.value,
    });
  };
  const handleChange = (eo: React.ChangeEvent<HTMLInputElement>) => {
    setTemplete({
      ...templete,
      [eo.target.name]: eo.target.value,
    });
  };
  const handleContentChange_update = (
    eo: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatingEmail({
      ...updatingEmail,
      [eo.target.name]: eo.target.value,
    });
  };
  const handleChange_update = (eo: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatingEmail({
      ...updatingEmail,
      [eo.target.name]: eo.target.value,
    });
  };
  return (
    <div className=" min-h-[100vh] gap-10 px-10 flex items-center ">
      {email?.operation == "create" ? (
        <div className={`w-full items-center flex justify-between gap-5 ${(email.operation == 'use' || email.operation == 'delete') && "flex-col"}`}>
          <Templete
            subject={templete.subject}
            username={templete.username}
            sender={templete.sender}
            content={templete.content}
            image={selectedImage}
            link={templete.link}
            textColor={templete.textColor}
            backgroundColor={templete.backgroundColor}
            address={templete.address}
          />
          <CreateForm
            handleChange={handleChange}
            handleContentChange={handleContentChange}
            handleImageChange={handleImageChange}
            handleUpload={handleUpload}
            templete={templete}
          />
        </div>
      ) : (
        <div className={`w-full items-center flex justify-between gap-5 ${(email.operation == 'use' || email.operation == 'delete') && "flex-col"}`}>
          <Templete
            subject={updatingEmail.subject}
            username={updatingEmail.username}
            sender={updatingEmail.sender}
            content={updatingEmail.content}
            image={selectedImage}
            link={updatingEmail.link}
            textColor={updatingEmail.textColor}
            backgroundColor={updatingEmail.backgroundColor}
            address={updatingEmail.address}
          />
          <CreateForm
            handleChange={handleChange_update}
            handleContentChange={handleContentChange_update}
            handleImageChange={handleImageChange}
            handleUpload={handleUpload}
            templete={updatingEmail}
          />
        </div>
      )}
    </div>
  );
}
