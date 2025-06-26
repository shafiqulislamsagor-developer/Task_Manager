"use client";
import { useGetTaskQuery } from "@/redux/api/taskApi";
import { useParams } from "next/navigation";
import FromCreate from "./shared/FromCreate";

export default function EditTask() {
  const { id } = useParams();
  const { data, isLoading } = useGetTaskQuery(id as string);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!data) return <div className="text-center py-10">Task not found</div>;

  const defaultValues = {
    title: data.title,
    description: data.description,
    status: data.status,
    due_date: new Date(data.due_date),
  };

  return <FromCreate defaultValues={defaultValues} taskId={id as string} />;
}
