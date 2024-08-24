import { Input } from "@/components/ui/input";
import { FilterCheckbox } from "@/components/shared/filter-checkbox";
import { CheckboxFiltersGroup } from "@/components/shared/checkbox-filters-group";

import { RangeSlider } from "../ui";

import { Title } from "./title";

interface FiltersProps {
  className?: string;
}

export const Filters = ({ className }: FiltersProps) => (
  <div className={className}>
    <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

    <div className="flex flex-col gap-4">
      <FilterCheckbox text="Можно собирать" value="1" />
      <FilterCheckbox text="Новинки" value="2" />
    </div>

    <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
      <p className="font-bold mb-3">Цена от и до:</p>
      <div className="flex gap-3 mb-5">
        <Input
          min={0}
          max={30000}
          type="number"
          placeholder="0"
          defaultValue={0}
        />
        <Input type="number" min={100} max={30000} placeholder="30000" />
      </div>
      <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
    </div>

    <CheckboxFiltersGroup
      limit={6}
      title="Формат"
      className="mt-5"
      defaultItems={[
        {
          text: "Сырный соус",
          value: "1",
        },
        {
          text: "Моццарелла",
          value: "2",
        },
        {
          text: "Чеснок",
          value: "3",
        },
        {
          text: "Солённые огурчики",
          value: "4",
        },
        {
          text: "Красный лук",
          value: "5",
        },
        {
          text: "Томаты",
          value: "6",
        },
      ]}
      items={[
        {
          text: "Сырный соус",
          value: "112351",
        },
        {
          text: "Моццарелла",
          value: "12352",
        },
        {
          text: "Чеснок",
          value: "1236613",
        },
        {
          text: "Солённые огурчики",
          value: "6664",
        },
        {
          text: "Красный лук",
          value: "6665",
        },
        {
          text: "Томаты",
          value: "67622",
        },
        {
          text: "Сырный соус",
          value: "11",
        },
        {
          text: "Моццарелла",
          value: "223",
        },
        {
          text: "Чеснок",
          value: "323",
        },
        {
          text: "Солённые огурчики",
          value: "4135",
        },
        {
          text: "Красный лук",
          value: "523",
        },
        {
          text: "Томаты",
          value: "6123",
        },
      ]}
    />
  </div>
);
