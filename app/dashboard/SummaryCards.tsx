import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import api from "../api/api";

interface SummaryData {
  title: string;
  value: number;
  change: string;
  icon: React.ElementType;
  color: string;
}

export function SummaryCards() {
  const [appointmentsData, setAppointmentsData] = useState({
    current_month: 0,
    last_month: 0,
  });
  const [patientsData, setPatientsData] = useState({
    current_month: 0,
    last_month: 0,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointment/changecount/");
        setAppointmentsData(response.data);
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };

    const fetchRegistrations = async () => {
      try {
        const response = await api.get("/registrations/");
        setPatientsData(response.data);
      } catch (error) {
        console.error("Error fetching patient registrations data:", error);
      }
    };

    fetchAppointments();
    fetchRegistrations();
  }, []);

  const calculateChange = (current: number, last: number) => {
    if (last === 0) return current > 0 ? "+100%" : "0%";
    return `${(((current - last) / last) * 100).toFixed(1)}%`;
  };

  const summaryData: SummaryData[] = [
    {
      title: "Total Appointments",
      value: appointmentsData.current_month,
      change: calculateChange(
        appointmentsData.current_month,
        appointmentsData.last_month
      ),
      icon: Calendar,
      color: "bg-sacramento",
    },
    {
      title: "New Patients",
      value: patientsData.current_month,
      change: calculateChange(
        patientsData.current_month,
        patientsData.last_month
      ),
      icon: Users,
      color: "bg-pine",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
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
