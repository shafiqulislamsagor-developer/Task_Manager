"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useAddTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/redux/api/taskApi";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["pending", "completed"]),
  due_date: z.date({
    required_error: "Due date is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type TaskFormProps = {
  defaultValues?: FormValues;
  taskId?: string;
};

export default function FromCreate({ defaultValues, taskId }: TaskFormProps) {
  const [createTask, { isLoading: creating }] = useAddTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();
  const { refetch } = useGetTasksQuery();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: "pending",
      due_date: new Date(),
    },
  });

  const isEdit = !!taskId;

  const onSubmit = async (data: FormValues) => {
    const payload = { ...data, due_date: data.due_date.toISOString() };

    try {
      if (isEdit) {
        const hasChanged =
          JSON.stringify(payload) !==
          JSON.stringify({
            ...defaultValues,
            due_date: defaultValues?.due_date.toISOString(),
          });

        if (!hasChanged) {
          toast.info("No changes made.", { icon: "👀" });
          return;
        }

        await updateTask({ id: taskId!, body: payload }).unwrap();
        refetch();

        toast.success("Task updated successfully!", { icon: "🚀" });
      } else {
        await createTask(payload).unwrap();
        toast.success("Task created successfully!", { icon: "🚀" });
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong!", { icon: "🚨" });
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full shadow-lg py-3 px-4 rounded-lg max-w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="justify-start text-left w-full"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={creating || updating}
              className="w-full"
            >
              {creating || updating ? (
                isEdit ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Loader className="animate-spin" />
                )
              ) : isEdit ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
