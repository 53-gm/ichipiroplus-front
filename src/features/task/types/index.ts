import { Registration } from "@/features/timetable/types";
import { z } from "zod";

/**
 * タスクモデル
 * @see tasks/models.py:Task
 */
export interface Task {
  id: string;
  registration: Registration;
  title: string;
  description: string;
  due_date: string | null;
  priority: number; // 0: 低, 1: 中, 2: 高
  status: number; // 0: 未着手, 1: 進行中, 2: 完了
  created_at: string;
  updated_at: string;
}

/**
 * タスク作成リクエスト
 */
export const taskFormSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().optional(),
  registration_id: z.string().nullable().optional(),
  priority: z.number().min(0).max(2),
  status: z.number().min(0).max(2),
  due_date: z.date().nullable().optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
