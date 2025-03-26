import { Lecture } from "@/features/timetable/types";
import { auth } from "@/lib/auth";
import { Grid, GridItem, Text } from "@yamada-ui/react";
import { notFound } from "next/navigation";
import LectureCard from "./LectureCard";

interface LectureListProps {
  lectures: Lecture[];
  year: number;
}

const LectureList = async ({ lectures, year }: LectureListProps) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    notFound();
  }

  return (
    <>
      <Text>
        ※編集は各講義の右上のボタンから出来ますが、この編集した内容は全てのユーザーに対して反映されます。データに間違いがある場合のみに使用してください
      </Text>
      {lectures.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(1, 1fr)",
          }}
          gap="md"
          w="full"
        >
          {lectures.map((lecture) => {
            //公開でない && 講義作成者でない 場合は表示しない
            if (
              !lecture.is_public &&
              user.profile.profile_id != lecture.owner?.profile_id
            ) {
              return;
            }
            return (
              <GridItem key={lecture.id}>
                <LectureCard
                  lecture={lecture}
                  userProfileId={user.profile.profile_id}
                  year={year}
                />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default LectureList;
