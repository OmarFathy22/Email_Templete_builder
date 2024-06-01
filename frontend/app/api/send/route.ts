import Welcome  from '@/app/emails/Welcome';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:Request) {
  const {templete} = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'Omar <onboarding@resend.dev>',
      to: ['of2222002@gmail.com'],
      subject: templete.subject,
      react: Welcome({ 
          subject:templete.subject,
          username: templete.username,
          content: templete.content,
          sender:templete.sender,
          link:templete.link,
          image:templete.image,
          textColor:templete.textColor,
          backgroundColor:templete.backgroundColor,
          address:templete.address,
       }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
