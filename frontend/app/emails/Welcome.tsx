import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface EmailProps {
  templeteName?: string;
  _id?: string;
  __v?: number;
  username: string;
  sender:string,
  content:string,
  link:string,
  address:string,
  textColor:string,
  backgroundColor:string,
  image:string,
  subject:string
  operation?:string
}



export const KoalaWelcomeEmail = ({
  username,
  sender,
  content,
  image,
  link,
  address,
  textColor,
  backgroundColor,
  subject
}: EmailProps) => (
  <div style={{ backgroundColor: backgroundColor}} className="bg-white mx-auto  p-10 rounded-sm min-h-[500px]">
    <Preview>
      {subject}
    </Preview>
    
      <Container style={container}>
        {
          image ? <Img
          src={image}
          width="100"
          height="100"
          alt="Logo"
          style={logo}
        /> : <h1 className="text-center text-[25px]">Ex: Company Logo</h1>
        }
        <Text style={{...paragraph, color: textColor}} >Hi {username},</Text>
        <Text style={{...paragraph, color: textColor , wordBreak:"break-word"}}>
          {content}
        </Text>
        <Section style={btnContainer}>
        </Section>
        <Text style={{...paragraph, color: textColor}}>
          Best,
          <br />
          The {sender} team
        </Text>
          <Button style={button} href={link}>
            Get started
          </Button>
        <Hr style={hr} />
        <Text style={footer}>
          {address}
        </Text>
      </Container>
  </div>
);

KoalaWelcomeEmail.PreviewProps = {
  username: "Alan",
} as EmailProps;

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {

};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color:"black"
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  // width: 'fit-content',
  // margin: '0 auto'
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
