import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getWLBHistory,
  getWLBLatest,
  updateRecommendation,
} from "@/services/wlb";
import { IRecommendation } from "@/types/api/wlb";
import { Check, ShieldHalf, Siren, TriangleAlert } from "lucide-react";

export function BalanceAdvisor() {
  const { data: dataWlbLatest } = getWLBLatest();
  const { data: dataWlbHistory } = getWLBHistory();
  const { mutate: mutateRecommendation } = updateRecommendation();

  return (
    <Card className="h-[400px] gap-0 overflow-y-auto sm:h-full">
      <CardHeader className="pb-4">
        <CardTitle>Balance Advisor</CardTitle>
        <CardDescription>
          AI-powered suggestions to improve your balance
        </CardDescription>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <span className="block size-2 rounded-full bg-red-500" />
            <p className="text-xs">High</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="block size-2 rounded-full bg-amber-500" />
            <p className="text-xs">Medium</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="block size-2 rounded-full bg-teal-500" />
            <p className="text-xs">Low</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <ul className="space-y-4">
          {dataWlbLatest?.recommendations.map((item: IRecommendation) => (
            <li key={item.id} className="flex gap-4">
              <div
                className={`hidden h-10 w-10 flex-shrink-0 items-center justify-center self-center rounded-full sm:flex ${
                  item.priority === "High"
                    ? "bg-red-100"
                    : item.priority === "Medium"
                      ? "bg-amber-100"
                      : "bg-teal-100"
                }`}
              >
                {item.priority === "High" ? (
                  <Siren className="h-5 w-5 text-red-600" />
                ) : item.priority === "Medium" ? (
                  <TriangleAlert className="h-5 w-5 text-amber-600" />
                ) : (
                  <ShieldHalf className="h-5 w-5 text-teal-600" />
                )}
              </div>

              <div className="self-center">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>

              <div className="self-start">
                <Button
                  size="sm"
                  variant="outline"
                  aria-disabled={item.checked || dataWlbHistory?.length === 7}
                  tabIndex={item.checked ? -1 : 0}
                  onClick={() => {
                    if (item.checked || dataWlbHistory?.length === 7) return;
                    mutateRecommendation(item.id);
                  }}
                  className={`${
                    item.checked || dataWlbHistory?.length === 7
                      ? "cursor-default border-green-600 bg-green-50 hover:bg-green-100"
                      : "cursor-pointer"
                  }`}
                >
                  <Check
                    className={`size-4 ${item.checked || dataWlbHistory?.length === 7 ? "text-green-600" : ""}`}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
