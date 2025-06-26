"use client";

import { useGetTaskQuery } from "@/redux/api/taskApi";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import BackButton from "./shared/BackButton";
import { Skeleton } from "./ui/skeleton";

export default function ViewList() {
  const navigate = useRouter();

  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useGetTaskQuery(id, {
    skip: !id,
  });
  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>No ID found</div>;

  const formattedDate = data
    ? format(new Date(data.due_date), "dd/MM/yyyy")
    : "";
  console.log(navigate);
  return (
    <>
      <BackButton />
      {isLoading ? (
        <Skeleton className="h-[200px] rounded-lg shadow w-[500px]" />
      ) : (
        <div className="p-4 max-w-[500px] shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <p>Due: {formattedDate}</p>
          <div className="space-y-2">
            <p>
              Status:{" "}
              <span className="border rounded-full px-2 pb-0.5 border-green-400 text-xs">
                {data?.status}
              </span>
            </p>
            <p className="text-sm">{data?.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
