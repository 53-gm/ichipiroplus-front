import { getRegistrations } from "@/features/timetable/api";
import TimetableGrid from "@/features/timetable/components/TimetableGrid";
import TimetablePicker from "@/features/timetable/components/TimetablePicker";
import { Registration } from "@/features/timetable/types";
import { auth } from "@/lib/auth";
import { VStack } from "@yamada-ui/react";
import { notFound } from "next/navigation";

interface TimeTablePageProps {
  params: {
    year: string;
    term: string;
  };
}

const TimeTablePage = async ({ params }: TimeTablePageProps) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    notFound();
  }

  const year = parseInt(params.year);
  const term = parseInt(params.term);

  // 年度とタームの検証
  if (
    isNaN(year) ||
    isNaN(term) ||
    term < 1 ||
    term > 4 ||
    year < 2020 ||
    year > new Date().getFullYear() + 1
  ) {
    notFound();
  }

  // サーバーサイドでデータを取得
  const registrations = await getRegistrations(year, term);
  const registrationsMap = buildRegistrationMap(registrations);

  return (
    <VStack alignItems="center">
      {/* クライアントコンポーネント：年度・ターム選択 */}
      <TimetablePicker year={year} term={term} />

      {/* サーバーコンポーネント：時間割グリッド */}
      <TimetableGrid
        registrationsMap={registrationsMap}
        year={year}
        term={term}
      />
    </VStack>
  );
};

// ヘルパー関数
function buildRegistrationMap(registrations: Registration[]) {
  const map = new Map<number, Registration>();
  registrations.forEach((registration) => {
    registration.lecture.schedules.forEach((sch) => {
      const key = (sch.day - 1) * 5 + sch.time;
      map.set(key, registration);
    });
  });
  return map;
}

export default TimeTablePage;
