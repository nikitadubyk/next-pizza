import { ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SortProps {
  className?: string;
}

const sorts = [
  "Сначала популярное",
  "Сначала недорогие",
  "Сначала дорогие",
  "С лучшей оценкой",
];

export const SortPopup = ({ className }: SortProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <div
        className={cn(
          "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
          className
        )}
      >
        <ArrowUpDown className="w-4 h-4" />
        <b>Сортировка:</b>
        <b className="text-primary">популярное</b>
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-[240px]">
      <ul>
        {sorts.map((sort, i) => (
          <li
            key={i}
            className="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md"
          >
            {sort}
          </li>
        ))}
      </ul>
    </PopoverContent>
  </Popover>
);
