"use client";
import Link from "next/link";
import {
  BarChart2,
  Clock,
  Compass,
  History,
  Lightbulb,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/feature-card";
import HeroIllustration from "@/components/hero-illustration";
import { WhyUseUs } from "@/components/why-use-us";

export default function Home() {
  return (
    <div className="">
      <main>
        <section className="container mx-auto px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative space-y-6">
              {/* Decorative diamonds */}
              <div className="absolute top-0 -left-4 h-3 w-3 rotate-45 bg-amber-500"></div>
              <div className="absolute top-12 -left-4 h-3 w-3 rotate-45 bg-amber-400"></div>
              <div className="absolute top-24 -left-4 h-3 w-3 rotate-45 bg-amber-300"></div>
              <div className="absolute top-36 -left-4 h-3 w-3 rotate-45 bg-amber-500"></div>
              <div className="absolute top-48 -left-4 h-3 w-3 rotate-45 bg-amber-400"></div>
              <div className="absolute top-60 -left-4 h-3 w-3 rotate-45 bg-amber-300"></div>

              <h1 className="text-3xl leading-tight font-bold lg:text-6xl">
                WORK-LIFE BALANCE AI
              </h1>
              <p className="max-w-md text-lg text-gray-600">
                Our AI-powered platform helps you track, analyze, and improve
                your work-life balance, so you can live a more fulfilling life.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button className="rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white">
                  RESERVE DEMO
                </Button>
                <Button className="rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white">
                  GET STARTED
                </Button>
              </div>
              <div className="pt-12">
                <p className="mb-2 text-sm">Follow Us</p>
                <div className="flex gap-4">
                  <Link href="#" aria-label="Facebook">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link href="#" aria-label="Twitter">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link href="#" aria-label="YouTube">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative pt-5 sm:h-[500px] sm:pt-0">
              <HeroIllustration />
            </div>
          </div>
        </section>

        <section className="container mx-auto">
          <WhyUseUs />
        </section>

        <section
          id="features"
          className="container mx-auto px-8 py-10 sm:py-20"
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Powerful Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our AI-powered platform offers a range of features to help you
              achieve better work-life balance.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-amber-600" />}
              title="Balance Analytics"
              description="Get insights into your work-life balance with detailed analytics and reports."
            />
            <FeatureCard
              icon={<Lightbulb className="h-10 w-10 text-amber-600" />}
              title="Smart Recommendations"
              description="Receive personalized recommendations to improve your work-life balance."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-amber-600" />}
              title="Scheduling"
              description="Automatically track how you spend your time across work and personal activities everyday."
            />
            <FeatureCard
              icon={<History className="h-10 w-10 text-amber-600" />}
              title="Daily Overview"
              description="Summary and trends chart of your work-life to help you tracking your progress."
            />
            <FeatureCard
              icon={<NotebookPen className="h-10 w-10 text-amber-600" />}
              title="Notes"
              description="Keep a journal of your thoughts and feelings to reflect on your work-life balance."
            />
            <FeatureCard
              icon={<Compass className="h-10 w-10 text-amber-600" />}
              title="AI Assistant"
              description="Get support and guidance from our Professional AI Assistant to help you stay on the track."
            />
          </div>
        </section>

        <section className="container mx-auto px-8 py-16">
          <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-teal-900 px-8 py-12 text-center text-white sm:p-12">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Transform Your Work-Life Balance?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl">
              Join thousands of users who have improved their productivity and
              wellbeing with our AI platform.
            </p>
            <Button className="cursor-pointer rounded-full bg-white px-4 py-6 text-sm font-medium text-teal-800 hover:bg-gray-100 sm:px-8 md:text-lg">
              GET STARTED FOR FREE
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Compass className="h-6 w-6 text-amber-600" />
                <span className="text-xl font-bold">
                  <span className="text-amber-600">Work</span>-
                  <span className="text-teal-600">Life</span> Balance
                </span>
              </div>
              <p className="text-sm">
                AI-powered platform to help you achieve better work-life
                balance.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-amber-600"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm">
            <p>
              © {new Date().getFullYear()} Work-Life Balance AI. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
