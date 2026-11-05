import z, { array, object, string } from "zod";

export const CreateTicketSchema = object({
  category: string().trim().min(1, "please select a category"),
  subject: string().trim().min(1, "please enter a subject"),
  screenshots: array(z.instanceof(File))
    .max(3, "You can upload a maximum of 3 images")
    .min(1, "Please upload at least one image"),
  message: string().trim().min(1, "please enter a message"),
});
