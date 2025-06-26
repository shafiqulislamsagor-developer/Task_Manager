"use client";

import { ListTable } from "@/components/ListTable";
import { Selected } from "@/components/Selected";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const filter = [
    { id: "1", name: "Pending" },
    { id: "2", name: "Completed" },
  ];
  const navigate = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Task List:</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate.push("/tasks/new")}>
            <Plus className="size-6" />
          </Button>
          <Selected item={filter || []} />
        </div>
      </div>
      <ListTable />
    </>
  );
}
