"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTasksQuery } from "@/redux/api/taskApi";
import { Button } from "./ui/button";

export function ListTable() {
  const { data: taskData, isLoading } = useGetTasksQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Due date </TableHead>
            <TableHead className="text-center w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskData?.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.title}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.due_date}</TableCell>
              <TableCell className="text-center space-x-3 w-[200px]">
                <Button>View</Button>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
