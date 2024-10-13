import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BarChart2, User } from "lucide-react";

export function SummaryCards() {
  const summaryData = [
    {
      title: "Total Appointments",
      value: "24",
      change: "+10%",
      icon: Calendar,
      color: "bg-sacramento",
    },
    {
      title: "New Patients",
      value: "12",
      change: "+20%",
      icon: Users,
      color: "bg-pine",
    },
    {
      title: "Total Revenue",
      value: "$4,200",
      change: "+15%",
      icon: BarChart2,
      color: "bg-tangerine",
    },
    {
      title: "Pending Reports",
      value: "7",
      change: "-5%",
      icon: User,
      color: "bg-salmon",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {summaryData.map((item, index) => (
        <Card key={index} className={`${item.color} text-chiffon`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs opacity-75">{item.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
