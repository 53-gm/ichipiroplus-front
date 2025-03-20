import { getNowTermAndYear } from "@/features/timetable/api";
import { redirect } from "next/navigation";

const TimeTablePage = async ({ params }: { params: { year: string } }) => {
  const { year } = params;

  const { term } = await getNowTermAndYear();

  redirect(`/timetable/${year}/${term.number}`);
};

export default TimeTablePage;