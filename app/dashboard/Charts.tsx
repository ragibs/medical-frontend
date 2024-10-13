import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { TrendingUp } from "lucide-react";

const appointmentFrequency = [
  { time: "09:00", appointments: 2 },
  { time: "09:30", appointments: 1 },
  { time: "10:00", appointments: 3 },
  { time: "10:30", appointments: 2 },
  { time: "11:00", appointments: 4 },
  { time: "11:30", appointments: 1 },
  { time: "12:00", appointments: 2 },
  { time: "12:30", appointments: 0 },
  { time: "13:00", appointments: 1 },
  { time: "13:30", appointments: 3 },
  { time: "14:00", appointments: 2 },
  { time: "14:30", appointments: 1 },
  { time: "15:00", appointments: 3 },
  { time: "15:30", appointments: 2 },
  { time: "16:00", appointments: 1 },
  { time: "16:30", appointments: 2 },
  { time: "17:00", appointments: 1 },
];

const patientSatisfaction = [
  { name: "Very Satisfied", value: 500 },
  { name: "Satisfied", value: 300 },
  { name: "Neutral", value: 200 },
  { name: "Dissatisfied", value: 100 },
  { name: "Very Dissatisfied", value: 25 },
];

const COLORS = ["#162114", "#294122", "#FFBBA6", "#EB3D00", "#FFEDD2"];

export function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointment Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={appointmentFrequency}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="time"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="appointments"
                  fill="#294122"
                  radius={[0, 4, 4, 0]}
                >
                  {appointmentFrequency.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`rgba(41, 65, 34, ${
                        0.2 + (entry.appointments / 5) * 0.8
                      })`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient Satisfaction (Last Year)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientSatisfaction}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {patientSatisfaction.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <TrendingUp className="text-tangerine mr-2" />
            <span className="text-sm font-medium text-tangerine">
              Trending up by 5.2% this month
            </span>
          </div>
          <p className="text-center text-sm text-sacramento mt-2">
            Showing total visitors: 1,125
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
