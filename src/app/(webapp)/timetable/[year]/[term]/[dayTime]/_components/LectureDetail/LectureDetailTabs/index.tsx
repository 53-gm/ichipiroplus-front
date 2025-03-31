"use client";

import TasksDashboard from "@/features/task/components/TaskDashboard";
import { Task } from "@/features/task/types";
import { deleteRegistration } from "@/features/timetable/api/registration";
import { Registration } from "@/features/timetable/types";
import { ApiError } from "@/lib/api/client";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useNotice,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import SettingsTab from "../tabs/SettingsTab";

interface LectureDetailTabsProps {
  registration: Registration;
  tasks: Task[];
}

const LectureDetailTabs = ({ registration, tasks }: LectureDetailTabsProps) => {
  const lecture = registration.lecture;
  const router = useRouter();
  const notice = useNotice();

  // 講義登録を削除
  const handleDeleteRegistration = async () => {
    try {
      // 講義IDで登録を削除
      await deleteRegistration(registration.id);

      notice({
        title: "登録削除",
        description: "講義の登録を削除しました",
        status: "success",
      });

      // 時間割ページにリダイレクト
      router.push("/timetable");
    } catch (error) {
      if (error instanceof ApiError) {
        notice({
          title: "エラー",
          description: error.message,
          status: "error",
        });
      } else {
        notice({
          title: "エラー",
          description: "不明なエラー",
          status: "error",
        });
      }
    }
  };

  return (
    <Tabs w="full" variant="rounded" colorScheme="blue">
      <TabList>
        <Tab>タスク管理</Tab>
        <Tab>設定</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TasksDashboard
            initialTasks={tasks}
            registration_id={String(registration.id)}
          />
        </TabPanel>

        <TabPanel>
          <SettingsTab
            lecture={lecture}
            onDeleteRegistration={handleDeleteRegistration}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LectureDetailTabs;
