"use client"
import { format } from "date-fns"
import CalendarIcon from '@iconify-react/akar-icons/calendar';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";

type DatePickerProps = {
  value?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  id?: string;
  className?:string
};

export function DatePicker({
  value,
  onSelect,
  placeholder = "mm/dd/yyyy",
  id,
  className
}: DatePickerProps) {
  const [internalDate, setInternalDate] = useState<Date>();
  const date = value ?? internalDate;

  const handleSelect = (selectedDate: Date | undefined) => {
    setInternalDate(selectedDate);
    onSelect?.(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            type="button"
            id={id}
            data-empty={!date}
            className={`h-10! border-black-50 hover:border-brand-500 justify-start text-left font-normal data-[empty=true]:text-muted-foreground ${className}`}
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "MM/dd/yyyy") : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}
