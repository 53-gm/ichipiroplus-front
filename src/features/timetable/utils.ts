import type { Registration } from "./types";

/**
 * 講義登録情報から時間割マップを構築する
 * @param registrations - 講義登録情報の配列
 * @returns 時間割キー（曜日と時限から計算）から登録情報へのマップ
 */
export const buildRegistrationMap = (registrations: Registration[]) => {
  const map = new Map<number, Registration>();
  // biome-ignore lint/complexity/noForEach: <explanation>
  registrations.forEach(registration => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    registration.lecture.schedules.forEach(sch => {
      const key = (sch.day - 1) * 5 + sch.time;
      map.set(key, registration);
    });
  });
  return map;
};

/**
 * 年度とタームを検証する
 * @param year - 年度
 * @param term - ターム
 * @returns 有効ならtrue, 無効ならfalse
 */
export const isValidTermYear = (year: number, term: number) => {
  return (
    !Number.isNaN(year) ||
    !Number.isNaN(term) ||
    term >= 1 ||
    term <= 4 ||
    year >= 2020 ||
    year <= new Date().getFullYear() + 1
  );
};

/**
 * 日付と時限から一意のスケジュールキーを返す
 * @param day - 日付の数値(月=1, 火=2, ...)
 * @param time - 時限の数値(1限=1, 2限=2, ...)
 * @returns スケジュールキー
 */
export const getScheduleKey = (day: number, time: number) => {
  return (day - 1) * 5 + time;
};

/**
 * スケジュールキーから日付と時限の数値を返す
 * @param scheduleKey - スケジュールキー
 * @returns day:日付の数値(月=1, 火=2, ...), time:時限の数値(1限=1, 2限=2, ...)
 */
export const getDayTimeByScheduleKey = (scheduleKey: number) => {
  const day = Math.floor(scheduleKey / 5) + 1;
  const time = scheduleKey % 5;
  return { day, time };
};
