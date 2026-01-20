"use client";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
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
            <Link onClick={toggleMenu} href="/login">
              <Button className="w-20 cursor-pointer rounded-full border-black bg-black text-white hover:border-[0.5px] hover:bg-white hover:text-gray-600">
                Login
              </Button>
            </Link>
          </li>
          <li className="pt-2 underline">
            <Link onClick={toggleMenu} href="/sign-up">
              <Button className="w-20 cursor-pointer rounded-full border-gray-500 bg-amber-500 text-white ease-in-out hover:border-[0.5px] hover:bg-white hover:text-black">
                Sign Up
              </Button>
            </Link>
          </li>
        </div>
      </div>
    </header>
  );
}
