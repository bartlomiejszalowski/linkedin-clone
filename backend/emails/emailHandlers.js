import { mailtrapClient, sender } from "../lib/mailtrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to LinkedIn Clone!",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "Welcome",
    });

    console.log("Welcome Email sent successfully");
  } catch (error) {
    throw error;
  }
};
