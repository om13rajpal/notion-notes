"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { API_URL } from "@/constants/url";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "@/providers/LoginProvider";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLoginContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(API_URL + "/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      if (data.status) {
        localStorage.setItem("token", data.token);
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/");
          setIsLoggedIn(true);
        }, 1500);
      }
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("Invalid credentials");
        return;
      }
      toast.error("Error logging in user");
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
                <Input placeholder="example@example.com" {...field} />
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
