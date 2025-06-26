"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteTaskMutation, useGetTasksQuery } from "@/redux/api/taskApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ListTable() {
  const navigate = useRouter();
  const { data: taskData, isLoading } = useGetTasksQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  if (isLoading) return <div>Loading...</div>;
  console.log(isDeleting);
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Due date </TableHead>
            <TableHead className="text-center w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskData?.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {" "}
                <div className="max-w-[300px] w-[300px] pr-6">
                  <Tooltip>
                    <TooltipTrigger className="text-black" asChild>
                      <p className="inline-block truncate">{invoice.title}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{invoice.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                {invoice
                  ? format(new Date(invoice.due_date), "dd/MM/yyyy")
                  : ""}
              </TableCell>
              <TableCell className="text-center space-x-3 w-[200px]">
                <Button onClick={() => navigate.push(`/tasks/${invoice.id}`)}>
                  View
                </Button>
                <Button
                  onClick={() => navigate.push(`/tasks/${invoice.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    deleteTask(invoice.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
