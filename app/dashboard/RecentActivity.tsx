import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity({ appointments }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&text=${appointment.doctor.charAt(
                    0
                  )}`}
                  alt={appointment.doctor}
                />
                <AvatarFallback>
                  {appointment.doctor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
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
}
