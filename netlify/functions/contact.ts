import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const formData = new URLSearchParams(event.body || "");
  const data = Object.fromEntries(formData);

  console.log("New contact submission:", data);

  // Optional: send email using a service like SendGrid, Mailgun, etc.
  // await sendEmail(data);

  return { statusCode: 200, body: "Form submitted successfully!" };
};
