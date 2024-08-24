import { ReactNode } from "react";

import { Checkbox } from "../ui/checkbox";

export interface FilterChecboxProps {
  text: string;
  value: string;
  checked?: boolean;
  endAdornment?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

export const FilterCheckbox = ({
  text,
  value,
  checked,
  endAdornment,
  onCheckedChange,
}: FilterChecboxProps) => {
  const id = `checkbox-${String(value)}`;
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="rounded-[8px] w-6 h-6"
      />
      <label htmlFor={id} className="leading-none cursor-pointer flex-1">
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
