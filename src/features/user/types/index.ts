import { z } from "zod";
/**
 * 学部モデル
 * @see accounts/models.py:Faculty
 */
export interface Faculty {
  id: number;
  name: string;
}

/**
 * 学科モデル
 * @see accounts/models.py:Department
 */
export interface Department {
  id: number;
  name: string;
  faculty: Faculty;
}

/**
 * ユーザープロフィールモデル
 * @see accounts/models.py:UserProfile
 */
export interface UserProfile {
  profile_id: string;
  display_name: string;
  introduction: string;
  faculty: Faculty | null;
  department: Department | null;
  grade: number;
  picture: string | null;
  is_profile_complete: boolean;
  email: string; // ユーザーモデルから
}

/**
 * プロフィール更新リクエスト
 */
export const ProfileFormSchema = z.object({
  profile_id: z.string().min(1, "この項目は必須です"),
  display_name: z.string().min(1, "この項目は必須です"),
  introduction: z.string(),
  faculty_id: z.string().optional(),
  department_id: z.string().optional(),
  grade: z.number().min(1, "学年の最小値は1です").max(4, "学年の最大値は4です"),
  picture: z.string().optional().nullable(),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
