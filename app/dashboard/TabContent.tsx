import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { Doctor, Patient, Appointment } from "@/types/types";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import api from "../api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/app/context";

type TabData = Appointment | Patient | Doctor;

interface TabContentProps {
  tab: string;
  data: TabData[];
  fetchPatientAppointments: () => Promise<void>;
}

const TabContent: React.FC<TabContentProps> = ({
  tab,
  data,
  fetchPatientAppointments,
}) => {
  const { user } = useUserContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });

  const mangeButton = (appointmentId: number, email?: string) => {
    if (user?.role === "PATIENT") {
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="text-pine bg-tangerine hover:bg-salmon"
            >
              Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this appointment? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-chiffon hover:bg-salmon">
                Close
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-900"
                onClick={() => handleCancelAppointment(appointmentId)}
              >
                {isCancelling ? "Cancelling..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    // For Admins and Doctors
    if (tab === "appointments") {
      return (
        <Link href={`/viewappointment/${appointmentId}`}>
          <Button size="sm" className="text-pine bg-tangerine hover:bg-salmon">
            Manage
          </Button>
        </Link>
      );
    } else {
      return (
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="text-pine bg-tangerine hover:bg-salmon">
            Contact
          </Button>
        </a>
      );
    }
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aKey = a[sortConfig.key as keyof TabData];
        const bKey = b[sortConfig.key as keyof TabData];
        if (aKey === undefined && bKey === undefined) return 0;
        if (aKey === undefined)
          return sortConfig.direction === "ascending" ? 1 : -1;
        if (bKey === undefined)
          return sortConfig.direction === "ascending" ? -1 : 1;

        if (aKey < bKey) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aKey > bKey) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderTableHeaders = () => {
    if (data.length === 0) return null;
    return Object.keys(data[0])
      .filter((key) => key !== "id")
      .map((key) => {
        const formattedKey = key
          .replaceAll("_", " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <TableHead
            key={key}
            className="cursor-pointer text-sacramento"
            onClick={() => requestSort(key)}
          >
            {formattedKey}
            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
          </TableHead>
        );
      });
  };

  const renderTableCells = (item: TabData) => {
    return Object.entries(item)
      .filter(([key]) => key !== "id")
      .map(([key, value]) => <TableCell key={key}>{value}</TableCell>);
  };

  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCancelAppointment = async (appointmentId: number) => {
    setIsCancelling(true);
    try {
      await api.delete(`/deleteappointment/${appointmentId}/`);
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
      });
      await fetchPatientAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast({
        title: "Error",
        description: "Failed to cancel the appointment.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-sacramento">
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </CardTitle>
        <CardDescription className="text-pine">
          {tab === "appointments" && "Overview of scheduled appointments"}
          {tab === "patients" && "List of registered patients"}
          {tab === "doctors" && "List of available doctors"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sacramento" />
          <Input
            type="text"
            placeholder={`Search ${tab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-pine focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-transparent"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {renderTableHeaders()}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                {renderTableCells(item)}
                <TableCell>{mangeButton(item.id, item.email)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TabContent;
