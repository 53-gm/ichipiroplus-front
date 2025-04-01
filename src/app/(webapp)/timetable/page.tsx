import { getNowTermAndYear } from "@/features/timetable/api/term";
import { redirect } from "next/navigation";

const TimeTableOriginPage = async () => {
  const { term, year } = await getNowTermAndYear();
  redirect(`/timetable/${year}/${term.number}`);
};

export default TimeTableOriginPage;
