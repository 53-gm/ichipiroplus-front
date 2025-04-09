import type { Department, UserProfile } from "@/features/user/types";
import { z } from "zod";

/**
 * 学期モデル
 * @see academics/models.py:Term
 */
export interface Term {
  number: number; // プライマリキー
  end_date: Date;
}

/**
 * 時間割モデル
 * @see academics/models.py:Schedule
 */
export interface Schedule {
  id: number;
  day: number; // 1-7: 月-日
  time: number; // 1-5: 1限-5限
}

/**
 * 講義モデル
 * @see academics/models.py:Lecture
 */
export interface Lecture {
  id: string;
  syllabus: string | null;
  name: string;
  terms: Term[];
  departments: Department[];
  schedules: Schedule[];
  grade: number;
  room: string;
  instructor: string;
  is_required: boolean | null;
  is_exam: boolean | null;
  biko: string;
  created_at: string;
  updated_at: string;
  owner: UserProfile | null;
  is_public: boolean;
  is_public_editable: boolean;
}

/**
 * 講義作成リクエスト
 */
export const lectureFormSchema = z.object({
  name: z.string(),
  syllabus: z.string().optional().nullable(),
  term_ids: z.array(z.string()).optional(),
  department_ids: z.array(z.string()).optional(),
  schedule_ids: z.array(z.string()).optional(),
  grade: z.number().optional(),
  room: z.string().optional(),
  instructor: z.string().optional(),
  biko: z.string().optional(),
});

export type LectureFormData = z.infer<typeof lectureFormSchema>;

/**
 * 講義登録モデル
 * @see academics/models.py:Registration
 */
export interface Registration {
  id: string;
  lecture: Lecture;
  attendance_count: number;
  year: number;
  registered_at: string;
}

/**
 * 講義登録リクエスト
 */
export interface RegistrationInput {
  lecture_id: string;
  year: number;
}
