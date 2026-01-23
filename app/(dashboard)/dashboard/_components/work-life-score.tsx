import * as React from "react";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getWLBLatest } from "@/services/wlb";

export function WorkLifeScore() {
  const { data } = getWLBLatest();

  return (
    <Card className="h-full gap-3">
      <CardHeader>
        <CardTitle>Work-Life Balance Score</CardTitle>
        <CardDescription>
          Your current balance score based on activity tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span
                  className={`block text-4xl font-bold ${data && data?.score >= 75 ? "text-green-600" : data && data?.score >= 50 ? "text-amber-500" : "text-red-600"}`}
                ></span>
              </div>
            </div>
            <CircularProgress value={data?.score || 0} />
          </div>
          <div className="w-full max-w-96 flex-1 space-y-4">
            <div className="space-y-1.5 md:pr-8">
              {data?.dimensionalScores.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <div
                      key={item.id}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <h4 className="text-sm font-medium">{item.dimension}</h4>
                      <p
                        className={`text-sm ${item.score >= 75 ? "text-green-600" : item.score >= 50 ? "text-amber-500" : "text-red-600"}`}
                      >
                        {item.score}
                      </p>
                    </div>
                    <div>
                      <Progress
                        value={item.score}
                        className="h-2 w-full bg-gray-200 fill-amber-200"
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
