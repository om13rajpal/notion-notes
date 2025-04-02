"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { API_URL } from "@/constants/url";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "@/providers/LoginProvider";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email.",
  }),
});

export function SignupForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLoginContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(API_URL + "/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.status) {
        localStorage.setItem("token", data.token);
        toast.success("User signed up successfully");
        setTimeout(() => {
          navigate("/");
          setIsLoggedIn(true);
        }, 1500);
      }
    } catch (error) {
      toast.error("Error signing up user");
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="12345678" {...field} />
              </FormControl>
              <FormDescription>This is your account password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
