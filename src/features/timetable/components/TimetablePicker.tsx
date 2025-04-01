"use client";

import { YearPicker } from "@yamada-ui/calendar";
import { HStack, Option, Select } from "@yamada-ui/react";
import { useRouter } from "next/navigation";

interface TimetablePickerProps {
  year: number;
  term: number;
}

const TimetablePicker = ({ year, term }: TimetablePickerProps) => {
  const router = useRouter();

  const handleYearChange = (date: Date) => {
    router.push(`/timetable/${date.getFullYear()}/${term}`);
  };

  const handleTermChange = (value: string) => {
    router.push(`/timetable/${year}/${value}`);
  };

  return (
    <HStack>
      <YearPicker
        calendarVariant="solid"
        calendarColorScheme="secondary"
        allowInput={false}
        clearable={false}
        value={new Date(new Date().setFullYear(year))}
        onChange={value => value && handleYearChange(value)}
      />

      <Select value={String(term)} onChange={handleTermChange}>
        <Option value="1">第1ターム</Option>
        <Option value="2">第2ターム</Option>
        <Option value="3">第3ターム</Option>
        <Option value="4">第4ターム</Option>
      </Select>
    </HStack>
  );
};

export default TimetablePicker;
