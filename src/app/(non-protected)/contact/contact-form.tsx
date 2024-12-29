"use client";

import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MoveRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { toast } from "sonner";
import { ContactFormSchema } from "@/schemas";
import { sendContactForm } from "@/actions/contact";

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      username: undefined,
      email: undefined,
      message: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    // Call the backend function to send the contact form
    sendContactForm(values)
      .then((response) => {
        // Check if the response is successful
        if (response.success) {
          toast.success(response.success, {
            description: "Your message has been successfully sent.",
          });
        } else {
          toast.error(response.error, {
            description: "Something went wrong. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error in form submission", error);
        toast.error("An error occurred while sending your message.", {
          description: "Please try again later.",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full gap-4" color="primary" type="submit">
          Make contact <MoveRight className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
