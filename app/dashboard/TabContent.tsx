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

type TabData = Appointment | Patient | Doctor;

interface TabContentProps {
  tab: string;
  data: TabData[];
}

const TabContent: React.FC<TabContentProps> = ({ tab, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });

  // Sorting logic
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aKey = a[sortConfig.key as keyof TabData];
        const bKey = b[sortConfig.key as keyof TabData];
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

  // Filtering logic
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

  // Dynamically render table headers and cells based on the tab content
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
                <TableCell>
                  <Button
                    size="sm"
                    className="text-pine bg-tangerine hover:bg-salmon"
                  >
                    {tab === "appointments" ? "Manage" : "Contact"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TabContent;
