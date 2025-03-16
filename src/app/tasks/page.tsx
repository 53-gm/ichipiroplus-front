import { getAllTasks } from "@/features/task/api";
import { getNowTermAndYear, getRegistrations } from "@/features/timetable/api";
import { auth } from "@/lib/auth";
import { Box, Heading, VStack } from "@yamada-ui/react";
import { notFound } from "next/navigation";
import TasksDashboard from "../../features/task/components/TaskDashboard";

const TasksPage = async () => {
  // 現在のユーザー情報を取得
  const session = await auth();
  const user = session?.user;
  const { term, year } = await getNowTermAndYear();

  if (!user) {
    notFound();
  }

  // 全てのタスクを取得
  const tasks = await getAllTasks();
  const registrations = await getRegistrations(year, term.number);

  return (
    <VStack w="full" align="start">
      <Box w="full">
        <Heading size="xl" mb={2}>
          タスク管理
        </Heading>
      </Box>

      {/* タスクダッシュボード */}
      <Box w="full">
        <TasksDashboard initialTasks={tasks} registrations={registrations} />
      </Box>
    </VStack>
  );
};

export default TasksPage;
