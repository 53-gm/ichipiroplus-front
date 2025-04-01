import DateFormat from "@/components/DateFormat";
import UpdateLectureButton from "@/features/timetable/components/UpdateLectureButton";
import type { Registration } from "@/features/timetable/types";
import { auth } from "@/lib/auth";
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Spacer,
  Tag,
  Text,
  Wrap,
} from "@yamada-ui/react";
import { notFound } from "next/navigation";

interface LectureDetailHeaderProps {
  registration: Registration;
}

const LectureDetailHeader = async ({
  registration,
}: LectureDetailHeaderProps) => {
  const lecture = registration.lecture;

  const session = await auth();
  const user = session?.user;

  if (!user) {
    notFound();
  }

  return (
    <Card
      w="full"
      bg={["white", "black"]}
      p={6}
      borderRadius="md"
      shadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <CardHeader>
        <Heading size="lg">{lecture.name}</Heading>

        <Spacer />

        <UpdateLectureButton
          lecture={lecture}
          userProfileId={user.profile.profile_id}
        />
      </CardHeader>
      <CardBody>
        <Wrap gap="xs">
          {lecture.is_required && <Tag colorScheme="red">必修</Tag>}
          {lecture.is_exam && <Tag colorScheme="purple">期末試験あり</Tag>}
          {lecture.terms.map(term => (
            <Tag key={term.number} colorScheme="blue">
              第{term.number}ターム
            </Tag>
          ))}
          {lecture.departments.map(dept => (
            <Tag key={dept.id} colorScheme="teal">
              {dept.name}
            </Tag>
          ))}
        </Wrap>

        <Text>
          <strong>担当教員</strong>: {lecture.instructor}
        </Text>

        <Text>
          <strong>教室</strong>: {lecture.room || "未設定"}
        </Text>

        <HStack>
          <Text fontWeight="bold">開講日時:</Text>
          <Wrap gap="xs">
            {lecture.schedules.map(schedule => (
              <Tag size="sm" key={`${schedule.day}-${schedule.time}`}>
                {["月", "火", "水", "木", "金", "土", "日"][schedule.day - 1]}曜
                {schedule.time}限
              </Tag>
            ))}
          </Wrap>
        </HStack>

        <DateFormat
          createdAt={registration.registered_at}
          updatedAt={registration.registered_at}
        />
      </CardBody>
    </Card>
  );
};

export default LectureDetailHeader;
