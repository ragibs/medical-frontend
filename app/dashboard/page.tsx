"use client";
import Image from "next/image";
import logo from "@/public/images/logo-nobg.png";
import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  User,
  Users,
  ArrowUpDown,
  Search,
  PlusCircle,
  BarChart2,
  Menu,
  LogOut,
  Bot,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
};

// Mock data
const appointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    date: "2023-06-15",
    time: "10:00 AM",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Johnson",
    date: "2023-06-16",
    time: "2:30 PM",
  },
  {
    id: 3,
    patient: "Bob Brown",
    doctor: "Dr. Lee",
    date: "2023-06-17",
    time: "11:15 AM",
  },
];

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    contact: "123-456-7890",
    email: "john.doe@example.com",
    preferredContact: "Phone",
    clientSince: "2020-03-15",
    lastDoctorSeen: "Dr. Smith",
    lastAppointment: "2023-05-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    contact: "234-567-8901",
    email: "jane.smith@example.com",
    preferredContact: "Email",
    clientSince: "2019-11-02",
    lastDoctorSeen: "Dr. Johnson",
    lastAppointment: "2023-06-05",
  },
  {
    id: 3,
    name: "Bob Brown",
    age: 42,
    contact: "345-678-9012",
    email: "bob.brown@example.com",
    preferredContact: "Phone",
    clientSince: "2021-07-10",
    lastDoctorSeen: "Dr. Lee",
    lastAppointment: "2023-06-12",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialization: "Cardiology",
    contact: "987-654-3210",
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialization: "Pediatrics",
    contact: "876-543-2109",
  },
  {
    id: 3,
    name: "Dr. Lee",
    specialization: "Neurology",
    contact: "765-432-1098",
  },
];

const doctorBookings = [
  { name: "Dr. Smith", bookings: 8 },
  { name: "Dr. Johnson", bookings: 12 },
  { name: "Dr. Lee", bookings: 6 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sortData = useCallback(
    (data: any[], key: string) => {
      if (!key) return data;

      return [...data].sort((a, b) => {
        if (a[key] < b[key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[key] > b[key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    },
    [sortConfig.direction]
  );

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = useCallback(
    (data: any[]) => {
      return data.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    },
    [searchTerm]
  );

  const sortedAndFilteredAppointments = filterData(
    sortData(appointments, sortConfig.key)
  );
  const sortedAndFilteredPatients = filterData(
    sortData(patients, sortConfig.key)
  );
  const sortedAndFilteredDoctors = filterData(
    sortData(doctors, sortConfig.key)
  );

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-emerald-900 text-white shadow-md transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <Image src={logo} width={120} alt={"Logo of medical"} />
            </div>
            <nav className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-emerald-300 hover:bg-emerald-800"
                onClick={() => setActiveTab("appointments")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Appointments
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-emerald-300 hover:bg-emerald-800"
                onClick={() => setActiveTab("patients")}
              >
                <Users className="mr-2 h-5 w-5" />
                Patients
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-emerald-300 hover:bg-emerald-800"
                onClick={() => setActiveTab("doctors")}
              >
                <User className="mr-2 h-5 w-5" />
                Doctors
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-emerald-300 hover:bg-emerald-800"
                onClick={() => setActiveTab("ai-assistant")}
              >
                <Bot className="mr-2 h-5 w-5" />
                AI Assistant
              </Button>
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-emerald-800">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Dr. Jane Doe</p>
                <p className="text-xs text-emerald-300">jane.doe@example.com</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-red-300 hover:bg-emerald-800"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Hi, Dr. Jane Doe - {currentDateTime.toLocaleDateString()}{" "}
                  {currentDateTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white hidden sm:flex">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New
                </Button>
                <Button className="lg:hidden" onClick={toggleSidebar}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Appointments
                  </CardTitle>
                  <Calendar className="h-4 w-4 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs opacity-75">+10% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Patients
                  </CardTitle>
                  <Users className="h-4 w-4 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs opacity-75">+20% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white sm:col-span-2 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,200</div>
                  <p className="text-xs opacity-75">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={doctorBookings}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="bookings"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {doctorBookings.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        <p className="text-sm">
                          {appointment.patient} has an appointment with{" "}
                          {appointment.doctor} on {appointment.date} at{" "}
                          {appointment.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-6 sm:mb-8">
                <TabsTrigger
                  value="appointments"
                  className="text-sm sm:text-base"
                >
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="patients" className="text-sm sm:text-base">
                  Patients
                </TabsTrigger>
                <TabsTrigger value="doctors" className="text-sm sm:text-base">
                  Doctors
                </TabsTrigger>
                <TabsTrigger
                  value="ai-assistant"
                  className="text-sm sm:text-base"
                >
                  AI Assistant
                </TabsTrigger>
              </TabsList>
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                      Appointments
                    </CardTitle>
                    <CardDescription>
                      Overview of scheduled appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead
                              onClick={() => requestSort("patient")}
                              className="cursor-pointer"
                            >
                              Patient{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("doctor")}
                              className="cursor-pointer"
                            >
                              Doctor{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("date")}
                              className="cursor-pointer"
                            >
                              Date{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("time")}
                              className="cursor-pointer"
                            >
                              Time{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedAndFilteredAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>{appointment.patient}</TableCell>
                              <TableCell>{appointment.doctor}</TableCell>
                              <TableCell>{appointment.date}</TableCell>
                              <TableCell>{appointment.time}</TableCell>
                              <TableCell>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-emerald-500 text-white hover:bg-emerald-600"
                                  >
                                    Reschedule
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-red-500 text-white hover:bg-red-600"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="patients">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                      Patients
                    </CardTitle>
                    <CardDescription>
                      List of registered patients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead
                              onClick={() => requestSort("name")}
                              className="cursor-pointer"
                            >
                              Name{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("age")}
                              className="cursor-pointer"
                            >
                              Age{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("contact")}
                              className="cursor-pointer"
                            >
                              Contact{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("email")}
                              className="cursor-pointer"
                            >
                              Email{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("preferredContact")}
                              className="cursor-pointer"
                            >
                              Preferred Contact{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("clientSince")}
                              className="cursor-pointer"
                            >
                              Client Since{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("lastDoctorSeen")}
                              className="cursor-pointer"
                            >
                              Last Doctor Seen{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("lastAppointment")}
                              className="cursor-pointer"
                            >
                              Last Appointment{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedAndFilteredPatients.map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell>{patient.name}</TableCell>
                              <TableCell>{patient.age}</TableCell>
                              <TableCell>{patient.contact}</TableCell>
                              <TableCell>{patient.email}</TableCell>
                              <TableCell>{patient.preferredContact}</TableCell>
                              <TableCell>{patient.clientSince}</TableCell>
                              <TableCell>{patient.lastDoctorSeen}</TableCell>
                              <TableCell>{patient.lastAppointment}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-white text-emerald-500 hover:bg-emerald-50 border-emerald-500"
                                >
                                  Contact
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="doctors">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                      Doctors
                    </CardTitle>
                    <CardDescription>List of available doctors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead
                              onClick={() => requestSort("name")}
                              className="cursor-pointer"
                            >
                              Name{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("specialization")}
                              className="cursor-pointer"
                            >
                              Specialization{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead
                              onClick={() => requestSort("contact")}
                              className="cursor-pointer"
                            >
                              Contact{" "}
                              <ArrowUpDown className="inline ml-1" size={16} />
                            </TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedAndFilteredDoctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                              <TableCell>{doctor.name}</TableCell>
                              <TableCell>{doctor.specialization}</TableCell>
                              <TableCell>{doctor.contact}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-white text-emerald-500 hover:bg-emerald-50 border-emerald-500"
                                >
                                  Contact
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ai-assistant">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                      AI Assistant
                    </CardTitle>
                    <CardDescription>
                      Get help from our AI assistant
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        Welcome to the AI Assistant. How can I help you today?
                      </p>
                      <Input
                        type="text"
                        placeholder="Type your question here..."
                      />
                      <Button className="w-full">Ask AI Assistant</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
