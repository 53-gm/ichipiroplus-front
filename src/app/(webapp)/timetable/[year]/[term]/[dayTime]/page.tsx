import { getLectures } from "@/features/timetable/api/lecture";
import { getRegistrationBySchedule } from "@/features/timetable/api/registration";
import LectureList from "@/features/timetable/components/LectureList";
import LectureDetail from "./_components/LectureDetail/LectureDetail/indext";

interface TimeSlotPageProps {
  params: {
    year: string;
    term: string;
    dayTime: string;
  };
  searchParams: {
    tab?: string;
  };
}

const TimeSlotPage = async ({ params }: TimeSlotPageProps) => {
  const dayTime = parseInt(params.dayTime);
  const year = parseInt(params.year);
  const term = parseInt(params.term);

  // const tab = searchParams.tab || "tasks";

  // day/timeを逆算
  const day = Math.floor(dayTime / 5) + 1;
  const time = dayTime % 5;

  const registration = await getRegistrationBySchedule(year, term, dayTime);
  if (registration.length > 0) {
    return <LectureDetail registration={registration[0]} />;
  }

  const lectures = await getLectures({
    schedules: String((day - 1) * 5 + time),
    terms: term,
  });

  return <LectureList lectures={lectures} year={year} />;
};

export default TimeSlotPage;
