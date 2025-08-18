import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const formData = new URLSearchParams(event.body || "");
  const data = Object.fromEntries(formData);

  console.log("New newsletter subscription:", data);

  // Optional: Add email to Mailchimp, SendGrid, etc.
  // await addToMailingList(data.email);

  return { statusCode: 200, body: "Subscription successful!" };
};
