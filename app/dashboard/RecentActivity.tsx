import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/types/types";
import { format, parseISO, isToday, isAfter } from "date-fns";

interface RecentActivityProps {
  appointments: Appointment[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ appointments }) => {
  const getFormattedDate = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return "Today";
    }
    return format(date, "EEEE, MMMM dd, yyyy");
  };

  const getFormattedTime = (timeString: string) => {
    const time = parseISO(`1970-01-01T${timeString}`);
    return format(time, "h:mm a");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments
            .sort((a, b) => {
              const dateA = new Date(`${a.date}T${a.time}`);
              const dateB = new Date(`${b.date}T${b.time}`);
              return dateA.getTime() - dateB.getTime();
            })
            .filter((appointment) => {
              const appointmentDateTime = new Date(
                `${appointment.date}T${appointment.time}`
              );
              return (
                isAfter(appointmentDateTime, new Date()) ||
                isToday(appointmentDateTime)
              );
            })
            .slice(0, 5)
            .map((appointment, index) => (
              <div key={index} className="flex items-center">
                <div>
                  <p className="text-sm text-sacramento">
                    <span className="font-medium">
                      {appointment.doctor_full_name}
                    </span>{" "}
                    was booked by {appointment.patient_full_name} on{" "}
                    {getFormattedDate(appointment.date)} at{" "}
                    {getFormattedTime(appointment.time)}
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
