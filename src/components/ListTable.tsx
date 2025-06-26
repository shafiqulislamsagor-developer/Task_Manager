"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ListTable({ filter }: { filter: string }) {
  const navigate = useRouter();
  const { data: taskData, isLoading } = useGetTasksQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const filteredData =
    taskData?.filter((item) =>
      filter === "All"
        ? item
        : item.status.toLowerCase() === filter.toLowerCase()
    ) || [];

  return (
    <ScrollArea className="border h-[450px] rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead className="w-[200px]">Due date </TableHead>
            <TableHead className="text-center w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              {[...Array(4)].map((_, i) => (
                <TableCell key={i} className="p-0">
                  <Skeleton className="h-8 rounded-xs w-full" />
                </TableCell>
              ))}
            </TableRow>
          ) : filteredData.length > 0 ? (
            filteredData?.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
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
                <TableCell className="w-[200px]">{invoice.status}</TableCell>
                <TableCell className="w-[200px]">
                  {invoice
                    ? format(new Date(invoice.due_date), "dd/MM/yyyy")
                    : ""}
                </TableCell>
                <TableCell className="text-center space-x-3 w-[200px]">
                  <Button onClick={() => navigate.push(`/tasks/${invoice.id}`)}>
                    View
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-indigo-600 text-indigo-600 hover:text-indigo-800"
                    onClick={() => navigate.push(`/tasks/${invoice.id}/edit`)}
                  >
                    Edit
                  </Button>

                  {/* Delete with confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setSelectedTaskId(invoice.id)}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the task.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (selectedTaskId) {
                              deleteTask(selectedTaskId);
                            }
                          }}
                        >
                          {isDeleting ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Yes, Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
