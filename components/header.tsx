"use client";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ShowPassword } from "./ui/show-password";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

export default function Header() {
  // const [openMenu, setOpenMenu] = useState(false);

  // const toggleMenu = () => {
  //   setOpenMenu((prev) => !prev);
  // };

  function toggleMenu(): void {
    const html = document.documentElement;
    const menuToggle: HTMLElement | null = document.querySelector("#menu");
    const menuButton: HTMLElement | null = document.querySelector(
      "#menuButton",
    ) as HTMLButtonElement;

    if (menuToggle) {
      menuToggle.classList.toggle("hidden");
      menuButton.classList.toggle("menu__open");
      html.addEventListener("click", (e: MouseEvent) => {
        if (
          e.target !== menuToggle &&
          !menuToggle.contains(e.target as Node) &&
          e.target !== menuButton &&
          !menuButton.contains(e.target as Node)
        ) {
          menuToggle.classList.add("hidden");
          menuButton.classList.remove("menu__open");
        }
      });
    }
  }

  return (
    <header className="container mx-auto flex h-[var(--header-height)] items-center justify-between px-8 py-6">
      <nav className="flex w-full items-center justify-between">
        <Link href={"https://worklifebalance-ai.tech"} className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-amber-600" />
          <span className="text-xl font-bold">
            <span className="text-amber-600">Work</span>-
            <span className="text-teal-600">Life</span> Balance
          </span>
        </Link>
        <div className="hidden items-center md:flex md:gap-2 lg:gap-10">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-amber-600"
          >
            Home
          </Link>
          <Link
            href="/#why-use-us"
            className="text-sm font-medium transition-colors hover:text-amber-600"
          >
            Why Use Us?
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium transition-colors hover:text-amber-600"
          >
            Features
          </Link>
          {/* <Link
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-amber-600"
          >
            Contact
          </Link> */}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="w-20 cursor-pointer rounded-full border-gray-500 bg-amber-500 text-white ease-in-out hover:border-[0.5px] hover:bg-white hover:text-black"
          >
            <Button className="w-20 cursor-pointer rounded-full border-black bg-black text-white hover:border-[0.5px] hover:bg-white hover:text-gray-600">
              Login
            </Button>
          </Link>
          {/* <Dialog>
            <DialogTrigger asChild className="">
              <Button className=" hover:border-[0.5px] text-white bg-black border-black rounded-full hover:bg-white hover:text-gray-600 cursor-pointer w-20">
                Login
              </Button>
            </DialogTrigger>
            <form className="">
              <DialogContent className="bg-transparent border-none shadow-none group p-0">
                <div className="p-6 rounded-lg border-white shadow-lg bg-white group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100 group-data-[state=open]:motion-blur-in-md">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 pt-2">
                    <div className="grid gap-3">
                      <Label htmlFor="user">Username/Email/Phone</Label>
                      <Input id="user" name="user" defaultValue="" />
                    </div>
                    <div className="grid gap-3 relative">
                      <Label htmlFor="password">Password</Label>
                      <ShowPassword />
                      <Input id="password" name="password" type="password" />
                    </div>
                  </div>
                  <DialogFooter className="pt-3">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </form>
          </Dialog> */}
          <Link
            href="/sign-up"
            className="w-20 cursor-pointer rounded-full border-gray-500 bg-amber-500 text-white ease-in-out hover:border-[0.5px] hover:bg-white hover:text-black"
          >
            <Button className="w-20 cursor-pointer rounded-full border-gray-500 bg-amber-500 text-white ease-in-out hover:border-[0.5px] hover:bg-white hover:text-black">
              Sign Up
            </Button>
          </Link>
        </div>
        <button
          id="menuButton"
          className={`block md:hidden`}
          onClick={toggleMenu}
          aria-label="Menu"
          title="Menu"
        >
          <span
            className={`menu__line origin-top-left transition duration-500`}
          ></span>
          <span
            className={`menu__line transition duration-700 ease-in-out`}
          ></span>
          <span
            className={`menu__line origin-bottom-left transition duration-500`}
          ></span>
        </button>
      </nav>
      <div
        id="menu"
        className={`absolute top-[var(--header-height)] left-0 z-10 hidden w-full list-none items-center justify-center space-y-3 rounded-b-2xl bg-stone-50 py-4 text-center shadow-lg`}
      >
        <li className="underline hover:text-amber-600 hover:no-underline">
          <Link onClick={toggleMenu} href="/">
            Home
          </Link>
        </li>
        <li className="underline hover:text-amber-600 hover:no-underline">
          <Link onClick={toggleMenu} href="/#why-use-us">
            Why Use Us
          </Link>
        </li>
        <li className="underline hover:text-amber-600 hover:no-underline">
          <Link onClick={toggleMenu} href="/#features">
            Features
          </Link>
        </li>
        <div className="flex items-center justify-center gap-2">
          <li className="pt-2 underline">
            {/* <Dialog>
              <DialogTrigger asChild className=""> */}
            <Link onClick={toggleMenu} href="/login">
              <Button className="w-20 cursor-pointer rounded-full border-black bg-black text-white hover:border-[0.5px] hover:bg-white hover:text-gray-600">
                Login
              </Button>
            </Link>
            {/* </DialogTrigger> */}
            {/* <form className="">
                <DialogContent className="bg-transparent border-none shadow-none group p-0">
                  <div className="p-6 rounded-lg border-white shadow-lg bg-white group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100 group-data-[state=open]:motion-blur-in-md">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 pt-2">
                      <div className="grid gap-3">
                        <Label htmlFor="user">Username/Email/Phone</Label>
                        <Input id="user" name="user" defaultValue="" />
                      </div>
                      <div className="grid gap-3 relative">
                        <Label htmlFor="password">Password</Label>
                        <ShowPassword />
                        <Input id="password" name="password" type="password" />
                      </div>
                    </div>
                    <DialogFooter className="pt-3">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </div>
                </DialogContent> */}
            {/* </form> */}
            {/* </Dialog> */}
          </li>
          <li className="pt-2 underline">
            {/* <Dialog> */}
            {/* <DialogTrigger asChild className=""> */}
            <Link onClick={toggleMenu} href="/sign-up">
              <Button className="w-20 cursor-pointer rounded-full border-gray-500 bg-amber-500 text-white ease-in-out hover:border-[0.5px] hover:bg-white hover:text-black">
                Sign Up
              </Button>
            </Link>
            {/* </DialogTrigger> */}
            {/* <form className="">
                <DialogContent className="bg-transparent border-none shadow-none group p-0">
                  <Carousel>
                    <CarouselContent>
                      <CarouselItem>
                        <div className="p-6 rounded-lg border-white shadow-lg bg-white group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100 group-data-[state=open]:motion-blur-in-md">
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name">Nama</Label>
                              <Input id="name" name="name" placeholder="Jhon Doe" />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username">Username</Label>
                              <Input id="username" name="username" placeholder="johndoe" />
                            </div>
                          </div>
                          <DialogFooter className="pt-3">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-6 rounded-lg border-white shadow-lg bg-white group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100 group-data-[state=open]:motion-blur-in-md">
                          <DialogHeader>
                            <DialogTitle>Contact Information</DialogTitle>
                            <DialogDescription>Update your contact details here.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                defaultValue="pedro.duarte@example.com"
                              />
                            </div>
                          </div>
                          <DialogFooter className="pt-3">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-6 rounded-lg border-white shadow-lg bg-white group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100 group-data-[state=open]:motion-blur-in-md">
                          <DialogHeader>
                            <DialogTitle>Contact Information</DialogTitle>
                            <DialogDescription>Update your contact details here.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" name="phone" defaultValue="+1234567890" />
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious>Sebelumnya</CarouselPrevious>
                    <CarouselNext>Selanjutnya</CarouselNext>
                  </Carousel>
                </DialogContent>
              </form>
            </Dialog> */}
          </li>
        </div>
      </div>
    </header>
  );
}
