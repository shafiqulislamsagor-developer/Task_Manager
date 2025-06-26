import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Selected({
  item,
  setFilter,
  filter,
}: {
  item: { id: string; name: string }[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}) {
  return (
    <Select onValueChange={(value) => setFilter(value)} value={filter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="status filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>status filter</SelectLabel>
          {item.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
