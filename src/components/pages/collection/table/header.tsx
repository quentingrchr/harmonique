import Select from "@/components/shared/inputs/select/select";
import { useState } from "react";
import { ColumnFiltersState } from "../../../../hooks/use-collection-filters/type";

interface Props {
  filters: ColumnFiltersState;
}

export default function Header({ filters }: Props) {
  const [key, setKey] = useState<string>("C#");
  return (
    <div className="w-full flex h-auto gap-4">
      <Select
        options={[
          { label: "C", value: "C" },
          { label: "D", value: "D" },
          { label: "E", value: "E" },
          { label: "F", value: "F" },
          { label: "G", value: "G" },
          { label: "A", value: "A" },
          { label: "B", value: "B" },
        ]}
        value={key}
        onValueChange={(value) => setKey(value)}
        label="Key"
        className="w-32"
      />
      <Select
        options={[
          { label: "Major", value: "Major" },
          { label: "Minor", value: "Minor" },
        ]}
        value="Major"
        label="Mode"
        className="w-48"
      />
    </div>
  );
}
