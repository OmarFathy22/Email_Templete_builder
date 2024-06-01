"use client";

import { EmailProvider as EmailProviderCtx } from "@/hooks/useEmail";
interface EmailProviderProps {
  children: React.ReactNode;
}

const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  return <EmailProviderCtx>{children}</EmailProviderCtx>;
};

export default EmailProvider;
