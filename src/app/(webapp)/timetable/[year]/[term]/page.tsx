import { getRegistrations } from "@/features/timetable/api/registration";
import TimetableGrid from "@/features/timetable/components/TimetableGrid";
import TimetablePicker from "@/features/timetable/components/TimetablePicker";
import {
  buildRegistrationMap,
  isValidTermYear,
} from "@/features/timetable/utils";
import { VStack } from "@yamada-ui/react";
import { notFound } from "next/navigation";

interface TimeTablePageProps {
  params: {
    year: string;
    term: string;
  };
}

const TimeTablePage = async ({ params }: TimeTablePageProps) => {
  const year = parseInt(params.year);
  const term = parseInt(params.term);

  if (!isValidTermYear(year, term)) {
    notFound();
  }

  const registrations = await getRegistrations(year, term);
  const registrationsMap = buildRegistrationMap(registrations);

  return (
    <VStack alignItems="center">
      {/* 年度・ターム選択 */}
      <TimetablePicker year={year} term={term} />

      {/* 時間割グリッド */}
      <TimetableGrid
        registrationsMap={registrationsMap}
        year={year}
        term={term}
      />
    </VStack>
  );
};

export default TimeTablePage;
