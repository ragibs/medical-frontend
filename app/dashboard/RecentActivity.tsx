import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Appointments {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
}

interface RecentActivityProps {
  appointments: Appointments[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ appointments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center">
              <div>
                <p className="text-sm text-sacramento">
                  <span className="font-medium">{appointment.doctor}</span> was
                  booked by {appointment.patient} on {appointment.date} at{" "}
                  {appointment.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
