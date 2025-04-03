import { getAllTasks } from "@/features/task/api";
import TasksDashboard from "@/features/task/components/TaskDashboard";
import { getRegistrations } from "@/features/timetable/api/registration";
import { getNowTermAndYear } from "@/features/timetable/api/term";
import { Box, Heading, VStack } from "@yamada-ui/react";

const TasksPage = async () => {
  const { term, year } = await getNowTermAndYear();
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
