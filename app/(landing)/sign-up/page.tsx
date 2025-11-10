"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formSchema, FormType } from "@/validator/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  // FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeClosed, XIcon } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/utils";
// import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth";
import { setRefreshToken } from "@/server/auth";
import { AxiosError } from "axios";
import { Response } from "@/types/response";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [showDialogTrigger, setShowDialogTrigger] = useState(false);
  const [showCheckingIndicator, setShowCheckingIndicator] = useState(false);
  const { setAccessToken, setUser, setIsLoggedIn } = useAuthStore();
  const router = useRouter();

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: async (input: FormType) => {
      const { data } = await axiosInstance.post("/user/register", input);
      return data;
    },
    onSuccess: (data) => {
      // setRefreshToken(data.data.refreshToken);
      // setAccessToken(data.data.accessToken);
      // setUser(data.data.user);
      // setIsLoggedIn(true);
      toast.success("Register berhasil, silakan login");
      router.replace("/login");
    },
    onError: (error: AxiosError<Response>) => {
      toast.error(
        `Register failed: ${error.response?.data.message}`,
      );
      console.error("Register failed:", error);
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      age: 0,
      gender: "male",
      isStudent: true,
      field: "",
      hobbies: "",
    },
  });

  const isAllFilledExceptPassword = Object.entries(form.getValues())
    .filter(
      ([key]) =>
        key !== "password" && key !== "confirmPassword" && key !== "hobbies",
    )
    .every(
      /* eslint-disable @typescript-eslint/no-unused-vars */
      ([key, value]) => value !== "" && value !== null && value !== undefined,
    );

  function onSubmit(input: FormType) {
    mutateRegister(input);
  }

  const passwordError =
    Object.keys(form.formState.errors).length <= 2 &&
    (!!form.formState.errors.password ||
      !!form.formState.errors.confirmPassword);

  useEffect(() => {
    const body = document.body;
    const observer = new MutationObserver(() => {
      if (body.style.pointerEvents === "none" && !passwordError) {
        body.style.pointerEvents = "auto";
      }
    });
    observer.observe(body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, [passwordError, form.formState.errors]);

  const carrouselOneHasError = () =>
    !!form.formState.errors.name ||
    !!form.formState.errors.email ||
    !!form.formState.errors.phone ||
    !!form.formState.errors.age;

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpenChange = () => {
    if (passwordError) {
      setOpenDialog(true);
    } else if (form.formState.isValid) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  };

  // useEffect(() => {
  //   if (passwordError && isAllFilledExceptPassword) {
  //     setOpenDialog(true);
  //   }
  // }, [passwordError, isAllFilledExceptPassword]);

  // useEffect(() => {
  //   if (!passwordError && openDialog) {
  //     setOpenDialog(false);
  //   }
  // }, [passwordError, openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={handleDialogOpenChange}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="-z-10 flex h-0 min-h-[calc(100%-var(--header-height))] items-center justify-center bg-gradient-to-b bg-[url(/images/bg-wlb.png)] from-[#000000] to-[#1a1a1a] bg-cover bg-center bg-no-repeat"
        >
          <div className="mb-8 h-full w-full pt-12 pb-10">
            <div className="mx-auto h-full w-full max-w-[475px] rounded-2xl bg-[rgba(255,255,255,0.25)] shadow-2xl backdrop-blur-[8px]">
              <div className="pt-6 text-center">
                <div className="mx-auto h-fit w-fit rounded-lg bg-gradient-to-br from-cyan-500 to-gray-800 px-16 py-1.5">
                  <h1 className="font-mono text-lg font-bold text-white">
                    REGISTER
                  </h1>
                </div>
                <div className="px-14">
                  <Carousel>
                    <CarouselContent>
                      <CarouselItem className="pt-0 pb-0">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <>
                                <div className="mt-5 flex h-full items-center gap-2">
                                  <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-white">
                                    Nama <span className="text-red-500">*</span>
                                  </Label>
                                  <FormMessage className="mt-0.5 bg-white px-1 text-xs text-red-600 underline">
                                    {form.formState.errors.name?.message}
                                  </FormMessage>
                                </div>
                                <FormControl>
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Enter your username"
                                    className="mb-0 h-8 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px]"
                                  />
                                </FormControl>
                              </>
                            )}
                          />
                        </div>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <>
                                <div className="mt-5 flex h-full items-center gap-2">
                                  <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-white">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <FormMessage className="mt-0.5 bg-white px-1 text-xs text-red-600 underline">
                                    {form.formState.errors.email?.message}
                                  </FormMessage>
                                </div>
                                <FormControl>
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Enter your email"
                                    className="mb-0 h-8 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px]"
                                  />
                                </FormControl>
                              </>
                            )}
                          />
                        </div>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <>
                                <div className="mt-5 flex h-full items-center gap-2">
                                  <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-nowrap text-white">
                                    Nomor Telepon{" "}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <FormMessage className="mt-0.5 bg-white px-1 text-xs text-red-600 underline">
                                    {form.formState.errors.phone?.message}
                                  </FormMessage>
                                </div>
                                <FormControl>
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Enter your phone number"
                                    className="mb-0 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px] h-8"
                                  />
                                </FormControl>
                              </>
                            )}
                          />
                        </div>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <>
                                <div className="mt-5 flex h-full items-center gap-2">
                                  <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-white">
                                    Umur <span className="text-red-500">*</span>
                                  </Label>
                                  <FormMessage className="mt-0.5 bg-white px-1 text-xs text-red-600 underline">
                                    {form.formState.errors.age?.message}
                                  </FormMessage>
                                </div>
                                <FormControl>
                                  <Input
                                    type="text"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                    value={field.value || ""}
                                    placeholder="Enter your age"
                                    className="mb-0 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px] h-8"
                                  />
                                </FormControl>
                              </>
                            )}
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <>
                                <div className="mt-5 flex h-full items-center gap-2">
                                  <Label className="w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-white">
                                    Jenis Kelamin{" "}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <FormMessage className="mt-0.5 bg-white px-1 text-xs text-red-600 underline">
                                    {form.formState.errors.gender?.message}
                                  </FormMessage>
                                </div>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="mt-2 flex w-fit justify-between gap-20"
                                  >
                                    <div className="flex items-center space-x-2 rounded-sm bg-white/90 px-2 py-0.5">
                                      <RadioGroupItem
                                        value="male"
                                        id="gender-option-one"
                                        className="ring-1 size-"
                                      />
                                      <Label
                                        htmlFor="gender-option-one"
                                        className="w-16 text-sm"
                                      >
                                        Laki-laki
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-sm bg-white/90 px-2 py-0.5">
                                      <RadioGroupItem
                                        value="female"
                                        id="gender-option-two"
                                        className="ring-1"
                                      />
                                      <Label
                                        htmlFor="gender-option-two"
                                        className="w-20"
                                      >
                                        Perempuan
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                              </>
                            )}
                          />
                        </div>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="isStudent"
                            render={({ field }) => (
                              <>
                                <div className="mt-5 flex h-full items-center gap-2">
                                  <Label className="my-0 w-fit rounded-sm bg-cyan-800 px-2 py-0 text-base font-semibold text-white">
                                    Seorang Pelajar atau Pekerja{" "}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <FormMessage className="mt-0.5 bg-white px-1 text-xs text-red-600 underline">
                                    {form.formState.errors.gender?.message}
                                  </FormMessage>
                                </div>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(val) =>
                                      field.onChange(val === "true")
                                    }
                                    defaultValue={String(field.value)}
                                    className="mt-2 flex w-fit justify-between gap-20"
                                    // onValueChange={(value: "mahasiswa" | "pekerja") => {
                                    //   console.log(value);
                                    //   setIsStudent(value);
                                    // }}
                                  >
                                    <div className="flex items-center space-x-2 rounded-sm bg-white/90 px-2 py-1">
                                      <RadioGroupItem
                                        value="true"
                                        id="student-option-one"
                                        className="ring-1"
                                      />
                                      <Label
                                        htmlFor="student-option-one"
                                        className="w-16"
                                      >
                                        Pelajar
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-sm bg-white/90 px-2 py-1">
                                      <RadioGroupItem
                                        value="false"
                                        id="student-option-two"
                                        className="ring-1"
                                      />
                                      <Label
                                        htmlFor="student-option-two"
                                        className="w-20"
                                      >
                                        Pekerja
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                              </>
                            )}
                          />
                        </div>
                        {/* <div className="">
                      <Label
                        className={`mt-5 w-fit rounded-sm bg-cyan-800 px-2 text-lg font-semibold text-white ${
                          isStudent ? "block" : "hidden"
                        }`}
                      >
                        {isStudent === "mahasiswa"
                          ? "Nama Sekolah/Universitas"
                          : "Nama Perusahaan"}
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        className={`mt-2 w-full bg-white/80 text-white placeholder:text-white/50 ${
                          isStudent ? "block" : "hidden"
                        }`}
                        
                      />
                    </div> */}
                        <div className="">
                          <FormField
                            control={form.control}
                            name="field"
                            render={({ field }) => (
                              <>
                                <Label className="mt-5 w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-white">
                                  Pekerjaan / Bidang yang Kamu Tekuni{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="mt-0.5 bg-amber-100 px-1 text-left text-xs">
                                    *pisahkan dengan koma jika lebih dari satu
                                  </span>
                                  <FormMessage className="mt-0.5 w-fit bg-white px-1 text-xs text-nowrap text-red-600 underline">
                                    {form.formState.errors.field?.message}
                                  </FormMessage>
                                </div>
                                <Input
                                  type="text"
                                  {...field}
                                  placeholder="Enter your bidang"
                                  className="mt-1 mb-0 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px] h-8"
                                />
                                <div className="flex gap-2">
                                  {/* <span className="mt-0.5 bg-amber-100 px-1 text-left text-xs">
                                    *pisahkan dengan koma jika lebih dari satu
                                  </span> */}
                                </div>
                              </>
                            )}
                          />
                        </div>
                        <div className="text-left">
                          <Label className="mt-1 w-fit rounded-sm bg-cyan-800 px-2 text-base font-semibold text-white">
                            Hobi (Opsional)
                          </Label>
                          <Input
                            type="text"
                            placeholder="Hobi kamu..."
                            className="mt-2 w-full bg-white/80 text-white placeholder:text-white/50 h-8"
                          />
                          <div className="flex gap-2">
                            {/* <span className="mt-0.5 bg-amber-100 px-1 text-left text-xs">
                              *pisahkan dengan koma jika lebih dari satu
                            </span> */}
                            <FormMessage className="mt-0.5 w-fit bg-white px-1 text-xs text-nowrap text-red-600 underline">
                              {form.formState.errors.hobbies?.message}
                            </FormMessage>
                          </div>
                        </div>

                        <div className="pt-2.5 pb-1">
                          {!passwordError && !form.formState.isValid && (
                            <Button
                              type="submit"
                              onClick={() => {
                                const randomDelay = Math.floor(
                                  Math.random() * 1000 + 250,
                                );
                                if (!isAllFilledExceptPassword) {
                                  setShowCheckingIndicator(true);
                                  setTimeout(() => {
                                    setShowCheckingIndicator(false);
                                  }, randomDelay);
                                }
                              }}
                              className={`w-full cursor-pointer rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-600 ${showCheckingIndicator && "hidden"}`}
                            >
                              Submit
                            </Button>
                          )}
                          {showCheckingIndicator && (
                            <Button
                              disabled
                              className="w-full cursor-pointer rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-600"
                            >
                              Checking form...
                            </Button>
                          )}
                          {(passwordError || form.formState.isValid) &&
                            !showCheckingIndicator && (
                              <DialogTrigger
                                type={`${isAllFilledExceptPassword ? "button" : "submit"}`}
                                // onClick={(test) => {
                                //   setTimeout(() => {
                                //     if (isAllFilledExceptPassword) {
                                //       console.log("all filled");
                                //       setOpenDialog(true);
                                //     }
                                //   }, 300);
                                // }}
                                className={`w-full cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500/80`}
                              >
                                Form is valid, continue submit
                              </DialogTrigger>
                            )}
                          <DialogContent
                            className={`w-[450px]`}
                            // resetPasswordForm={() => {
                            //   form.resetField("password");
                            //   form.resetField("confirmPassword");
                            // }}
                            showCloseButton={false}
                            closeDialog={() => setOpenDialog(false)}
                          >
                            <Button
                              onClick={() => setOpenDialog(false)}
                              className="absolute top-3 right-3 bg-white h-6 w-4 text-black hover:bg-stone-200"
                            >
                              <XIcon />
                            </Button>
                            {/* <DialogTitle className="font-sans text-2xl">
                              One step ahead!
                            </DialogTitle> */}
                            <DialogDescription>
                              {/* This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers. */}
                            </DialogDescription>
                            {/* </DialogHeader> */}
                            <div className="">
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <>
                                    <div className="flex items-center justify-between gap-2 pt-2">
                                      <Label className="w-fit rounded-sm text-base font-semibold">
                                        Masukan Password{" "}
                                        <span className="text-red-500">*</span>
                                      </Label>
                                      <Button
                                        type="button"
                                        className="my-1.5 h-fit bg-stone-200 px-0 py-1 text-black hover:bg-stone-300 has-[>svg]:px-2.5"
                                        onClick={() =>
                                          setShowPassword((prev) => !prev)
                                        }
                                      >
                                        {showPassword ? <EyeClosed /> : <Eye />}
                                      </Button>
                                    </div>
                                    <FormControl>
                                      <Input
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        {...field}
                                        placeholder="Enter your password"
                                        className="mb-0 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px]"
                                      />
                                    </FormControl>
                                    <FormMessage className="mt-1 bg-white text-xs text-red-600 underline">
                                      {form.formState.errors.password?.message}
                                    </FormMessage>
                                  </>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <>
                                    <div className="flex items-center justify-between gap-2 pt-2">
                                      <Label className="w-fit rounded-sm text-base font-semibold text-nowrap">
                                        Konfirmasi Password{" "}
                                        <span className="text-red-500">*</span>
                                      </Label>
                                      <Button
                                        type="button"
                                        className="my-1.5 h-fit bg-stone-200 px-0 py-1 text-black hover:bg-stone-300 has-[>svg]:px-2.5"
                                        onClick={() =>
                                          setShowConfirmPassword(
                                            (prev) => !prev,
                                          )
                                        }
                                      >
                                        {showConfirmPassword ? (
                                          <EyeClosed />
                                        ) : (
                                          <Eye />
                                        )}
                                      </Button>
                                    </div>
                                    <FormControl>
                                      <Input
                                        type={
                                          showConfirmPassword
                                            ? "text"
                                            : "password"
                                        }
                                        {...field}
                                        placeholder="Enter your password"
                                        className="mb-0 w-full bg-white/80 text-black placeholder:text-black/50 focus:bg-white/95 focus-visible:ring-[1.5px]"
                                      />
                                    </FormControl>
                                    <FormMessage className="mt-1 bg-white text-xs text-red-600 underline">
                                      {
                                        form.formState.errors.confirmPassword
                                          ?.message
                                      }
                                    </FormMessage>
                                  </>
                                )}
                              />
                              <div className="pt-5">
                                <Button
                                  type="button"
                                  disabled={isPendingRegister}
                                  onClick={form.handleSubmit(onSubmit)}
                                  className="w-full cursor-pointer rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-500"
                                >
                                  {isPendingRegister ? (
                                    <span className="block size-5 animate-spin rounded-full border border-t-2 border-b-2 border-white disabled:opacity-70" />
                                  ) : (
                                    "Register"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                          {/* ))()} */}
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious
                      className={`absolute -bottom-16 -left-8 ${carrouselOneHasError() ? "border border-red-500 text-red-500 hover:text-red-600" : ""}`}
                    >
                      Previous
                    </CarouselPrevious>
                    <div className="absolute -bottom-16 inline-flex size-8 h-9 w-full max-w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md text-white">
                      <Link
                        href="/login"
                        className="underline decoration-2 underline-offset-2 hover:cursor-pointer hover:text-blue-300 hover:no-underline"
                      >
                        Login?
                      </Link>
                    </div>
                    <CarouselNext className="absolute -right-8 -bottom-16">
                      Next
                    </CarouselNext>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Dialog>
  );
}
