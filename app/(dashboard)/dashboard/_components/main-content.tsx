"use client";

import { useAuthStore } from "@/stores/auth";
import { WorkLifeScore } from "./work-life-score";
import { BalanceAdvisor } from "./balance-advisor";
import { Schedule } from "./schedule";
import { Note } from "./note";
import { DailyOverview } from "./daily-overview";
import { ChatAI } from "./chat-ai";
import { PreRegister } from "./pre-register";

export function MainContent() {
  const { user } = useAuthStore();

  return (
    <>
      {user?.hasAnsweredQuestionnaire ? (
        <main className="p-6 pb-12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and improve your work-life balance
            </p>
          </div>

          <div className="flex flex-col justify-between gap-5 md:h-[600px] md:flex-row">
            <div className="flex w-full flex-col justify-between gap-5">
              <WorkLifeScore />

              <BalanceAdvisor />
            </div>
            <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
              <Schedule />

              <Note />
            </div>
          </div>

          <div className="mb-8 pt-8">
            <DailyOverview />
          </div>

          <ChatAI />
        </main>
      ) : (
        <PreRegister isStudent={user?.isStudent} />
      )}
    </>
  );
}
