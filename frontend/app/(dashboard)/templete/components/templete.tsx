"use client";
import Welcome from "@/app/emails/Welcome";
import * as React from "react";
import { EmailProps } from "@/app/emails/Welcome";
import { EmailContext } from "@/hooks/useEmail";

// export interface IAppProps {
//   IEmail : EmailProps
// }

export default function App({
  username,
  sender,
  content,
  image,
  link,
  address,
  backgroundColor,
  textColor,
  subject,
}: EmailProps) {
  const { email, setEmail } = React.useContext(EmailContext);
  return (
    <div className="flex-1  h-full   ">
      <h1 className="text-[30px] mb-1  text-white">Email Templete</h1>
      <Welcome
        username={username}
        address={address}
        backgroundColor={backgroundColor}
        content={content}
        image={image}
        link={link}
        sender={sender}
        subject={subject}
        textColor={textColor}
      />
    </div>
  );
}
