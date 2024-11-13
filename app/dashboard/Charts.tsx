import React, { useEffect, useState } from "react";
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
import api from "../api/api";
import { useUserContext } from "../context";

interface AppointmentCount {
  time: string;
  appointments: number;
}

interface DoctorData {
  doctor: string;
  appointments: number;
}

const COLORS = ["#162114", "#294122", "#FFBBA6", "#EB3D00", "#000000"];

export function Charts() {
  const { user } = useUserContext();

  const [appointmentFrequency, setAppointmentFrequency] = useState<
    AppointmentCount[]
  >([]);
  const [doctorData, setDoctorData] = useState<DoctorData[]>([]);
  const [topDoctor, setTopDoctor] = useState<DoctorData | null>(null);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      const fetchAppointmentFrequency = async () => {
        try {
          const response = await api.get("/appointment/today-count/");
          setAppointmentFrequency(response.data);
        } catch (error) {
          console.error("Error fetching appointment frequency data:", error);
        }
      };

      const fetchDoctorData = async () => {
        try {
          const response = await api.get("/appointment/countbydoctor/");
          const sortedData = response.data.sort(
            (a: DoctorData, b: DoctorData) => b.appointments - a.appointments
          );

          if (sortedData.length > 0) {
            setTopDoctor(sortedData[0]);
          }

          setDoctorData(sortedData.slice(0, 5));
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      };

      fetchAppointmentFrequency();
      fetchDoctorData();
    }
  }, [user]);

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
      <Card className="bg-chiffon text-chiffon">
        <CardHeader>
          <CardTitle className="text-sacramento">
            Top 5 Doctors by Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={doctorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="appointments"
                  nameKey="doctor"
                  label={({ doctor, percent }) =>
                    `${doctor} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {doctorData.map((entry, index) => (
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
              {`${topDoctor?.doctor} has the most appointments (${topDoctor?.appointments}) this month`}
            </span>
          </div>
          <p className="text-center text-sm text-sacramento mt-2">
            Showing top 5 doctors by appointments
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
