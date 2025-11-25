"use client";

import React from "react";
import Link from "next/link";
import { formSchema, FormType } from "@/validator/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/auth";
import { setRefreshToken } from "@/server/auth";
import { axiosInstance } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { setAccessToken, setUser, setIsLoggedIn } = useAuthStore();
  const router = useRouter();

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: async (input: FormType) => {
      const { data } = await axiosInstance.post("/user/login", input);
      return data;
    },
    onSuccess: (data) => {
      setRefreshToken(data.data.refreshToken);
      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
      setIsLoggedIn(true);
      router.replace("/dashboard");
      // setTimeout(() => {
      //   queryClient.invalidateQueries({ queryKey: ["profile"] });
      // }, 500);
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(input: FormType) {
    console.log("Submitting form with input:", input);
    mutateLogin(input);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="-z-10 flex h-full min-h-[calc(100vh-4rem-var(--header-height))] items-center justify-center bg-gradient-to-b bg-[url(/images/bg-wlb.png)] from-[#000000] to-[#1a1a1a] bg-cover bg-center bg-no-repeat"
      >
        <div className="w-full pb-10 h-full">
          <div className="mx-auto h-full w-full max-w-[500px] rounded-2xl bg-[rgba(255,255,255,0.25)] pt-10 pb-10 shadow-2xl backdrop-blur-[8px]">
            <div className="text-center">
              <div className="mx-auto h-fit w-fit rounded-lg bg-gradient-to-br from-cyan-500 to-gray-800 px-6 py-1.5 sm:px-20">
                <h1 className="h-fit font-mono text-xl font-bold text-white">
                  LOGIN
                </h1>
              </div>
              <div className="space-y-6 px-6 pt-10 sm:px-14">
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-lg font-semibold text-white">
                          Email
                        </Label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your username"
                            className="mt-2 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="mt-1.5 w-fit bg-white px-1 text-xs text-red-600 underline">
                          {form.formState.errors.email?.message}
                        </FormMessage>
                      </>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <>
                        <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-lg font-semibold text-white">
                          Password
                        </Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="mt-2 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="mt-1.5 w-fit bg-white px-1 text-xs text-red-600 underline">
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </>
                    )}
                  />
                </div>
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isPendingLogin}
                    className="w-full cursor-pointer bg-cyan-700 font-semibold text-white hover:bg-cyan-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isPendingLogin ? (
                      <span className="block size-5 animate-spin rounded-full border border-t-2 border-b-2 border-white disabled:opacity-70" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
              <div className="pt-5">
                <Link
                  href="/sign-up"
                  className="inline-block text-white underline decoration-2 underline-offset-2 hover:cursor-pointer hover:text-blue-300 hover:no-underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
