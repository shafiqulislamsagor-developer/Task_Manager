import { ListTable } from "@/components/ListTable";
import { Selected } from "@/components/Selected";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  const filter = [
    { id: "1", name: "Pending" },
    { id: "2", name: "Completed" },
  ];
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="min-w-[200px] max-w-[200px] py-3 px-5 border-r border-gray-300">
          Dashboard
        </div>
        <div className="flex-1 space-y-3 py-3 px-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Task List</h1>
            <Selected item={filter || []} />
          </div>
          <ListTable />
        </div>
      </div>
    </div>
  );
}
