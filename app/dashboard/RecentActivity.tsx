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
    // Parse the time string in "HH:MM AM/PM" format and convert it to a Date object
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const formattedHours = period === "PM" && hours < 12 ? hours + 12 : hours;
    return new Date(0, 0, 0, formattedHours, minutes);
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
              const dateA = new Date(`${a.date}`);
              const dateB = new Date(`${b.date}`);

              const timeA = getFormattedTime(a.time);
              const timeB = getFormattedTime(b.time);

              const dateTimeA = new Date(
                dateA.getFullYear(),
                dateA.getMonth(),
                dateA.getDate(),
                timeA.getHours(),
                timeA.getMinutes()
              );

              const dateTimeB = new Date(
                dateB.getFullYear(),
                dateB.getMonth(),
                dateB.getDate(),
                timeB.getHours(),
                timeB.getMinutes()
              );

              return dateTimeA.getTime() - dateTimeB.getTime();
            })
            .filter((appointment) => {
              const appointmentDate = new Date(`${appointment.date}`);
              const appointmentTime = getFormattedTime(appointment.time);
              const appointmentDateTime = new Date(
                appointmentDate.getFullYear(),
                appointmentDate.getMonth(),
                appointmentDate.getDate(),
                appointmentTime.getHours(),
                appointmentTime.getMinutes()
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
                    {getFormattedDate(appointment.date)} at {appointment.time}
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
