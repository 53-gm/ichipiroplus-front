import { getLectures } from "@/features/timetable/api/lecture";
import { getRegistrationBySchedule } from "@/features/timetable/api/registration";
import LectureDetail from "@/features/timetable/components/LectureDetail";
import LectureList from "@/features/timetable/components/LectureList";
import {
  getDayTimeByScheduleKey,
  getScheduleKey,
} from "@/features/timetable/utils";

interface TimeSlotPageProps {
  params: {
    year: string;
    term: string;
    dayTime: string;
  };

  // TODO: タブを状態管理からクエリパラメータでの管理にする
  searchParams: {
    tab?: string;
  };
}

const TimeSlotPage = async ({ params }: TimeSlotPageProps) => {
  const dayTime = Number.parseInt(params.dayTime);
  const year = Number.parseInt(params.year);
  const term = Number.parseInt(params.term);

  // TODO: タブを状態管理からクエリパラメータでの管理にする
  // const tab = searchParams.tab || "tasks";

  const { day, time } = getDayTimeByScheduleKey(dayTime);

  const registration = await getRegistrationBySchedule(year, term, dayTime);
  if (registration.length) {
    return <LectureDetail registration={registration[0]} />;
  }

  const lectures = await getLectures({
    schedules: String(getScheduleKey(day, time)),
    terms: term,
  });

  return <LectureList lectures={lectures} year={year} />;
};

export default TimeSlotPage;
